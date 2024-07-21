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
  // if the user has no data, redirect them to the create profile page
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
    <main>
      <h1>Tell us more about yourself.</h1>
      {/* // need a form for user to add their data here with firstName, lastName, middleName, gender, email, aboutMe */}
      <form action={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="text-black"
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="text-black"
          required
        />
        <label htmlFor="middleName">Middle Name</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          className="text-black"
        />
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" required className="text-black">
          <option value="">Select an option</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </select>
        <label htmlFor="aboutMe">About Me</label>
        <textarea
          id="aboutMe"
          name="aboutMe"
          maxLength={254}
          className="text-black"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
