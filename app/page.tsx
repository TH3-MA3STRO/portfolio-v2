"use client";

import type React from "react";
import growth from '../public/Growth.svg'
import code from '../public/code.svg'
import prog from '../public/prog.svg'
import self from '../public/self.jpg'
import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Github, Linkedin, Mail } from "lucide-react";
import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal";
import Typewriter from "@/fancy/components/text/typewriter";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [underlineStyle, setUnderlineStyle] = useState({
    left: "0",
    width: "0",
  });
  const [currentCertificate, setCurrentCertificate] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navBarRef = useRef<{ [key: string]: HTMLLIElement | null }>({});

  // Refs for navbar items
  const navRefs = {
    home: useRef<HTMLLIElement>(null),
    about: useRef<HTMLLIElement>(null),
    skills: useRef<HTMLLIElement>(null),
    works: useRef<HTMLLIElement>(null),

    testimonials: useRef<HTMLLIElement>(null),
    contact: useRef<HTMLLIElement>(null),
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId: string) => {
    const section = navRefs[sectionId as keyof typeof navRefs].current;
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      for (const section in navRefs) {
        const element = navRefs[section as keyof typeof navRefs].current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update underline position when active section changes
  useEffect(() => {
    const activeButton = navBarRef.current[activeSection];
    if (activeButton) {
      setUnderlineStyle({
        left: `${activeButton.offsetLeft}px`,
        width: `${activeButton.offsetWidth}px`,
      });
    }
  }, [activeSection]);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen min-w-full transition-colors duration-300 ${
        darkMode ? "dark bg-[#1e2124] text-white" : "bg-white text-gray-900"
      }`}
    >
      <link href="https://unpkg.com/pattern.css" rel="stylesheet"></link>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b-2 border-b-[#e63946] px-6 py-4 transition-colors duration-300 bg-white/80 dark:bg-[#1b1d21cc] backdrop-blur-sm">
        <div className="flex items-center justify-between mx-auto">
          <h1 className="text-xl font-bold">
            <span className="text-[#e63946]">Satyam</span> Jha
          </h1>

          <div className="relative flex items-center">
            <ul className="hidden min-[870px]:flex items-center space-x-8 mr-8">
              {Object.keys(navRefs).map((item, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    navBarRef.current[item] = el;
                  }}
                  className={`cursor-pointer py-2 transition-colors duration-300 ${
                    activeSection === item
                      ? "text-[#e63946]"
                      : "hover:text-[#e63946]"
                  }`}
                  onClick={() => {
                    scrollToSection(item);
                  }}
                >
                  {item.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                    letter.toUpperCase()
                  )}
                </li>
              ))}
            </ul>

            {/* Sliding underline */}
            <div
              className="hidden min-[870px]:block absolute bottom-0 h-0.5 bg-[#e63946] transition-all duration-300 ease-in-out"
              style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
              }}
            />
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2  rounded-full transition-colors  duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mr-2 relative"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              className="flex min-[870px]:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white dark:bg-gray-900 flex z-50 flex-col items-center justify-center space-y-8 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {Object.keys(navRefs).map((item, index) => (
          <li
            key={index}
            className={`list-none text-2xl cursor-pointer transition-colors duration-300 ${
              activeSection === item ? "text-[#e63946]" : "hover:text-[#e63946]"
            }`}
            onClick={() => {
              scrollToSection(item);
              setIsMobileMenuOpen(false);
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </li>
        ))}
      </div>
      {/* Main Content */}
      <main className="mx-auto pt-[4.2rem]">
        {/* Hero Section */}
        <section
          id="hero"
          ref={navRefs.home}
          className="min-h-screen min-w-full bg-[url(/blob.svg)] bg-cover flex flex-col bg-opacity-85 justify-center items-center text-center px-4 relative"
        >
          <div className="animate-fade-in-up w-full relative">
            <Image
              src={code}
              width={300}
              height={300}
              alt="developer"
              className="mx-auto  "
            ></Image>

            <h2 className="text-3xl  md:text-6xl font-bold mb-4">
              Hello there!👋
              <br />
              I'm <span className="text-[#e63946]">Satyam Jha</span>
            </h2>

            <div className="text-xl md:text-2xl   text-gray-600 dark:text-gray-300">
              I am a{" "}
              <Typewriter
                text={[
                  "full stack developer",
                  "tech enthusiast",
                  "freelancer",
                  "geek",
                ]}
                speed={70}
                className="inline text-[#e63946]"
                waitTime={1500}
                deleteSpeed={40}
                cursorChar={"_"}
              />
            </div>

            <div className="mx-auto my-6 w-[100%] flex flex-row justify-center ">
              <Button
                size={"lg"}
                variant={"outline"}
                onClick={() => scrollToSection("works")}
                className="px-2 me-4 !py-6 text-lg text-[#d63836] dark:bg-transparent border-[#d63836] rounded-[8px] hover:bg-[#d62836] transition-colors duration-300 hover:text-white shadow-lg hover:shadow-xl"
              >
                View my Work
              </Button>
              <Button
                variant={"outline"}
                size={"lg"}
                onClick={() => scrollToSection("contact")}
                className="px-2 !py-6 bg-[#e63946] text-lg text-white  rounded-[8px] hover:bg-[#d62836] transition-colors duration-300 hover:text-white shadow-lg hover:shadow-xl"
              >
                Hire Me
              </Button>
            </div>

            <div className="mt-12 animate-bounce mx-auto w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto text-[#e63946]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section
          id="about"
          ref={navRefs.about}
          className="min-h-screen flex flex-col justify-center py-16 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            About <span className="text-[#e63946]">Me</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl flex-shrink-0 bg-gray-200 dark:bg-gray-700 mx-auto md:mx-0">
              {/* Placeholder for profile photo */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Image src={self} alt="a picture of satyam jha"></Image>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Hey! I’m Satyam Jha — a second-year Computer Science and
                Engineering student at VIT Chennai, curious full stack
                developer, freelancer, and someone who loves building things
                that blend clean design with real-world usefulness.
              </p>
              <p>
                But honestly, this journey started way before college. Back in
                school — around Class 8 and 9 — I stumbled into the world of
                development through XDA Developers. Owning the legendary
                "Santoni" (if you know, you know!) pulled me deep into Android
                development — flashing custom ROMs, tweaking kernels, and
                figuring out how to push every bit of performance out of my
                phone. That’s where the obsession really began.
              </p>
              <p>
                Fast forward to today: I’ve swapped Android kernels for
                full-stack web development, and I now work with technologies
                like Next.js, Rust, and TypeScript to build scalable and smooth
                digital experiences. Alongside personal and freelance projects,
                I’m always trying to balance the technical side of life with
                things I enjoy — like zoning out to music or showing up at the
                gym. Along the way, I’ve had some really cool opportunities to
                test my skills and work with talented teams, including:
                <ul className="text-lg space-y-2 py-2 text-gray-700 dark:text-gray-300">
                  <li>
                    🏆 Securing 1st Runner-Up at Intel GenAI Hackathon 2024
                  </li>
                  <li>
                    🏆 Making it to the Top 4 at the Accenture Innovations
                    Challenge 2024
                  </li>
                  <li> 🏆 Winning Best Unique Aptos dApp at Defy 2025 </li>
                </ul>
                All of this has taught me that the real fun lies not just in
                building things, but in constantly learning, collaborating, and
                pushing past limitations. Whether it’s experimenting on a
                weekend project, contributing to a hackathon, or working with
                clients as a freelancer — I’m always excited about what I get to
                build next.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={navRefs.skills}
          className="min-h-screen flex flex-col justify-center py-16 px-4 bg-gray-50 dark:bg-gray-800/50"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-[#e63946]">Skills</span>
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-[#e63946]">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "C++",
                    "C",
                    "Python",
                    "JavaScript",
                    "TypeScript",
                    "Rust",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-[#e63946]">
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["ReactJS", "NextJS", "HTML", "CSS", "Sass", "EJS"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-[#e63946]">
                  Backend
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Django", "Flask", "ExpressJS", "Encore", "Bun"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-[#e63946]">
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Git", "GitHub", "Postman", "ChatGPT"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          data-section="resume"
          className="min-h-screen flex flex-col justify-center items-center px-6 py-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-center">
            <span className="text-[#e63946]">My</span> Resume
          </h2>

          <p className="text-lg text-center max-w-2xl text-gray-600 dark:text-gray-300 mb-8">
            Curious about my journey, skills, and achievements? Download or view
            my full resume to learn more.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {/* View Resume Button */}
            <a
              href="/SatyamJha_Resume.pdf" // Make sure your resume is in the public/ folder
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 rounded-[10px] bg-[#e63946] text-white font-medium hover:bg-[#d62839] transition-colors duration-300 shadow-md"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              View Resume
            </a>

            {/* Download Resume Button */}
            <a
              href="/SatyamJha_Resume.pdf"
              download
              className="flex items-center rounded-[10px] px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-md"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v16h16V4H4zm4 8h8m-4-4v8"
                />
              </svg>
              Download
            </a>
          </div>

          {/* Timeline / Experience Summary */}
          <div className="max-w-3xl w-full">
            <h3 className="text-2xl font-semibold mb-6 text-center text-[#e63946]">
              Experience Highlights
            </h3>
            <ol className="relative border-l border-gray-300 dark:border-gray-600">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-4 h-4 bg-[#e63946] rounded-full -left-2 ring-8 ring-white dark:ring-gray-900"></span>
                <h4 className="font-medium leading-tight text-lg">
                  President — HackClub VIT Chennai
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2025 – Present
                </p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  Leading tech communities, organizing large-scale hackathons,
                  and fostering collaborative learning.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-4 h-4 bg-[#e63946] rounded-full -left-2 ring-8 ring-white dark:ring-gray-900"></span>
                <h4 className="font-medium leading-tight text-lg">
                  Best Unique Aptos dApp — Defy
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Jan 2025
                </p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  Developed an innovative dApp using the Aptos blockchain
                  ecosystem.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-4 h-4 bg-[#e63946] rounded-full -left-2 ring-8 ring-white dark:ring-gray-900"></span>
                <h4 className="font-medium leading-tight text-lg">
                  Top 4 — Accenture Innovations Challenge
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dec 2024
                </p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  Conceptualized scalable solutions with high impact in
                  real-world tech environments.
                </p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-4 h-4 bg-[#e63946] rounded-full -left-2 ring-8 ring-white dark:ring-gray-900"></span>
                <h4 className="font-medium leading-tight text-lg">
                  1st Runner-Up — Intel GenAI Hackathon
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Oct 2024
                </p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  Designed AI-powered solutions in real-time, ranked 2nd among
                  nationwide teams.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Works Section */}
        <section
          id="works"
          ref={navRefs.works}
          className="min-h-screen flex flex-col justify-center py-16 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-[#e63946]">Works</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Project 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-4xl text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Pharmora</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  AI-powered tools for molecular bioactivity prediction,
                  solubility analysis, and new molecule generation.
                </p>
                <a
                  href="https://github.com/th3-ma3stro/pharmora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#e63946] hover:underline"
                >
                  <Github className="w-4 h-4 mr-1" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-4xl text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">InsureFi</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Rust smart contracts & Next.js frontend for decentralized life
                  insurance.
                </p>
                <a
                  href="https://github.com/th3-ma3stro/insurefi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#e63946] hover:underline"
                >
                  <Github className="w-4 h-4 mr-1" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-4xl text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  HackNight'25 Website
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Optimized for 3500+ users with real-time updates and zero
                  downtime.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://hacknight25.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#e63946] hover:underline"
                  >
                    Live
                  </a>
                  <a
                    href="https://github.com/th3-ma3stro/hacknight25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#e63946] hover:underline"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section
          id="certificates"
          ref={navRefs.certificates}
          className="min-h-screen flex flex-col justify-center py-16 px-4 bg-gray-50 dark:bg-gray-800/50"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-[#e63946]">Certificates</span>
          </h2>

          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentCertificate * 100}%)`,
                }}
              >
                {/* Certificate 1 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <div className="text-4xl text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-16 h-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        Intel GenAI Hackathon
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        1st Runner-Up
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                        2024
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certificate 2 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <div className="text-4xl text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-16 h-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        Accenture Innovations Challenge
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Finalist
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                        2024
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certificate 3 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <div className="text-4xl text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-16 h-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Defy 2025</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Best Unique Aptos dApp
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                        2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCertificate(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentCertificate === index
                      ? "bg-[#e63946]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to certificate ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentCertificate((prev) => (prev === 0 ? 2 : prev - 1))
              }
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Previous certificate"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() =>
                setCurrentCertificate((prev) => (prev === 2 ? 0 : prev + 1))
              }
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Next certificate"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          ref={navRefs.testimonials}
          className="min-h-screen flex flex-col justify-center py-16 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Client <span className="text-[#e63946]">Testimonials</span>
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Rahul Sharma</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      CEO, TechInnovate
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "Satyam delivered an exceptional web application for our
                  company. His attention to detail and problem-solving skills
                  are impressive. The project was completed ahead of schedule
                  and exceeded our expectations."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Priya Patel</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Founder, HealthTech Solutions
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "Working with Satyam on our healthcare platform was a great
                  experience. His technical expertise in both frontend and
                  backend development helped us create a seamless user
                  experience. Highly recommended!"
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Arjun Mehta</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      CTO, BlockChain Ventures
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "Satyam's knowledge of blockchain technology is impressive. He
                  helped us develop a secure and efficient smart contract
                  system. His ability to explain complex concepts in simple
                  terms made the collaboration smooth."
                </p>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Neha Gupta</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Product Manager, AI Solutions
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "We hired Satyam to integrate AI capabilities into our
                  existing platform. His innovative approach and deep
                  understanding of AI technologies helped us create a product
                  that stands out in the market."
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Connect Section */}
        <section
          id="connect"
          ref={navRefs.contact}
          className="min-h-screen flex flex-col justify-center py-16 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Connect <span className="text-[#e63946]">With Me</span>
          </h2>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Get In Touch</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Feel free to reach out if you're looking for a developer, have a
                question, or just want to connect.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#e63946]" />
                  <a
                    href="mailto:satyamjha778@gmail.com"
                    className="hover:text-[#e63946] transition-colors duration-300"
                  >
                    satyamjha778@gmail.com
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-[#e63946]" />
                  <a
                    href="https://www.linkedin.com/in/satyamxjhaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#e63946] transition-colors duration-300"
                  >
                    linkedin.com/in/satyamxjhaa
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-[#e63946]" />
                  <a
                    href="https://github.com/th3-ma3stro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#e63946] transition-colors duration-300"
                  >
                    github.com/th3-ma3stro
                  </a>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e63946] transition-colors duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e63946] transition-colors duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e63946] transition-colors duration-300"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#e63946] text-white rounded-md hover:bg-[#d62836] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
