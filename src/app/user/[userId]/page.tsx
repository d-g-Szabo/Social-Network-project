//import the connection to our db --> you need a users table in the db (id, clerk_id, username, bio, location...)
//import clerk stuff
//TODO set up .env.local file with you Supabase and CLerk env variables
//todo will need a utils file with the connection set up to the db
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export default function UserId() {
  // need to destructure userId from clerk auth
  //! the userId is a character-numerical string that clerk creates AFTER the user signs up for clerk in the sign-up page (<SignUp/>)
  const { userId } = auth();

  // need a form for user to add their data
  // need a handle submit function
  //   async function handleSubmit(formData) {
  //     // need to specify that we are in the server
  //     // need to activate the db connection
  //     // need to get the form data input
  //     const name = formData.get("name");

  //     // need to insert the data into the db
  //     //! sql is incomplete
  //     await db.query(`INSERT INTO users (clerk_id) VALUES ($1)`, [userId]);
  //     // need to revalidate the path
  //     // can also redirect if I want
  //   }
  return (
    <main className="">
      <h1>User Profile</h1>
      {/* need a form here! */}
      <h1>User Profile</h1>
      <h2>Your data!</h2>
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
