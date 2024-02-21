import Image from "next/image";
import ActiveUsers from "./users/ActiveUsers";

const Navbar = () => {
  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white">
      <Image src="/logo.png" alt="Collabo" width={60} height={20} />
      <ActiveUsers />
    </nav>
  );
};

export default Navbar;
