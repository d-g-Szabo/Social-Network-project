//import the connection to our db --> you need a users table in the db (id, clerk_id, username, bio, location...)
import dbConnect from "@/utils/dbConnection";
//import clerk stuff
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import EditFormComp from "@/components/EditForm";

export default async function UserId() {
  // need to destructure userId from clerk auth
  //! the userId is a character-numerical string that clerk creates AFTER the user signs up for clerk in the sign-up page (<SignUp/>)
  const { userId } = auth();
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
  }

  return (
    <main>
      <h1>Edit your profile:</h1>
      {/* need a form here! */}
      <form action={handleSubmit}>
        <EditFormComp />
        <button type="submit">Edit</button>
      </form>
      {/* can show the current users data in here--> look below for clues */}
    </main>
  );
}

// //==========================Show currentUser's data==========================//
// // combine this with the code above
// import { currentUser } from "@clerk/nextjs/server";
// export default async function UserIdPage() {
//   // check if we have current user data
//   const { userId } = auth();
//   if (!userId) {
//     return redirect("/sign-in");
//   }
//   if (userId) {
//     // add a sql query getting the users data
//   }

//   // access the currentUser data
//   const userData = await currentUser();
//   console.log(userData);
//   return (
//     <main className="">
//       {/* can conditionally render an element to redirect the user to complete their profiles, and then, show the users data */}
//       <h1>Current User</h1>
//       <p>
//         Welcome! your name is: {userData?.firstName} {userData?.lastName}
//       </p>
//       <p>Your email is this:</p>
//     </main>
//   );
// }
