
import Image from "next/image";
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold">Devansh Mishra</h1>
        <p className="text-lg text-gray-400">Full-Stack Web Developer</p>
      </section>

      {/* Projects Section */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Pathfinder App</h3>
            <p className="text-gray-400">Engineered an algorithm visualization tool for real-time pathfinding, enhancing computer science education.</p>
            <p className="text-gray-400">Utilized Dijkstra’s algorithms* to demonstrate shortest-path solutions dynamically.</p>
            <p className="text-gray-400">Currently used by 15+ instructors in academic settings to enhance teaching methodologies.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Password Manager App</h3>
            <p className="text-gray-400">Created a secure and efficient password management system with encrypted storage and authentication.</p>
            <p className="text-gray-400">Designed a responsive and user-friendly UI, ensuring seamless functionality across devices.</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-gray-400 mt-2"><span className="text-white">Front-End:</span> HTML, Tailwind CSS, SCSS, Javascript, React.js, Next.js, Three.js</p>
        <p className="text-gray-400 mt-2"><span className="text-white">Back-End:</span> Node.js, Express.js, MongoDB, REST APIs, PostgreSQL</p>
        <p className="text-gray-400 mt-2"><span className="text-white">Authentication & Security:</span> JWT, OAuth, NextAuth</p>
        <p className="text-gray-400 mt-2"><span className="text-white">Version Control & Deployment:</span> Git, GitHub</p>
        <p className="text-gray-400 mt-2"><span className="text-white">Other:</span> WebSockets, Algorithm Optimization, Performance Tuning, Data Structures and Algorithms</p>
      </section>

      {/* Contact Section */}
      <section className="py-8 text-center">
        <h2 className="text-2xl font-semibold">Contact (+91 9219013366)</h2>
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com/DevanshMishra123" className="text-gray-400 hover:text-white"><FaGithub size={24} /></a>
          <a href="https://www.linkedin.com/in/devansh-mishra-4a6a17244/" className="text-gray-400 hover:text-white"><FaLinkedin size={24} /></a>
          <a href="mailto:mishra24devansh@gmail.com" className="text-gray-400 hover:text-white"><FaEnvelope size={24} /></a>
        </div>
      </section>
    </div>
  );
}
