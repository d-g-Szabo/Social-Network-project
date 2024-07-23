import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex justify-center mt-8">
      <SignIn />
    </main>
  );
}
