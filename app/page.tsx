"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { div } from "framer-motion/client";

function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    redirect("/manage-accounts");
  }

  return (
    <div
      className="w-full h-screen bg-cover flex justify-center items-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="relative z-10 w-[300px] h-[250px] bg-black/80 rounded flex items-center justify-center">
        <button
          className="w-[80%] bg-red-700 text-white py-2 font-bold rounded"
          onClick={() => signIn("google", { callbackUrl: "/manage-accounts" })}
        >
          Login With Google
        </button>
      </div>
    </div>
  );
}

export default HomePage;
