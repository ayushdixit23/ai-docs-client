"use client"
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";


export default function Home() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <p>Not signed in</p>;
  }

  console.log(user,"user")
  return (
    <>
    <UserButton/>

    <h2>Welcome, {user?.firstName + " " + user?.lastName}!</h2>
    <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
    </>
  );
}
