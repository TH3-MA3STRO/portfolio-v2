"use client";

import type React from "react";
import code from "../public/illustrations/code.svg";
import hn from "../public/projects/hn.png";
import pharmora from "../public/projects/pharmora.jpg";
import insurefi from "../public/projects/insurefi.jpg";

import self from "../public/people/self.jpg";
import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Github, Linkedin, Mail } from "lucide-react";
import Typewriter from "@/components/ui/typewriter";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SkillsSection from "@/components/skills-section";
import OtherProjects from "@/components/other-projects";
import NowPlayingCard from "@/components/now-playing";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("https://formspree.io/f/mrbpdgzv", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: new FormData(e.target as HTMLFormElement),
    });

    const result = await res.json();

    if (result.ok) {
      setStatus("Thanks! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Oops! Something went wrong.");
    }
  };
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [underlineStyle, setUnderlineStyle] = useState({
    left: "0",
    width: "0",
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navBarRef = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const navRefs = {
    home: useRef<HTMLLIElement>(null),
    about: useRef<HTMLLIElement>(null),
    skills: useRef<HTMLLIElement>(null),
    works: useRef<HTMLLIElement>(null),

    testimonials: useRef<HTMLLIElement>(null),
    contact: useRef<HTMLLIElement>(null),
  };
  const testimonials = [
    {
      name: "Chiranjeet Samal",
      designation: "Video Editor",
      image:'/people/chiranjeet.jpg',
      content:
        "Satyam Jha is a talented web developer and a great friend. He’s reliable, creative, and always delivers clean, efficient work. If you need someone who knows their stuff and genuinely cares about the outcome, he’s your guy.",
    },
    {
      name: "Dr. V. Muthumanikandan",
      designation: "Professor, Faculty Co-ordinator @ Hackclub",
      image: '/people/muthusir.jpg',
      content:
        "Satyam Jha has been an invaluable part of HackClub. He led the development of the HackNight website, contributed to the club’s official website, and consistently supported the successful execution of multiple events. His technical skills, reliability, and collaborative attitude make him a standout member of the club.",
    },
  ];
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

  // UNDERLINE LOGIC
  useEffect(() => {
    const activeButton = navBarRef.current[activeSection];
    if (activeButton) {
      setUnderlineStyle({
        left: `${activeButton.offsetLeft}px`,
        width: `${activeButton.offsetWidth}px`,
      });
    }
  }, [activeSection]);

// DARK MODE
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
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b-2 border-b-[#e63946] px-6 py-4 transition-colors duration-300 bg-white/80 dark:bg-[#1b1d21cc] backdrop-blur-sm">
        <div className="flex items-center justify-between mx-auto">
          <div className="px-4 relative h-14 w-[4.5rem]">
            {darkMode && (
              <Image
                fill
                src={"/logowhite.png"}
                className="scale-125"
                alt="logo"
              />
            )}
            {!darkMode && (
              <Image
                fill
                src={"/logodark.png"}
                className="scale-125"
                alt="logo"
              />
            )}
          </div>

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
      <main className="mx-auto pt-[5.2rem]">
        {/* Hero Section */}
        <section
          id="hero"
          ref={navRefs.home}
          className="min-h-screen min-w-full md:bg-[url(/illustrations/wave-bg.svg)] bg-cover flex flex-col bg-opacity-85 justify-center items-center text-center px-4 relative"
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
                variant={"outline"}
                onClick={() => scrollToSection("works")}
                className="px-4 md:px-6 me-4 !py-6 text-sm md:text-lg text-[#d63836] dark:bg-transparent border-[#d63836] rounded-[8px] hover:bg-[#d62836] dark:hover:bg-[#d62836] transition-colors duration-300 hover:text-white shadow-lg hover:shadow-xl"
              >
                View my Work
              </Button>
              <Button
                variant={"outline"}
                onClick={() => scrollToSection("contact")}
                className="px-6 !py-6 bg-[#e63946] text-sm md:text-lg text-white  rounded-[8px] hover:bg-[#d62836] transition-colors duration-300 hover:text-white shadow-lg hover:shadow-xl"
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
          className="min-h-screen flex flex-col justify-center py-16 px-4 dark:bg-[#1b1d21cc]"
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

            <div className="px-4 space-y-4 text-sm md:text-[16px] text-gray-700 dark:text-gray-300">
              <p>
                Hey! I’m <span className="text-[#d62836]">Satyam Jha</span> aka{" "}
                <span className="text-[#d62836]">th3-ma3stro</span> — a
                second-year{" "}
                <span className="text-[#d62836]">Computer Science</span> &{" "}
                <span className="text-[#d62836]">Engineering</span> student at{" "}
                <span className="text-[#d62836]">VIT Chennai</span>, curious{" "}
                <span className="text-[#d62836]">Full Stack Developer</span>,{" "}
                <span className="text-[#d62836]">Freelancer</span>, and someone
                who loves building things that blend clean design with
                real-world usefulness.
              </p>

              <p>
                But honestly, this journey started way before college. back in
                Class 8 or 9 — I stumbled into the world of development through{" "}
                <span className="text-[#d62836]">XDA Developers</span>. Owning
                the legendary "Santoni" (if you know, you know!) pulled me deep
                into <span className="text-[#d62836]">Android Development</span>{" "}
                — flashing <span className="text-[#d62836]">Custom ROMs</span>,
                tweaking <span className="text-[#d62836]">Kernels</span>, and
                maximizing phone performance. That’s where the obsession really
                began.
              </p>

              <p>
                Fast forward to today — I’ve traded Android kernels for
                {" "}<span className="text-[#d62836]">
                  Full-Stack Web Development
                </span>
                , building scalable digital experiences with{" "}
                <span className="text-[#d62836]">Next.js</span>,{" "}
                <span className="text-[#d62836]">Rust</span>, and{" "}
                <span className="text-[#d62836]">TypeScript</span>. I also have
                a keen interest in <span className="text-[#d62836]">Web3</span>{" "}
                and{" "}
                <span className="text-[#d62836]">Blockchain technologies</span>.{" "}
                Beyond personal projects and freelance work, I balance tech life
                with <span className="text-[#d62836]">Music</span>🐉⚔ and the{" "}
                <span className="text-[#d62836]">Gym</span>.
              </p>

              <p>
                Along the way, I’ve had some really cool opportunities to test
                my skills and work with talented teams, including:
              </p>

              <ul className="text-sm md:text-[16px] space-y-2 py-2 text-gray-700 dark:text-gray-300">
                <li>
                  🏆 Securing{" "}
                  <span className="text-[#d62836]">1st Runner-Up</span> at{" "}
                  <span className="text-[#d62836]">
                    Intel GenAI Hackathon 2024
                  </span>
                </li>
                <li>
                  🏆 Making it to the{" "}
                  <span className="text-[#d62836]">Top 4</span> at the{" "}
                  <span className="text-[#d62836]">
                    Accenture Innovations Challenge 2024
                  </span>
                </li>
                <li>
                  🏆 Winning{" "}
                  <span className="text-[#d62836]">Best Unique Aptos dApp</span>{" "}
                  at <span className="text-[#d62836]">Defy 2025</span>
                </li>
              </ul>
              <NowPlayingCard />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={navRefs.skills}
          className="min-h-screen bg-gray-200 flex flex-col justify-center py-16 px-4 dark:bg-[#1b1d21cc]"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-[#e63946]">Skills</span>
          </h2>
          <SkillsSection />
        </section>
        <section
          data-section="resume"
          className=" min-h-screen flex flex-col justify-center items-center px-6 py-16"
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
          <div className="max-w-3xl w-full px-4">
            <h3 className="text-2xl font-semibold mb-6 text-center text-[#e63946]">
              Experience Highlights
            </h3>
            <ol className="relative border-l border-gray-300 dark:border-gray-600">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-4 h-4 bg-[#e63946] rounded-full -left-2 ring-8 ring-white dark:ring-gray-900"></span>
                <h4 className="font-medium leading-tight text-[16px] md:text-lg">
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
                <h4 className="font-medium leading-tight text-[16px] md:text-lg">
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
                <h4 className="font-medium leading-tight text-[16px] md:text-lg">
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
                <h4 className="font-medium leading-tight text-[16px] md:text-lg">
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
          className="min-h-screen flex flex-col justify-center py-16 px-4 dark:bg-[#1b1d21cc]"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-[#e63946]">Works</span>
          </h2>

          <div className="grid px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Project 1 */}
            <div className="bg-white dark:bg-[#2d2d2d] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 md:hover:scale-105 md:hover:shadow-xl">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-4xl h-[192px] w-full relative text-gray-400 overflow-hidden">
                  <Image src={pharmora} alt="pharmora"></Image>
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
            <div className="bg-white dark:bg-[#2d2d2d] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 md:hover:scale-105 md:hover:shadow-xl">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-4xl w-full h-[192px] relative text-gray-400 overflow-hidden">
                  <Image src={insurefi} alt="pharmora"></Image>
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
            <div className="bg-white dark:bg-[#2d2d2d] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 md:hover:scale-105 md:hover:shadow-xl">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-4xl w-full h-[192px] relative text-gray-400 overflow-hidden">
                  <Image src={hn} alt="pharmora"></Image>
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
        <OtherProjects />

        {/* Testimonials Section */}
        <section
          id="testimonials"
          ref={navRefs.testimonials}
          className="min-h-screen flex flex-col justify-center py-16 px-4 dark:bg-[#1b1d21cc]"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-[#e63946]">Testimonials</span>
          </h2>

          <div className="px-4 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#2d2d2d] p-8 rounded-lg shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full relative bg-gray-200 dark:bg-[#5c5c5c] flex items-center justify-center mr-4">
                      <Image
                        src={item.image}
                        className="rounded-full"
                        fill
                        alt="chiru"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.designation}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{item.content}"
                  </p>
                </div>
              ))}
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

          <div className="px-4 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
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

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#e63946] transition-colors duration-300"
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
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#e63946] transition-colors duration-300"
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
                <Textarea
                  id="message"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#e63946] transition-colors duration-300"
                  placeholder="Your message here..."
                  required
                ></Textarea>
              </div>

              <Button
                type="submit"
                className="px-6 py-3 bg-[#e63946] text-white rounded-md hover:bg-[#d62836] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </Button>
              {status && <p>{status}</p>}
            </form>
          </div>
        </section>
        <section id="footer">
          <div className="border-t-2 border-[#e63946]">
            <p className="text-center py-5">
              Designed and Developed by Satyam Jha ©️ 2025
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
