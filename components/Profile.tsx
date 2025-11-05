
"use client";

import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Profile() {
  const { data: session } = useSession()
  const [show, setShow] = useState(false)

  return (
    <div>
      {session ? (
        <div className="relative">
          <Image onClick={()=> setShow(!show)} src={session.user?.image ? session.user?.image : '/profile.webp'} alt="" width={30} height={30} className="w-4 sm:w-8 rounded-full cursor-pointer"/>
          {show &&
          <button onClick={()=> {setShow(false); signOut()}} className="cursor-pointer absolute py-2 w-40 right-0 mt-2 rounded-xl  border border-gray-800 text-white   text-center font-semibold "> 
            Sign Out
          </button>}
        </div>
      ):(
        <div >
          <Link href={"/login"}>
          <User className="cursor-pointer"/>
          </Link>
          
        </div>
      )}
    </div>
  );
}
