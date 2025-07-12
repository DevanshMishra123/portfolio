
// import Image from "next/image";
// import React from "react";
// import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
// import Link from "next/link";
// import { ThemeProvider } from "next-themes";
// import { motion } from "framer-motion";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       {/* Hero Section */}
//       <section className="text-center py-16">
//         <h1 className="text-4xl font-bold">Devansh Mishra</h1>
//         <p className="text-lg text-gray-400">Full-Stack Web Developer</p>
//       </section>

//       {/* Projects Section */}
//       <section className="py-8">
//         <h2 className="text-2xl font-semibold">Projects</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h3 className="text-xl font-semibold">Pathfinder App</h3>
//             <p className="text-gray-400">Engineered an algorithm visualization tool for real-time pathfinding, enhancing computer science education.</p>
//             <p className="text-gray-400">Utilized Dijkstra’s algorithms* to demonstrate shortest-path solutions dynamically.</p>
//             <p className="text-gray-400">Currently used by 15+ instructors in academic settings to enhance teaching methodologies.</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h3 className="text-xl font-semibold">Password Manager App</h3>
//             <p className="text-gray-400">Created a secure and efficient password management system with encrypted storage and authentication.</p>
//             <p className="text-gray-400">Designed a responsive and user-friendly UI, ensuring seamless functionality across devices.</p>
//           </div>
//         </div>
//       </section>

//       {/* Skills Section */}
//       <section className="py-8">
//         <h2 className="text-2xl font-semibold">Skills</h2>
//         <p className="text-gray-400 mt-2"><span className="text-white">Front-End:</span> HTML, Tailwind CSS, SCSS, Javascript, React.js, Next.js, Three.js</p>
//         <p className="text-gray-400 mt-2"><span className="text-white">Back-End:</span> Node.js, Express.js, MongoDB, REST APIs, PostgreSQL</p>
//         <p className="text-gray-400 mt-2"><span className="text-white">Authentication & Security:</span> JWT, OAuth, NextAuth</p>
//         <p className="text-gray-400 mt-2"><span className="text-white">Version Control & Deployment:</span> Git, GitHub</p>
//         <p className="text-gray-400 mt-2"><span className="text-white">Other:</span> WebSockets, Algorithm Optimization, Performance Tuning, Data Structures and Algorithms</p>
//       </section>

//       {/* Contact Section */}
//       <section className="py-8 text-center">
//         <h2 className="text-2xl font-semibold">Contact (+91 9219013366)</h2>
//         <div className="flex justify-center gap-6 mt-4">
//           <a href="https://github.com/DevanshMishra123" className="text-gray-400 hover:text-white"><FaGithub size={24} /></a>
//           <a href="https://www.linkedin.com/in/devansh-mishra-4a6a17244/" className="text-gray-400 hover:text-white"><FaLinkedin size={24} /></a>
//           <a href="mailto:mishra24devansh@gmail.com" className="text-gray-400 hover:text-white"><FaEnvelope size={24} /></a>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client"
import Image from "next/image";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { RGBELoader } from 'three-stdlib';
import { meshBounds, OrbitControls, useGLTF, Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import ProfileCard from './components/ProfileCard/ProfileCard';
import Threads from './components/Threads/Threads';
import { Suspense } from 'react';

const TriangularSphere = dynamic(() => import('./components/TriangularSphere'), {
  ssr: false, 
});

const AnimatedLaptop = dynamic(() => import ('./components/AnimatedLaptop'), {
  ssr: false,
})

const EarthModel = dynamic(() => import ('./components/EarthModel'), {
  ssr: false,
})

const NetworkOverlay = dynamic(() => import ('./components/NetworkOverlay'), {
  ssr: false,
})

const boxVariants = {
  hidden: (i) => ({ x: -50 + i*40, opacity: 0 }),
  visible: (i) => ({
    x: -50 + i*40,
    opacity: 1,
    transition: {
      delay: i * 0.2,
      duration: 1,
      ease: "easeInOut",
    },
  }),
};

const skills = [{name: "Web Developer", img: "/web.png"}, {name: "React Developer", img: "/react.png"}, {name: "Backend Developer", img: "/backend.png"}, {name: "MERN Stack Developer", img: "/mern.png"}];
const technologies = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg"
]

