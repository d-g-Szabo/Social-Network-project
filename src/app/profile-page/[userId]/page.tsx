import dbConnect from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = auth();

  const db = dbConnect();
  const userData = (
    await db.query(
      `SELECT users.*, ARRAY_AGG(content) AS posts FROM users, posts WHERE clerk_id = $1 AND posts.user_clerk_id = users.clerk_id group by users.id;`,
      [params.userId]
    )
  ).rows[0];

  // if the user has no data, redirect them to not found page
  if (!userData) {
    notFound();
  }

  // Reverse the posts array in userData so that the most recent post is at the top
  userData.posts = userData.posts.reverse();

  return (
    <main className="flex justify-center mt-8">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Profile Page</h1>
        <p className="text-gray-700">
          {/* span is used to style the text inside the paragraph and it does not affect the layout like div */}
          <span className="font-semibold">First Name:</span>{" "}
          {userData.first_name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Last Name:</span> {userData.last_name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Middle Name:</span>{" "}
          {userData.middle_name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Gender:</span> {userData.gender}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {userData.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">About Me:</span> {userData.about_me}
        </p>
        <h2 className="text-xl font-semibold text-gray-800">Posts:</h2>
        <div className="space-y-4">
          {userData.posts.map((post: string, key: number) => {
            return (
              <div key={key} className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-800">{post}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
