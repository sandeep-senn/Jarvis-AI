import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Editor", path: "/editor" },
    { name: "Templates", path: "/templates" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-[50%] mt-8 bg-gray-50 backdrop-blur-full border-b z-50 rounded-full"
    >
      <div className="max-w-7xl m-1 px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="flex items-center space-x-2 pr-20">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                JarvisAI
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className="text-white/80 hover:text-blue-900 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Button */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center pl-20"
          >
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9 border-2 border-white/30",
                  userButtonPopoverCard: "shadow-lg rounded-xl mt-2 bg-gray-800",
                  userButtonTrigger: "focus:shadow-none",
                  userButtonOuterIdentifier: "text-white",
                }
              }}
              afterSignOutUrl="/"
            />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;