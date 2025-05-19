"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

function Home() {
  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover flex justify-center items-center"
      style={{ backgroundImage: "url('/bg-img.jpg')" }}
    >
      <div className="bg-black/70 flex justify-center items-center rounded w-[350px] h-[300px]">
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
        >
          <FaGoogle size={24} className="text-white" />
          <span className="text-base font-medium">Login with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Home;
