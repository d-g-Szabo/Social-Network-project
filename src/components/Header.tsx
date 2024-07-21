import Link from "next/link";
import { ActiveLink } from "./ActiveLink";
import { auth } from "@clerk/nextjs/server";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function HeaderComponent() {
  const { userId } = auth();
  // refresh the Header component when the user logs in or out
  //   if (userId) {
  //     console.log("user ID: " + userId);
  //   }
  return (
    <header className="flex justify-around items-center p-4">
      <h1 className="text-2xl font-bold">Yourplace</h1>
      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        {/* authentication navigation */}
        <SignedIn>
          <ActiveLink href={`/user/${userId}`}>My Profile</ActiveLink>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>Sign in</SignInButton>
          <SignUpButton>Sign up</SignUpButton>
        </SignedOut>
      </nav>
    </header>
  );
}
