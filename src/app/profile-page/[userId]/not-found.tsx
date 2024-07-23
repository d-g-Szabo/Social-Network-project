import { ActiveLink } from "@/components/ActiveLink";

export default function notFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          No users were Found!
        </h1>
        <ActiveLink href="/">Go back</ActiveLink>
      </div>
    </main>
  );
}
