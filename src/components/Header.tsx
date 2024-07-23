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
import { Button } from "@/components/ui/button";

export default function HeaderComponent() {
  const { userId } = auth();
  // refresh the Header component when the user logs in or out
  //   if (userId) {
  //     console.log("user ID: " + userId);
  //   }
  return (
    <header className="flex justify-around items-center p-4 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-gray-800">Yourplace</h1>
      <nav className="flex space-x-4">
        <ActiveLink href="/">Home</ActiveLink>
        {/* authentication navigation */}
        <SignedIn>
          <ActiveLink href={`/user/${userId}`}>My Profile</ActiveLink>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button asChild variant="outline">
            <SignInButton>Sign in</SignInButton>
          </Button>
          <Button asChild variant="outline">
            <SignUpButton>Sign up</SignUpButton>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
}
