import pg from "pg";
export default function dbConnect() {
  const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL;
  const db = new pg.Pool({
    connectionString: connectionString,
  });
  // Return the db so it is available outside of this function
  return db;
}
