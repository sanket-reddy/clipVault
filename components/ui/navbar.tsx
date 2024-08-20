import Link from "next/link";
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,

} from "@clerk/nextjs";
import {User} from "@clerk/backend";
import {Input} from "@/components/ui/input";
import SearchUser from "@/components/custom/searchUser";



export default  function Navbar({userId} : {userId: string | null}) {
  return (

    <div className="w-full flex justify-between py-3 ">
      <Link href="/">
        <h1 className="text-2xl font-bold">ClipVault</h1>
      </Link>
        {userId ? <SearchUser></SearchUser>
            : null}


        <SignedOut>
            <div className="w-[100px] bg-zinc-800 flex flex-col items-center p-3 rounded-md">
        <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="h-[100px]">
        <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
