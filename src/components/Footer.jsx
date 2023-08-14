import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import logo from "@/assets/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {/* Footer Column 1 */}
          <div className="mb-8 md:mb-0">
            <Image src={logo} alt="logo" width={48} className="mb-1"></Image>
            <p className="text-lg font-bold uppercase">Replica</p>
            <p className="text-sm text-gray-400">
              Welcome to Replica, your gateway to professional success. We're
              dedicated to helping you find your dream job and connecting
              employers with top talents. Join us in shaping a brighter future,
              one opportunity at a time.
            </p>
          </div>

          {/* Footer Column 2 - Quick Links */}
          <div className="md:col-span-1 mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <nav>
              <ul className="grid gap-2">
                <li>
                  <a href="/about" className="text-sm hover:text-gray-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-sm hover:text-gray-300">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm hover:text-gray-300">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-sm hover:text-gray-300">
                    FAQ
                  </a>
                </li>
                {/* Add more quick links here */}
              </ul>
            </nav>
          </div>

          {/* Footer Column 3 - Social Media */}
          <div className="md:col-span-1 mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <FaFacebookF className="text-white text-xl cursor-pointer hover:text-gray-300"></FaFacebookF>
              <FaTwitter className="text-white text-xl cursor-pointer hover:text-gray-300"></FaTwitter>
              <FaInstagram className="text-white text-xl cursor-pointer hover:text-gray-300"></FaInstagram>
              <FaLinkedinIn className="text-white text-xl cursor-pointer hover:text-gray-300"></FaLinkedinIn>
              {/* Add more social media icons here */}
            </div>
          </div>

          {/* Footer Column 4 */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-400 mb-2">
              123 Street, Dhaka
              <br />
              Bangladesh, 1207
            </p>
            <p className="text-sm text-gray-400">
              Email: info@replica.com
              <br />
              Phone: +1 (123) 456-7890
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-800 py-4 text-center text-sm">
        {/* Add some descriptive text or copyright information here */}
        &copy; {new Date().getFullYear()} REPLICA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
