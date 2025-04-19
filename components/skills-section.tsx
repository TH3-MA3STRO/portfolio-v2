"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { icons } from "./icons"
import nextLogo from "../public/logos/next.svg";
import ejsLogo from "../public/logos/ejs.svg";
import flaskLogo from "../public/logos/flask.svg";
import djangoLogo from "../public/logos/django.svg";
import vueLogo from "../public/logos/vue.svg";
import cLogo from "../public/logos/c.svg";
import cppLogo from "../public/logos/c++.svg";
import rustLogo from "../public/logos/rust.svg";
import javaLogo from "../public/logos/java.svg";
import pythonLogo from "../public/logos/python.svg";
import tsLogo from "../public/logos/typescript.svg";
import gptLogo from "../public/logos/chatgpt.svg";
import canvaLogo from "../public/logos/canva.svg";
import gitLogo from "../public/logos/git-icon.svg";
import postmanLogo from "../public/logos/postman.svg";

import expressLogo from "../public/logos/express.svg";
import bunLogo from "../public/logos/bun.svg";
import nodeLogo from "../public/logos/nodejs.svg";
import Image from "next/image";
const skillCategories = [
  {
    id: "languages",
    name: "Languages",
    skills: [
      { name: "C", svg: cLogo, color: "bg-gray-800" },
      { name: "C++", svg: cppLogo, color: "bg-blue-500" },
      { name: "Java", svg: javaLogo, color: "bg-blue-600" },
      { name: "Javascript", icon: icons.javascript, color: "bg-yellow-600" },
      { name: "Python", svg: pythonLogo, color: "bg-red-500" },
      { name: "Rust", svg: rustLogo, color: "bg-red-500" },
      { name: "Typescript", svg: tsLogo, color: "bg-red-500" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      { name: "HTML", icon: icons.html, color: "bg-orange-500" },
      { name: "CSS", icon: icons.css, color: "bg-blue-500" },
      { name: "SASS", icon: icons.sass, color: "bg-pink-500" },
      { name: "Javascript", icon: icons.javascript, color: "bg-yellow-500" },
      { name: "React JS", icon: icons.react, color: "bg-cyan-400" },
      { name: "Next JS", svg: nextLogo, color: "bg-cyan-400" },
      { name: "Vue", svg: vueLogo, color: "bg-cyan-400" },
      { name: "Ejs", svg: ejsLogo, color: "bg-cyan-400" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    skills: [
      { name: "Node JS", svg: nodeLogo, color: "bg-green-600" },
      { name: "Bun", svg: bunLogo, color: "bg-green-600" },
      { name: "ExpressJS", svg: expressLogo, color: "bg-gray-600" },
      { name: "Flask", svg: flaskLogo, color: "bg-blue-600" },
      { name: "Django", svg: djangoLogo, color: "bg-green-800" },
    ],
  },
  {
    id: "database",
    name: "Database",
    skills: [{ name: "MONGODB", icon: icons.mongodb, color: "bg-green-500" }],
  },

  {
    id: "tools",
    name: "Tools",
    skills: [
      { name: "Canva", svg: canvaLogo, color: "bg-purple-500" },
      { name: "Git/Github", svg: gitLogo, color: "bg-blue-800" },
      { name: "Postman", svg: postmanLogo, color: "bg-orange-600" },
      { name: "ChatGPT", svg: gptLogo, color: "bg-orange-600" },
    ],
  },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("languages")

  return (
    <div className=" text-white  px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-8 relative">
          {/* Left side - Skills label */}
          <div className="md:w-16 hidden md:flex md:flex-col items-center justify-center">
            <div className="rotate-0 md:-rotate-90 font-bold text-2xl tracking-widest flex items-center">
              <span className="transition-all text-[#e63946]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className=""
                  >
                    {activeCategory}
                  </motion.div>
                </AnimatePresence>
              </span>
              <div className="hidden md:block h-1 w-12 bg-black dark:bg-white ml-4"></div>
            </div>
          </div>

          {/* Middle - Skills grid */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
              >
                {skillCategories
                  .find((category) => category.id === activeCategory)
                  ?.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col items-center text-black bg-white border shadow-md dark:text-white dark:bg-[#2d2d2d] rounded-lg p-6 dark:hover:bg-[#6c6c6c] transition-colors"
                    >
                      {skill.icon && <div className="mb-4">{skill.icon}</div>}

                      {skill.svg && (
                        <div className="mb-4">
                          <Image
                            className="h-16 w-16"
                            src={skill.svg}
                            alt={skill.name}
                          ></Image>
                        </div>
                      )}
                      <span className="text-center font-medium">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side - Category buttons */}
          <div className="md:w-16 flex flex-row md:flex-col items-center justify-center gap-4">
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeCategory === category.id
                    ? "bg-[#e63946] text-black"
                    : "bg-[#2d2d2d] text-gray-300 hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={category.name}
              >
                {category.id.charAt(0).toUpperCase()}
              </motion.button>
            ))}
          </div>
          <div className="md:w-16 flex md:hidden md:flex-col items-center justify-center">
            <div className="rotate-0 md:-rotate-90 font-bold text-2xl tracking-widest flex items-center">
              <span className="transition-all text-[#e63946]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="underline"
                  >
                    {activeCategory}
                  </motion.div>
                </AnimatePresence>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
