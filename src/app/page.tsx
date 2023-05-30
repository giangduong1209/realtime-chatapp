"use client";
import { signOut } from "next-auth/react";

export default async function Home() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
