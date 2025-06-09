"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    redirect("/manage-accounts");
  }

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        background: "url(/bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-[300px] h-[250px] bg-black/80 rounded flex items-center justify-center">
        <button
          className="w-[80%] bg-red-700 text-white py-2 font-bold rounded"
          onClick={() => {
            signIn("google");
            router.push("/manage-accounts");
          }}
        >
          Login With Google
        </button>
      </div>
    </div>
  );
}

export default HomePage;
