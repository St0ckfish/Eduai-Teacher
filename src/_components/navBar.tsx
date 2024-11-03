/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const url = usePathname();
  const [pathname, setPathname] = useState("");
  const [small, setSmall] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbarSmall = () => {
    setSmall(!small);
  };

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [pathname]);
  const OpenSideBar = () => {
    setIsOpen(!isOpen);
  };

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

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width !== undefined && width >= 1023) {
      setIsOpen(true);
    }
  }, [width]);

  return (
    <>
      <header>
        <div>
          <header
            className={` lg:ps-64 sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap bg-bgPrimary py-2.5 text-sm  sm:flex-nowrap sm:justify-start sm:py-4`}
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
                    className="inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-textPrimary hover:bg-bgSecondary disabled:pointer-events-none disabled:opacity-50"
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
                    className="inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-textPrimary hover:bg-bgSecondary disabled:pointer-events-none disabled:opacity-50"
                  >
                    <svg
                      className="h-5 w-5 text-textPrimary"
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

                  

                  <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                    
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <div
            className="sticky inset-x-0 top-0 z-20 border-y border-borderPrimary bg-bgPrimary px-4 sm:px-6 md:px-8 lg:hidden"
          >
            <div className="flex items-center justify-between py-2">
              <ol className="ms-3 flex items-center whitespace-nowrap">
                <li className="flex items-center text-sm text-textPrimary">
                  {/* {currentLanguage === "ar"
                    ? "تخطيط التطبيق"
                    : currentLanguage === "fr"
                      ? "Mise en page de l'application"
                      : "Application Layout"} */}

                  {/* {currentLanguage === "ar" ? (
                    <MdNavigateBefore size={25} className="text-gray-400" />
                  ) : (
                    <MdNavigateNext size={25} className="text-gray-400" />
                  )} */}
                </li>
              </ol>

              <button
                onClick={() => {
                  OpenSideBar();
                }}
                type="button"
                className="flex items-center justify-center gap-x-1.5 rounded-lg border border-borderPrimary px-3 py-2 text-xs text-gray-500 hover:text-gray-600"
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
              className={`hs-overlay hs-overlay-open:translate-x-0 transform transition-all duration-300 [--auto-close:lg] ${small ? "w-[90px]" : "w-[260px]"} drop-shadow-2xl lg:drop-shadow-none ${!isOpen ? "w-0" : ""} fixed inset-y-0 start-0 z-[60] bg-bgPrimary duration-300 ease-in lg:bottom-0 lg:end-auto lg:block lg:translate-x-0`}
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
                  <button
                    onClick={() => {
                      toggleNavbarSmall();
                    }}
                  >
                    <svg
                      className="h-8 w-8 text-secondary"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <line x1="4" y1="6" x2="20" y2="6" />{" "}
                      <line x1="4" y1="12" x2="20" y2="12" />{" "}
                      <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                  </button>
                )}
              </div>

              <nav
                className={`hs-accordion-group flex w-full flex-col flex-wrap p-6 ${!isOpen ? "hidden" : ""} `}
                data-hs-accordion-always-open
              >
                <ul className="space-y-1.5">
                  <div
                    className={`flex ${small ? "w-[40px]" : ""} justify-center`}
                  >
                    {small && (
                      <button
                        onClick={() => {
                          toggleNavbarSmall();
                        }}
                      >
                        <svg
                          className="h-6 w-6 text-secondary"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <polyline points="9 6 15 12 9 18" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <li>
                    <Link
                      className={`flex ${small ? "w-[40px]" : ""} text-md group mt-4 items-center gap-x-3.5 rounded-lg px-2.5 py-2 font-sans font-semibold text-gray-500 hover:bg-bgSecondary hover:text-primary`}
                      href="/"
                    >
                      <AiFillHome className={`w-10 h-10 ${small ? "" : "pl-4"} ${url === "/" ? `${small ? "" : "border-l-2" } border-primary text-primary` : ""}`}/>
                      {!small && (
                        <p className={`translate-y-0.5 ${url === "/" ? "text-primary" : ""}`}>
                         Home
                        </p>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`flex ${small ? "w-[40px]" : ""} text-md group mt-4 items-center gap-x-3.5 rounded-lg px-2.5 py-2 font-sans font-semibold text-gray-500 hover:bg-bgSecondary hover:text-primary`}
                      href="/schedule"
                    >
                      <RiCalendarScheduleFill className={`w-10 h-10 ${small ? "" : "pl-4"} ${url === "/schedule" ? `${small ? "" : "border-l-2" } border-primary text-primary` : ""}`}/>
                      {!small && (
                        <p className={`translate-y-0.5 ${url === "/schedule" ? "text-primary" : ""}`}>
                         My Schedule
                        </p>
                      )}
                    </Link>
                  </li>
                  
                </ul>
              </nav>
            </div>
          )}
        </div>
        <div></div>
      </header>
    </>
  );
};

export default NavBar;
