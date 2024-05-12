import React from "react";
import NewAccountForm from "@/components/NewAccountForm";

export default function page() {
  // create and use a repetitive utils component that checks if a user is logged in or not then routes them to ie landing page
  // has to be done pages that should be hidden ie settings page, but profile pages should not have this in it and maybe home page idk

  let newUser = true

if (newUser) {
  return (
    <main>
      <h1>Complete setting up your account</h1> <NewAccountForm />
    </main>
  );
} 

  return (
    <main>
      <h1>Settings</h1> <p>Section A</p> <p>Section B</p> <p>Section C</p>
    </main>
  );
}


