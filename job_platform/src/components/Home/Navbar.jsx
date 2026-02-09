import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center mt-6">
      <div className="w-[90%] max-w-7xl bg-white rounded-full shadow-md px-6 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold tracking-wide font-['Poppins']">
            RecruitX360
          </span>
          <span className="text-[11px] text-gray-500 font-medium">
            Your Career, Accelerated
          </span>
        </div>

        {/* NAV LINKS */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <li className="hover:text-black cursor-pointer">Product</li>
          <li className="hover:text-black cursor-pointer">Features</li>
          <li className="hover:text-black cursor-pointer">Pricing</li>
          <li className="hover:text-black cursor-pointer">Resources</li>

          {/* ORGANIZATION DROPDOWN */}
          <li className="relative group cursor-pointer">
            <span className="hover:text-black">Organization</span>

            <ul className="absolute top-8 left-0 w-40 bg-white shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200">
              <li>
                <Link
                  to="/plans"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black"
                >
                  View Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/org/login"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black"
                >
                  Login
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Sign in
          </Link>

          <button className="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-900 transition">
            Request a Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
