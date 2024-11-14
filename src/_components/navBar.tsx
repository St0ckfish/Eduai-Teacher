/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FiFlag } from "react-icons/fi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBusAlt } from "react-icons/fa";
import { CiSquareCheck } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { MdAttachMoney } from 'react-icons/md';

const useWindowDimensions = () => {
  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState(
    isClient
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: undefined, height: undefined },
  );

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return windowSize;
};

interface NavBarLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  small: boolean;
  url: string;
}

const NavBarLink = ({
  href,
  icon: Icon,
  label,
  small,
  url,
}: NavBarLinkProps) => {
  const isActive = url === href;
  return (
    <li>
      <Link
        className={`flex ${small ? "w-[40px]" : ""} text-md group mt-4 items-center gap-x-3.5 rounded-lg px-2.5 py-2 font-sans font-semibold text-gray-500 hover:bg-bgSecondary hover:text-primary`}
        href={href}
      >
        <Icon
          className={`h-10 w-10 ${small ? "" : "pl-4"} ${
            isActive
              ? `${small ? "" : "border-l-2"} border-primary text-primary`
              : ""
          } text-black`}
        />
        {!small && (
          <p
            className={`translate-y-0.5 ${isActive ? "text-primary" : ""} text-black`}
          >
            {label}
          </p>
        )}
      </Link>
    </li>
  );
};

