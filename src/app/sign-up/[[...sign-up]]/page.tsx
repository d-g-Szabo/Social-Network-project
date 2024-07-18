"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

export default function SignUpPage() {
  return (
    <SignUp.Root>
      <SignUp.Step
        name="start"
        className="bg-white w-96 rounded-2xl py-10 px-8 shadow-sm border space-y-6"
      >
        <h1>Create an account</h1>
        <div className="grid grid-cols-2 gap-x-4">
          <Clerk.Connection
            name="google"
            className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
          >
            <Clerk.Icon className="size-4" />
            Google
          </Clerk.Connection>
          <Clerk.Connection
            name="facebook"
            className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
          >
            <Clerk.Icon className="size-4" />
            Facebook
          </Clerk.Connection>
          <Clerk.Connection
            name="github"
            className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
          >
            <Clerk.Icon className="size-4" />
            Git-Hub
          </Clerk.Connection>
        </div>
        <Clerk.Field name="username">
          <Clerk.Label>Username</Clerk.Label>
          <Clerk.Input />
          <Clerk.FieldError />
        </Clerk.Field>

        <Clerk.Field name="emailAddress">
          <Clerk.Label>Email</Clerk.Label>
          <Clerk.Input />
          <Clerk.FieldError />
        </Clerk.Field>

        <Clerk.Field name="password">
          <Clerk.Label>Password</Clerk.Label>
          <Clerk.Input />
          <Clerk.FieldError />
        </Clerk.Field>

        <Clerk.Field name="first_name">
          <Clerk.Label>First Name</Clerk.Label>
          <Clerk.Input />
          <Clerk.FieldError />
        </Clerk.Field>

        <Clerk.Field name="last_name">
          <Clerk.Label>Last Name</Clerk.Label>
          <Clerk.Input />
          <Clerk.FieldError />
        </Clerk.Field>

        <Clerk.Field name="middle_name">
          <Clerk.Label>Middle Name</Clerk.Label>
          <Clerk.Input />
          <Clerk.FieldError />
        </Clerk.Field>

        <Clerk.Field name="gender">
          <Clerk.Label>Gender</Clerk.Label>
          <Clerk.Input />
          <Clerk.FieldError />
        </Clerk.Field>

        <SignUp.Action submit>Sign up</SignUp.Action>
      </SignUp.Step>
      <SignUp.Step name="continue">
        <h1>Fill in missing fields</h1>

        <Clerk.Field name="username">
          <Clerk.Label>Username</Clerk.Label>
          <Clerk.Input />
          <Clerk.FieldError />
        </Clerk.Field>

        <SignUp.Action submit>Continue</SignUp.Action>
      </SignUp.Step>
      <SignUp.Step name="verifications">
        <SignUp.Strategy name="phone_code">
          <h1>Check your phone for an SMS</h1>

          <Clerk.Field name="code">
            <Clerk.Label>Phone Code</Clerk.Label>
            <Clerk.Input />
            <Clerk.FieldError />
          </Clerk.Field>

          <SignUp.Action submit>Verify</SignUp.Action>
        </SignUp.Strategy>

        <SignUp.Strategy name="email_code">
          <h1>Check your email</h1>

          <Clerk.Field name="code">
            <Clerk.Label>Email Code</Clerk.Label>
            <Clerk.Input />
            <Clerk.FieldError />
          </Clerk.Field>

          <SignUp.Action submit>Verify</SignUp.Action>
        </SignUp.Strategy>
      </SignUp.Step>
    </SignUp.Root>
  );
}

// make sure the user sees this page first, before they can complete their own profile page.
// The reason is, when the user signs up for an account, Clerk will create a userId for them. This userId is a character-numerical string that Clerk creates AFTER the user signs up for Clerk in the sign-up page (<SignUp/>).
