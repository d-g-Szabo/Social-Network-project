import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/utils/dbConnection";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const { userId } = auth();
  const db = dbConnect();
  // get the user's data from the database
  const userData = (
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId])
  ).rows[0];
  // if the user has no data, redirect them to the create profile page
  if (!userData) {
    redirect(`/create-profile-page/${userId}`);
  } else {
    redirect(`/`);
  }
  return <></>;
}
