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
    <>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        defaultValue={thisUser.first_name}
        className="text-black"
        required
      />
      <label htmlFor="middleName">Middle Name:</label>
      <input
        type="text"
        id="middleName"
        name="middleName"
        defaultValue={thisUser.middle_name}
        className="text-black"
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        defaultValue={thisUser.last_name}
        className="text-black"
        required
      />
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        defaultValue={thisUser.clerk_id}
        className="text-black"
        disabled
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        defaultValue={thisUser.email}
        className="text-black"
        disabled
      />
      <label htmlFor="gender">Gender:</label>
      <select
        id="gender"
        name="gender"
        required
        className="text-black"
        defaultValue={thisUser.gender}
      >
        <option value="">Select an option</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
        <option value="prefer_not_to_say">Prefer not to say</option>
      </select>
      <label htmlFor="aboutMe">About Me:</label>
      <textarea
        id="aboutMe"
        name="aboutMe"
        defaultValue={thisUser.about_me}
        className="text-black"
      />
    </>
  );
}
