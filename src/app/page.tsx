import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/utils/dbConnection";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();
  const db = dbConnect();
  const userData = (
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId])
  ).rows[0];
  // if the user has no data, redirect them to the create profile page
  if (!userData) {
    redirect(`/create-profile-page/${userId}`);
  }
  return <main className="">asd</main>;
}
