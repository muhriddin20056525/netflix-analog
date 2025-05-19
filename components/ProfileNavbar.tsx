import { FaSearch } from "react-icons/fa";

type ProfileNavbarProps = {
  name: string;
  avatar: string;
};

function ProfileNavbar({ name, avatar }: ProfileNavbarProps) {
  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between bg-black shadow-md">
      <div className="text-xl font-bold text-gray-800">
        <img src="/netflix-logo.webp" alt="netflix logo" width={120} />
      </div>

      <div className="relative flex items-center grow gap-4 mx-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-full border-white text-white"
        />
        <button className="absolute right-3 text-gray-500 hover:text-blue-600">
          <FaSearch />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-white">{name}</span>
        <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover border"
        />
      </div>
    </nav>
  );
}

export default ProfileNavbar;
