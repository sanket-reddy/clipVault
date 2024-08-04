import Link from "next/link";
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "./modeToggle";
export default function Navbar() {
  return (
    <div className="w-full flex justify-between py-3 items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold">ClipVault</h1>
      </Link>
      {/* <button className="bg-zinc-800 hover:bg-zinc-900 fo rounded-md p-3 w-[100px]"> */}
      {/* Signin */}
      {/* </button> */}
      {/* <ModeToggle></ModeToggle> */}
      <SignedOut>
        <div className="w-[100px] bg-zinc-800 flex flex-col items-center p-3 rounded-md">
        <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
