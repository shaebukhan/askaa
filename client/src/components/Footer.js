import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-4 bg-[#CFC8E9] md:p-6 text-[#665A90] font-medium mt-20 rounded-md">
      <div className="mx-auto max-w-screen-xl text-center ">
        <span className="text-lg text-[#665A90] sm:text-center ">
          @{new Date().getFullYear()}{" "}
          <Link
            to="/"
            className="hover:text-slate-600 font-bold text-[#665A90]"
          >
            Aska Agency - Dashboard{" "}
          </Link>
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
