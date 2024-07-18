import { SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
  return (
    <main className="">
      <h1>Please, sign up for an account</h1>
      <SignUp />
    </main>
  );
}

// make sure the user sees this page first, before they can complete their own profile page.
// The reason is, when the user signs up for an account, Clerk will create a userId for them. This userId is a character-numerical string that Clerk creates AFTER the user signs up for Clerk in the sign-up page (<SignUp/>).
