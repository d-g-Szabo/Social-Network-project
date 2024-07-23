import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/utils/dbConnection";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import RenderPostsComp from "@/components/RenderPosts";

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

  async function handleSubmit(formData: FormData) {
    "use server";
    const db = dbConnect();

    const post = formData.get("post");
    const userId = auth().userId;

    await db.query(
      `INSERT INTO posts (user_clerk_id, content) VALUES ($1, $2)`,
      [userId, post]
    );
    revalidatePath(`/`);
    redirect(`/`);
  }
  return (
    <main className="flex justify-center mt-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <form action={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="What's on your mind?"
              name="post"
              className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </form>
        </div>
        <RenderPostsComp />
      </div>
    </main>
  );
}
