import dbConnect from "@/utils/dbConnection";
//import clerk stuff
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export default async function CreateProfilePage({
  params,
}: {
  params: { userid: string };
}) {
  const db = dbConnect();
  // get the user's data from the database
  const userData = (
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [params.userid])
  ).rows[0];
  // if the user has data, redirect them to their profile page
  if (userData) {
    redirect(`/user/${params.userid}`);
  }

  async function handleSubmit(FormData: FormData) {
    "use server";
    const db = dbConnect();
    const firstName = FormData.get("firstName");
    const lastName = FormData.get("lastName");
    const middleName = FormData.get("middleName");
    const gender = FormData.get("gender");
    const aboutMe = FormData.get("aboutMe");
    // email is not in the form data so I need to get it from the clerk user data object
    const userData = await currentUser();
    // todo maybe bug here if the user changes the primary email address
    const email = userData?.emailAddresses[0].emailAddress;

    await db.query(
      `INSERT INTO users (clerk_id, first_name, last_name, middle_name, gender, email, about_me) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        params.userid,
        firstName,
        lastName,
        middleName ? middleName : null, // if middleName is empty, insert null into the db
        gender,
        email,
        aboutMe ? aboutMe : null, // if aboutMe is empty, insert null into the db
      ]
    );
    revalidatePath(`/user/${params.userid}`);
    redirect(`/`);
  }

  return (
    <main className="flex justify-center mt-8">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Tell us more about yourself.
        </h1>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="middleName" className="block text-gray-700">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-gray-700">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              required
              className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              About Me
            </label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              maxLength={254}
              className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
