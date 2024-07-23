import dbConnect from "@/utils/dbConnection";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default async function RenderPostsComp() {
  const db = dbConnect();
  // get the posts from the database
  const posts = (
    await db.query(
      `SELECT posts.user_clerk_id, first_name, last_name, about_me, content, posts.id FROM posts, users WHERE users.clerk_id = posts.user_clerk_id ORDER BY posts.id desc`
    )
  ).rows;
  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-2xl space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
            <Link href={`/profile-page/${post.user_clerk_id}`}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300" />
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {post.first_name} {post.last_name}
                  </div>
                  <div className="text-sm text-gray-500">{post.about_me}</div>
                </div>
              </div>
            </Link>
            <p className="text-gray-800">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
