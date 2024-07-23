//import the connection to our db --> you need a users table in the db (id, clerk_id, username, bio, location...)
import dbConnect from "@/utils/dbConnection";
//import clerk stuff
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import EditFormComp from "@/components/EditForm";

export default async function UserId({
  params,
}: {
  params: { userId: string };
}) {
  // need to destructure userId from clerk auth
  //! the userId is a character-numerical string that clerk creates AFTER the user signs up for clerk in the sign-up page (<SignUp/>)
  const { userId } = auth();
  // if the userId is not the same as the userId in the params, redirect them to the home page
  if (userId !== params.userId) {
    redirect(`/`);
  }
  const db = dbConnect();
  const userData = (
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId])
  ).rows[0];
  // if the user has no data, redirect them to the create profile page
  if (!userData) {
    redirect(`/create-profile-page/${userId}`);
  }

  // need a form for user to add their data
  // need a handle submit function
  async function handleSubmit(formData: FormData) {
    "use server";
    const db = dbConnect();

    // need to specify that we are in the server
    // need to activate the db connection
    // need to get the form data input
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const middleName = formData.get("middleName");
    const gender = formData.get("gender");
    const aboutMe = formData.get("aboutMe");
    // email is not in the form data so I need to get it from the clerk user data object
    // todo maybe bug here if the user changes the primary email address
    const userData = await currentUser();
    const email = userData?.emailAddresses[0].emailAddress;

    // need to update the users data in the db
    await db.query(
      `UPDATE users SET first_name = $1, last_name = $2, middle_name = $3, gender = $4, email = $5, about_me = $6 WHERE clerk_id = $7`,
      [
        firstName,
        lastName,
        middleName ? middleName : null, // if middleName is empty, insert null into
        gender,
        email,
        aboutMe ? aboutMe : null, // if aboutMe is empty, insert null into
        userId,
      ]
    );
    // need to revalidate the path
    // can also redirect if I want
    revalidatePath(`/user/${userId}`);
  }

  const posts = (
    await db.query(
      `SELECT * FROM posts WHERE user_clerk_id = $1 ORDER BY posts.id desc`,
      [userId]
    )
  ).rows;

  return (
    <main className="flex justify-center mt-8">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 space-y-6">
        <h1 className="text-xl font-semibold text-gray-800">Your Profile:</h1>
        <form action={handleSubmit} className="space-y-4">
          <EditFormComp />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Edit
          </button>
        </form>
        <h1 className="text-xl font-semibold text-gray-800">Posts:</h1>
        <div className="space-y-4">
          {posts.map((post: any, key: number) => {
            return (
              <div key={key} className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-800">{post.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
