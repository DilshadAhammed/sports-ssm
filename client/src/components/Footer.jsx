import ssmlogo from "../assets/ssmlogo.png";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-[#411313] py-10 px-6 lg:px-20 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          {/* Left Section */}
          <div>
            <div className="flex items-center space-x-4 justify-center md:justify-start">
              <img src={ssmlogo} alt="SSM Logo" className="h-12" />
              <h2 className="text-lg font-bold">
                SEETHI SAHIB MEMORIAL <br /> POLYTECHNIC COLLEGE TIRUR
              </h2>
            </div>
            <p className="text-sm mt-2">
              <i className="fas fa-phone mr-2"></i>Phone: +91 494-2422234
            </p>
            <p className="text-sm">
              <i className="fas fa-envelope mr-2"></i>Email: ssmtirur@gmail.com
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <p className="text-sm">Powered by</p>
            <h2 className="text-lg font-bold">COMPUTER ENGINEERING</h2>
            <a
              href="https://github.com/DilshadAhammed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 text-2xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
