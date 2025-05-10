import React from 'react';
import escalaytlogo from '../../assets/escalayt-logo.svg';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12 mt-12">
      {/* CTA Banner */}
      <div className=" rounded-lg py-10 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-2">Get Started Today</h2>
          <p className="text-gray-100 text-sm">
            Join the many businesses that trust Escalayt for their facility management needs.
          </p>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
          Download Now
        </button>
      </div>

      {/* Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Contact */}
        <div>
          <div className="flex items-center mb-4">
            <img src={escalaytlogo} alt="Escalayt Logo" className="w-8 h-8 mr-2" />
            <span className="text-lg font-semibold text-white">Escalayt</span>
          </div>
          <p className="text-sm text-gray-400">
            For support, email us at <a href="mailto:support@escalayt.com" className="text-blue-400">support@escalayt.com</a><br />
            or call (123) 456-7890.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400">Community</a></li>
            <li><a href="#" className="hover:text-blue-400">Partners</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Facebook</a></li>
            <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
            <li><a href="#" className="hover:text-blue-400">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Escalayt. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
