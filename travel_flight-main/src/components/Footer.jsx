import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import bkash from "src/assets/bkash.jpg";
import rock from "src/assets/rocket.jpg";
import nagad from "src/assets/nogod.jpg";
import master from "src/assets/mc.jpg";
import visa from "src/assets/visa.jpg";
import picard from "src/assets/picard.jpg";
import iata from "src/assets/iata.jpg";
import google from "src/assets/google.jpg";

const Footer = () => {
  return (
    <footer className="bg-teal-200 text-gray-700 py-6 ">
      <div className="container rounded-3xl  mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-teal-700 font-bold text-sm mb-2">FLYINGZONE</h3>
            <p className='text-black text-xs'>FlyingZone Dhaka (Main Branch)</p>
            <p className='text-black text-xs'>901 Motijheel City Centre Level 25-B-1, Lift 26 Dhaka 1000, Bangladesh</p>
            <div className="flex space-x-2 mt-2 text-black">
              <FaFacebookF />
              <FaInstagram />
              <FaLinkedinIn />
              <FaPinterestP />
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-bold text-teal-700 text-xs mb-2">About</h4>
            <ul className="space-y-1 text-black text-xs">
              <li>About FlyingZone</li>
              <li>Best Price Guarantee</li>
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-bold text-teal-700 text-xs mb-2">Help</h4>
            <ul className="space-y-1 text-black text-xs">
              <li>FAQs</li>
              <li>Easy EMI</li>
              <li>Payment Methods</li>
              <li>Contact Us</li>
            </ul>
            <p className="mt-2 text-black text-xs">Have Questions?</p>
            <p className="text-black text-xs">+88-09617-111-888</p>
            <p className="text-black text-xs">sales@flyingzone.com</p>
          </div>

          {/* Payment Logos */}
          <div>
            <h4 className="font-bold text-teal-700 text-xs mb-2">Accepted Payments</h4>
            <div className="flex space-x-2">
              <img src={bkash} className="w-10 h-6" />
              <img src={rock} className="w-10 h-6" />
              <img src={nagad} className="w-10 h-6" />
              <img src={master} className="w-10 h-6" />
              <img src={visa} className="w-10 h-6" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 border-t border-teal-700 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-teal-700 text-xs mb-2">Authorized By</h4>
              <img src={iata} className="w-32 h-auto" alt="Authorized By" />
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-teal-700 text-xs mb-2">Verified By</h4>
              <img src={picard} className="w-32 h-auto" alt="Verified By" />
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-teal-700 text-xs mb-2">Our Partners</h4>
              <img src={google} className="w-32 h-auto" alt="Our Partners" />
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-black text-xs font-semibold">© 2024 FlyingZone Ltd. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
