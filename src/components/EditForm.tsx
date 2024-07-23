import dbConnect from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

export default async function EditFormComp() {
  const { userId } = auth();
  const userData = await currentUser();

  // need to connect to the db
  const db = dbConnect();
  // need to get the users data from the db
  const thisUser = (
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId])
  ).rows[0];

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-2xl bg-white p-4 space-y-4 space-">
        <div>
          <label htmlFor="firstName" className="block text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={thisUser.first_name}
            className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="middleName" className="block text-gray-700">
            Middle Name:
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            defaultValue={thisUser.middle_name}
            className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={thisUser.last_name}
            className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-gray-700">
            User ID:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={thisUser.clerk_id}
            className="w-full p-2 border rounded-lg text-gray-500 bg-gray-100 cursor-not-allowed focus:outline-none"
            disabled
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={thisUser.email}
            className="w-full p-2 border rounded-lg text-gray-500 bg-gray-100 cursor-not-allowed focus:outline-none"
            disabled
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-gray-700">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            required
            className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={thisUser.gender}
          >
            <option value="">Select an option</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label htmlFor="aboutMe" className="block text-gray-700">
            About Me:
          </label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            defaultValue={thisUser.about_me}
            className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </main>
  );
}
