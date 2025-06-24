import { IAccount } from "@/types";
import { Search } from "lucide-react";
import Link from "next/link";

type NavbarProps = {
  account: IAccount | null;
};

function Navbar({ account }: NavbarProps) {
  return (
    <nav className="bg-gray-800 px-4 py-3 flex items-center justify-between">
      <div className="text-white font-bold text-xl">Netflix</div>

      <div className="flex items-center bg-gray-700 rounded overflow-hidden w-[900px] max-w-[900px]">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button className="p-2 hover:bg-gray-600 transition-colors duration-200 text-white">
          <Search size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="/favorites"
          className="text-white hover:text-red-400 transition"
        >
          Favorites
        </a>
        <img
          src={account?.accountImg}
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border-2 border-white"
        />
      </div>
    </nav>
  );
}

export default Navbar;
