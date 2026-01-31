"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { currentEvent } from "./eventData";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Event data - will be fetched from database
  const { name: eventName, year, images } = currentEvent;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <Link href="/" className="flex items-center gap-3">
              {images.logo && (
                <Image
                  src={images.logo}
                  alt={`${eventName} logo`}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              )}
              <span className="text-2xl font-bold text-white">
                {eventName}
              </span>
              <span className="text-sm font-medium text-royalStart">
                {year}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 hover:text-white transition-colors duration-300 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/api/auth/login"
                className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/api/auth/register"
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-royalStart to-royalEnd rounded-lg hover:shadow-lg hover:shadow-royalStart/25 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute top-20 left-4 right-4 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-300 hover:text-white transition-colors duration-300 font-medium py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <hr className="border-slate-800" />
                <Link
                  href="/api/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white transition-colors duration-300 font-medium py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/api/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-5 py-3 text-center font-medium text-white bg-gradient-to-r from-royalStart to-royalEnd rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