const NavBar = () => {
  const url = usePathname();
  const [small, setSmall] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const toggleNavbar5 = () => {
    setIsOpen5(!isOpen5);
  };

  const toggleNavbarSmall = () => {
    setSmall(!small);
    if (!small == true) {
      setIsOpen5(true);
    }
    if (small == true) {
      setIsOpen5(false);
    }
  };

  const OpenSideBar = () => {
    setIsOpen(!isOpen);
  };

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width !== undefined && width >= 1023) {
      setIsOpen(true);
    }
  }, [width]);

  const navLinks = [
    { href: "/", icon: AiFillHome, label: "Home" },
    { href: "/schedule", icon: RiCalendarScheduleFill, label: "My Schedule" },
    { href: "/bus", icon: FaBusAlt, label: "Bus Tracker" },
    { href: "/finance", icon: MdAttachMoney, label: "Finance" },
    { href: "/complaint", icon: FiFlag, label: "Complaint" },
    { href: "/attendance", icon: CiSquareCheck, label: "My attendance" },
  ];

  return (
    <>
      <header>
        <div>
          <header
            className={`sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap bg-bgPrimary py-2.5 text-sm sm:flex-nowrap sm:justify-start sm:py-4 lg:ps-64`}
          >
            <nav
              className="mx-auto flex w-full basis-full items-center px-4 sm:px-6"
              aria-label="Global"
            >
              <div className="me-5 lg:me-0 lg:hidden">
                <Link
                  className="inline-block flex-none rounded-xl text-xl font-semibold focus:opacity-80 focus:outline-none"
                  href="/"
                  aria-label="Preline"
                >
                  <img src="/images/logo.png" alt="#" />
                </Link>
              </div>
              <div className="ms-auto flex w-full items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3">
                <div className="sm:hidden">
                  <button
                    type="button"
                    className="inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <svg
                      className="size-4 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                </div>

                <div className="hidden sm:block"></div>

                <div className="flex flex-row items-center justify-end gap-2">
                  <Link
                    href="/notifies"
                    className="text-textPrimary inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full text-sm font-semibold hover:bg-bgSecondary disabled:pointer-events-none disabled:opacity-50"
                  >
                    <svg
                      className="size-4 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                  </Link>
                  <Link
                    href="/chat"
                    className="text-textPrimary inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full text-sm font-semibold hover:bg-bgSecondary disabled:pointer-events-none disabled:opacity-50"
                  >
                    <svg
                      className="text-textPrimary h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </Link>

                  <div className="hs-dropdown relative inline-flex [--placement:bottom-right]"></div>
                </div>
              </div>
            </nav>
          </header>
          <div className="border-borderPrimary sticky inset-x-0 top-0 z-20 border-y bg-bgPrimary px-4 sm:px-6 md:px-8 lg:hidden">
            <div className="flex items-center justify-between py-2">
              <ol className="ms-3 flex items-center whitespace-nowrap">
                <li className="text-textPrimary flex items-center text-sm">
                  {/* Breadcrumb or other content */}
                </li>
              </ol>

              <button
                onClick={OpenSideBar}
                type="button"
                className="border-borderPrimary flex items-center justify-center gap-x-1.5 rounded-lg border px-3 py-2 text-xs text-gray-500 hover:text-gray-600"
                data-hs-overlay="#application-sidebar"
                aria-controls="application-sidebar"
                aria-label="Sidebar"
              >
                <svg
                  className="size-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13" />
                </svg>
                <span className="sr-only">Sidebar</span>
              </button>
            </div>
          </div>
          {isOpen && (
            <div
              dir={"ltr"}
              id="application-sidebar"
              className={`hs-overlay hs-overlay-open:translate-x-0 transform transition-all duration-300 [--auto-close:lg] ${
                small ? "w-[90px]" : "w-[260px]"
              } drop-shadow-2xl lg:drop-shadow-none ${
                !isOpen ? "w-0" : ""
              } fixed inset-y-0 start-0 z-[60] bg-bgPrimary duration-300 ease-in lg:bottom-0 lg:end-auto lg:block lg:translate-x-0`}
            >
              <div className="px-8 pt-4">
                <Link href="/">
                  {small ? (
                    <img
                      className="mt-5 scale-[2]"
                      src="/images/small logo.png"
                      alt="Logo"
                    />
                  ) : (
                    <img
                      className="-translate-7 w-[150px] translate-y-3"
                      src="/images/logo.png"
                      alt="Logo"
                    />
                  )}
                </Link>
              </div>
              <div className="mx-5 flex -translate-y-6 justify-end">
                {!small && (
                  <button onClick={toggleNavbarSmall}>
                    <svg
                      className="h-8 w-8 text-black"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                  </button>
                )}
              </div>

              <nav
                className={`hs-accordion-group flex w-full flex-col flex-wrap p-6 ${
                  !isOpen ? "hidden" : ""
                } `}
                data-hs-accordion-always-open
              >
                <ul className="space-y-1.5">
                  <div
                    className={`flex ${small ? "w-[40px]" : ""} justify-center`}
                  >
                    {small && (
                      <button onClick={toggleNavbarSmall}>
                        <svg
                          className="h-6 w-6 text-black"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="9 6 15 12 9 18" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {navLinks.map((link) => (
                    <NavBarLink
                      key={link.href}
                      href={link.href}
                      icon={link.icon}
                      label={link.label}
                      small={small}
                      url={url}
                    />
                  ))}
                  <li className="group relative">
                    <button
                      onClick={toggleNavbar5}
                      className={`flex ${!small ? "w-full" : ""} text-md group mt-4 items-center gap-x-3.5 rounded-lg px-2.5 py-2 font-sans font-bold text-secondary hover:bg-bgSecondary hover:text-primary`}
                    >
                      <HiOutlineSquares2X2
                        className={`h-10 w-10 ${small ? "h-6 w-6" : "pl-4"} ${isOpen5 ? `${small ? "" : "border-l-2"} border-primary text-primary` : ""} text-black`}
                      />
                      {!small && (
                        <p
                          className={`text-black ${isOpen5 ? "text-primary" : ""}`}
                        >
                          Menu
                        </p>
                      )}
                    </button>
                    {isOpen5 && (
                      <ul
                        className={`${small ? "hidden w-fit translate-x-5 whitespace-nowrap rounded-xl bg-bgPrimary p-2 group-hover:grid" : ""} mx-9 mt-2 grid gap-2 text-[14px] font-semibold`}
                      >
                        <Link
                          className={`hover:text-primary ${url === "/homework" ? "text-primary" : ""}`}
                          href="/homework"
                        >
                          {" "}
                          Homework{" "}
                        </Link>
                        <Link
                          className={`hover:text-primary ${url === "/textbooks" ? "text-primary" : ""}`}
                          href="/textbooks"
                        >
                          {" "}
                          Textbooks{" "}
                        </Link>
                        <Link
                          className={`hover:text-primary ${url === "/grades" ? "text-primary" : ""}`}
                          href="/grades"
                        >
                          {" "}
                          Grades{" "}
                        </Link>
                        <Link
                          className={`hover:text-primary ${url === "/exam" ? "text-primary" : ""}`}
                          href="/exam"
                        >
                          {" "}
                          Exam{" "}
                        </Link>
                        <Link
                          className={`hover:text-primary ${url === "/exercises" ? "text-primary" : ""}`}
                          href="/exercises"
                        >
                          {" "}
                          Exercises{" "}
                        </Link>
                      </ul>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default NavBar;