export default function Home() {
  const router = useRouter();
  const { ref, inView } = useInView({ threshold: 0.4 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Hero Section */}
      <div className="flex justify-between">
        <ul className="flex gap-4">
          <li>About</li>
          <li>Exerience</li>
          <li>Skills</li>
          <li>Contact</li>
        </ul>
      </div>
      
      <section className="py-16">
        <motion.h1
          className="text-6xl font-bold py-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hello, I&apos;m Devansh
        </motion.h1>
        <motion.p
          className="text-lg text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          I build full web applications — from clean, responsive interfaces to powerful backend systems, connecting design and data seamlessly.
        </motion.p>
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
          <Threads
            amplitude={1}
            distance={0}
            enableMouseInteraction={true}
          />
          <div className="absolute z-10 inset-0 flex items-center justify-center pointer-events-none">
            <AnimatedLaptop />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section>
        <motion.h2 className="pt-6 pb-2 font-bold">
          INTRODUCTION
        </motion.h2>
        <motion.h1 className="text-6xl font-bold py-4">
          Overview
        </motion.h1>
        <motion.p className="pt-2 pb-6 w-[60vw]">
          Hi, I&apos;m Devansh Mishra — a passionate Full-Stack Web Developer with a deep interest in building scalable, interactive, and user-centric applications. I specialize in modern technologies like React.js, Next.js, Node.js, and MongoDB, with strong proficiency across the full stack.<br/>One of my most impactful projects is a real-time collaborative text editor, built using WebSockets for instant synchronization — showcasing my skills in full-duplex communication and performance optimization. I&apos;ve also developed a Password Manager app adopted by 15+ instructors, reinforcing my focus on security and clean architecture.
        </motion.p>
        <div ref={ref} className="mb-8 mt-10 flex gap-6 justify-center items-center">
          {skills.map((skill,i) => (
            <motion.div 
              key={i}
              custom={i}
              initial="hidden"
              animate={hasAnimated ? "visible" : "hidden"}
              variants={boxVariants}
              className="p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-border"
            >
              <motion.div className="w-60 h-[45vh] bg-violet-950 rounded-xl p-8 shadow-lg flex flex-col gap-20 justify-center items-center">
                <Image alt="skill-images" src={skill.img} width={56} height={56} />      
                {skill.name}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="my-10">
        <motion.h1 className="text-6xl text-center font-bold py-4 my-4">
          Technologies
        </motion.h1>
        <motion.div className="flex flex-wrap justify-center px-16 my-6">
          {technologies.map((technology,i) => (
            <motion.div className="w-40 h-40" key={i}>
              <TriangularSphere technology={technology}/>
            </motion.div>         
          ))}
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-8">
        <motion.h1
          className="text-6xl text-center font-bold py-4 my-4"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Projects
        </motion.h1>
        <motion.div className="px-16 flex flex-wrap gap-8 justify-center mt-8">

          <motion.div 
            className="relative p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-border"
            initial={{ rotateX: 0, rotateY: 0 }}
            whileHover={{
              rotateX: 15,
              rotateY: -15,
              transition: { type: "spring", stiffness: 100, damping: 10 },
            }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <motion.div className="relative w-[20vw] h-[68vh] p-4 flex flex-col gap-6 bg-violet-950 rounded-xl overflow-hidden shadow-[0_0_20px_5px_#d8b4fe]">
              <Image alt="git-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" width={28} height={28} className="absolute z-10 top-52 right-4" />
              <Link href='https://github.com/DevanshMishra123/text-editor.git' className="relative w-full h-[60%]">
                <Image alt="text-editor image" src="/text-editor.png" fill className="object-cover rounded-md" />
              </Link>
              <motion.p>
                Real-time collaborative text editor with live multi-user editing, color-coded cursors, Supabase auth, and auto-saving via WebSockets.
              </motion.p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["#React.js", "#Slate.js", "#Supabase", "#WebSockets"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-violet-800 text-white px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-border"
            initial={{ rotateX: 0, rotateY: 0 }}
            whileHover={{
              rotateX: 15,
              rotateY: 15,
              transition: { type: "spring", stiffness: 100, damping: 10 },
            }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <motion.div className="relative w-[20vw] h-[68vh] p-4 flex flex-col gap-6 bg-violet-950 rounded-xl overflow-hidden shadow-[0_0_20px_5px_#d8b4fe]">
              <Image alt="git-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" width={28} height={28} className="absolute z-10 top-52 right-4" />
              <Link href='https://github.com/DevanshMishra123/my_projects.git' className="relative w-full h-[37vh]">
                <Image alt="text-editor image" src="/password-mngr.png" fill className="object-cover rounded-md" />
              </Link>
              <motion.p>
                Built a secure password manager with encrypted data handling and user authentication, delivering a responsive, cross-platform UI to enhance usability and trust
              </motion.p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["#Next.js", "#MongoDb", "#Tailwind", "#NextAuth"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-violet-800 text-white px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-border"
            initial={{ rotateX: 0, rotateY: 0 }}
            whileHover={{
              rotateX: 15,
              rotateY: -15,
              transition: { type: "spring", stiffness: 100, damping: 10 },
            }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <motion.div className="relative w-[20vw] h-[68vh] p-4 flex flex-col gap-6 bg-violet-950 rounded-xl overflow-hidden shadow-[0_0_20px_5px_#d8b4fe]">
              <Image alt="git-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" width={28} height={28} className="absolute z-10 top-52 right-4" />
              <Link href='https://github.com/DevanshMishra123/project_4.git' className="relative w-full h-[37vh]">
                <Image alt="text-editor image" src="/snk-game.png" fill className="object-cover rounded-md" />
              </Link>
              <motion.p>
                Built an interactive Snake game using React with smooth state management, responsive controls, and real-time rendering. Leveraged React Hooks to efficiently manage game logic.
              </motion.p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["#React.js", "Tailwind"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-violet-800 text-white px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-border"
            initial={{ rotateX: 0, rotateY: 0 }}
            whileHover={{
              rotateX: 15,
              rotateY: 15,
              transition: { type: "spring", stiffness: 100, damping: 10 },
            }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <motion.div className="relative w-[20vw] h-[68vh] p-4 flex flex-col gap-6 bg-violet-950 rounded-xl overflow-hidden shadow-[0_0_20px_5px_#d8b4fe]">
              <Image alt="git-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" width={28} height={28} className="absolute z-10 top-52 right-4" />
              <Link href='https://github.com/DevanshMishra123/project_2.git' className="relative w-full h-[37vh]">
                <Image alt="text-editor image" src="/pathviz.png" fill className="object-cover rounded-md" />
              </Link>
              <motion.p>
                Engineered a real-time pathfinding visualizer using Dijkstra&apos;s algorithm to dynamically demonstrate shortest-path logic and improve algorithm comprehension.
              </motion.p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["#React.js", "#Tailwind"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-violet-800 text-white px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </motion.div>
          </motion.div>
        </motion.div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <motion.div
            className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">Pathfinder App</h3>
            <p className="text-gray-400">Engineered an algorithm visualization tool for real-time pathfinding, enhancing computer science education.</p>
            <p className="text-gray-400">Utilized Dijkstra\u2019s algorithms to demonstrate shortest-path solutions dynamically.</p>
            <p className="text-gray-400">Currently used by 15+ instructors in academic settings to enhance teaching methodologies.</p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">Password Manager App</h3>
            <p className="text-gray-400">Created a secure and efficient password management system with encrypted storage and authentication.</p>
            <p className="text-gray-400">Designed a responsive and user-friendly UI, ensuring seamless functionality across devices.</p>
          </motion.div>
        </div> */}
      </section>
      {/* Contact Section */}
      {/* <section className="py-8">
        <motion.h2
          className="text-2xl font-semibold"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Skills
        </motion.h2>
        <motion.p className="text-gray-400 mt-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
          <span className="text-white">Front-End:</span> HTML, Tailwind CSS, SCSS, Javascript, React.js, Next.js, Three.js
        </motion.p>
        <motion.p className="text-gray-400 mt-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.2 }}>
          <span className="text-white">Back-End:</span> Node.js, Express.js, MongoDB, REST APIs, PostgreSQL
        </motion.p>
        <motion.p className="text-gray-400 mt-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.4 }}>
          <span className="text-white">Authentication & Security:</span> JWT, OAuth, NextAuth
        </motion.p>
        <motion.p className="text-gray-400 mt-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.6 }}>
          <span className="text-white">Version Control & Deployment:</span> Git, GitHub
        </motion.p>
        <motion.p className="text-gray-400 mt-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.8 }}>
          <span className="text-white">Other:</span> WebSockets, Algorithm Optimization, Performance Tuning, Data Structures and Algorithms
        </motion.p>
      </section> */}

      {/* Contact Section */}
      <section className="py-8 text-center">
        <motion.div className="text-center items-center h-screen flex">
          {/* <ProfileCard
            name="Devansh Mishra"
            title="Software Engineer"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/profile_pic.jpg"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => console.log('Contact clicked')}
          /> */}
          <div className="bg-violet-950 rounded-2xl px-8 py-10 flex-1 shadow-xl max-w-xl w-full mx-auto text-white">
            <form className="flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-purple-200 text-left">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="What's your name?"
                  required
                  className="bg-violet-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-purple-200 text-left">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="What's your email?"
                  required
                  className="bg-violet-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-purple-200 text-left">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message..."
                  required
                  rows="4"
                  className="bg-violet-700 text-white px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-300"
                />
              </div>

              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded-md font-semibold text-white"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="flex-1 h-full">
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <EarthModel />         {/* Step 1 */}
              {/* <NetworkOverlay />  */}
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </motion.div>
        
        <motion.h2
          className="text-2xl font-semibold"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          Contact (+91 9219013366)
        </motion.h2>
        <div className="flex justify-center gap-6 mt-4">
          <motion.a
            href="https://github.com/DevanshMishra123"
            className="text-gray-400 hover:text-white"
            whileHover={{ scale: 1.2 }}
          >
            <FaGithub size={24} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/devansh-mishra-4a6a17244/"
            className="text-gray-400 hover:text-white"
            whileHover={{ scale: 1.2 }}
          >
            <FaLinkedin size={24} />
          </motion.a>
          <motion.a
            href="mailto:mishra24devansh@gmail.com"
            className="text-gray-400 hover:text-white"
            whileHover={{ scale: 1.2 }}
          >
            <FaEnvelope size={24} />
          </motion.a>
        </div>
      </section>
    </div>
  );
}
