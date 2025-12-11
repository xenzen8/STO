import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 text-white relative flex-shrink-0 group-hover:rotate-90 transition-transform duration-700">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="w-full h-full">
                    <line x1="50" y1="0" x2="50" y2="100" />
                    <line x1="0" y1="50" x2="100" y2="50" />
                    <circle cx="50" cy="50" r="18" />
                    <circle cx="50" cy="50" r="32" />
                    <circle cx="50" cy="50" r="46" />
                </svg>
                </div>
                <div className="flex flex-col justify-center">
                <span className="font-oswald text-3xl font-bold italic tracking-tighter text-orange-600 leading-none">STO</span>
                <span className="font-sans text-[0.5rem] font-bold tracking-[0.2em] text-white leading-none mt-1 opacity-90">TARGET SYSTEM</span>
                </div>
            </Link>
            <p className="text-sm leading-relaxed pt-2">
              Precision-engineered indoor shooting target solutions for professionals who demand accuracy, safety, and durability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-oswald text-lg mb-4 tracking-wide border-b-2 border-orange-600 inline-block pb-1">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-orange-500 transition-colors">Products & Services</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-oswald text-lg mb-4 tracking-wide border-b-2 border-orange-600 inline-block pb-1">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-600 shrink-0" />
                <span>124 Precision Drive, Suite 500<br/>Austin, TX 78701</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-600 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-600 shrink-0" />
                <span>solutions@stotargets.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h3 className="text-white font-oswald text-lg mb-4 tracking-wide border-b-2 border-orange-600 inline-block pb-1">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-orange-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-orange-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-orange-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-orange-600 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} STO Targets. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};