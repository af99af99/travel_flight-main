import React from "react";
import { Link } from "react-router-dom";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.creative-tim.com?ref=nr-footer-admin"
                  className="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
                >
                  EDU Web Dev Group - 2 Team
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="#"
                    className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                  >
                    Creative Tim
                  </a>
                </li>
                <li>
                  <Link
                    to={'/team'}
                    className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/PB-King-47/travel_flight.git"
                    className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                  >
                    MIT License
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
