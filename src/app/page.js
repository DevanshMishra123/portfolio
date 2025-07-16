"use client"
import Image from "next/image";
import React, { useEffect, useRef, useState, useMemo, use } from "react";
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
import "./globals.css"
import Fox from "./components/Fox"
import { useAlert } from "./useAlert";
import Alert from "./components/Alert";

const TriangularSphere = dynamic(() => import('./components/TriangularSphere'), {
  ssr: false, 
});

const AnimatedLaptop = dynamic(() => import ('./components/AnimatedLaptop'), {
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

const workBoxVariant = {
  hidden: { x: 10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      x: {
        duration: 1,
        ease: "easeOut",
      },
      opacity: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  },
}

const nameArr = ['D','e','v','a','n','s','h',' ','M','i','s','h','r','a'];
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
  const [currentAnimation, setCurrentAnimation] = useState('walk')
  const { alert, showAlert, hideAlert } = useAlert()

  const sectionRefs = {
    head: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
    experience: useRef(null),
  };

  const [inViewStates, setInViewStates] = useState({
    head: false,
    about: false,
    skills: false,
    projects: false,
    contact: false,
    experience: false,
  });

  const [name, setName] = useState("");
  useEffect(() => {
    let i = 0
    setInterval(() => {
      if(i===nameArr.length){
        i=0;
        setName("");
      }
      else{
        setName(prev => prev + nameArr[i])
        i++; 
      }
    },200)
  },[])

  const { ref: headRef, inView: headInView } = useInView({ threshold: 0.4 });
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.4 });
  const { ref: skillsRef, inView: skillsInView } = useInView({ threshold: 0.4 });
  const { ref: projectsRef, inView: projectsInView } = useInView({ threshold: 0.4 });
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.4 });
  const { ref: experienceRef, inView: experienceInView } = useInView({ threshold: 0.4 });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    setCurrentAnimation('hit');

    const res = await fetch('/api/sendMail', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (data.success) {
      setStatus('Message sent!');
      showAlert({show: true, text: "Message sent successfully", type: "success"});  
      setTimeout(() => {
        hideAlert()
        setCurrentAnimation('idle')
        setFormData({ name: '', email: '', message: '' });
      },[2000])   
    } else {
      setStatus('Failed to send.');
      setCurrentAnimation('idle');
      showAlert({show: true, text: "I didn't receive your message", type: "danger"});  
    }
  };

  const handleBlur = () => setCurrentAnimation('walk')
  const handleFocus = () => setCurrentAnimation('idle')

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);

  useEffect(() => {
    setInViewStates((prev) => ({
      ...prev,
      head: headInView,
      about: aboutInView,
      skills: skillsInView,
      projects: projectsInView,
      contact: contactInView,
    }));
  }, [headInView, aboutInView, skillsInView, projectsInView, contactInView]);

  const scrollToSection = (key) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Hero Section */}
      <div className="flex justify-between">
        <ul className="flex gap-4">
          <button onClick={() => scrollToSection('about')}>About</button>
          <button onClick={() => scrollToSection('skills')}>Skills</button>
          <button onClick={() => scrollToSection('experience')}>Experience</button>
          <button onClick={() => scrollToSection('projects')}>Projects</button>
          <button onClick={() => scrollToSection('contact')}>Contact</button>
        </ul>
      </div>

      {alert.show&&<Alert {...alert} />}
      
      <section 
        id="head" 
        className="py-16"
        ref={(el) => {
          sectionRefs.head.current = el;
          headRef(el);
        }}
      >
        <motion.h1
          className="text-6xl font-bold py-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hello, I&apos;m <span className="font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(191,0,255,0.7)]">{name}</span><span className="bg-white w-[4px] h-14 inline-block animate-blink"></span>
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
          <motion.div className="absolute z-10 inset-0 flex items-center justify-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5, ease: "easeInOut" }}>   
            {headInView&&<AnimatedLaptop />}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={(el) => {
          sectionRefs.about.current = el;
          aboutRef(el);
        }}
      >
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
      <section 
        id="skills" 
        className="my-10"
        ref={(el) => {
          sectionRefs.skills.current = el;
          skillsRef(el);
        }}
      >
        <motion.h1 className="text-6xl text-center font-bold py-4 my-4">
          Technologies
        </motion.h1>
        <motion.div className="my-6 h-96 flex flex-col justify-center items-center">
          {skillsInView&&<motion.div className="flex flex-wrap justify-center px-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5, ease: "easeInOut" }}>
            {technologies.map((technology,i) => (
              <motion.div className="w-40 h-40" key={i}>
                <TriangularSphere technology={technology}/>
              </motion.div>         
            ))}
          </motion.div>}
        </motion.div>      
      </section>

      {/* Work Experience */}
      <section id="experience" ref={(el)=>{
        sectionRefs.experience.current = el;
        experienceRef(el);
      }}
      >
        <motion.div className="flex h-[100vh] gap-8 px-44 relative">
          <motion.div 
            className="w-6 h-6 absolute rounded-full bg-violet-500 top-[40vh] left-42"></motion.div>
          <motion.div className="bg-white w-[6px]">
          </motion.div>
          <motion.div 
            className="bg-violet-950 flex flex-col justify-end gap-8 min-h-[60vh] w-[50vw] self-end p-12 border-4 border-violet-700"
            initial="hidden"
            animate={experienceInView ? "visible" : "hidden"}
            variants={workBoxVariant}
          >
            <div className="flex justify-between">
              <div>Web Development Intern at Digital Heroes - Remote</div>
              <div>April 2025 - June 2025</div>
            </div>
            <ul className="list-disc pl-5 pt-4">
              <li>Built and customized Shopify stores for clients across diverse industries, tailoring features to specific business needs.</li>
              <li>Integrated third-party apps and configured Shopify themes to enhance store functionality and user experience.</li>
              <li>Gained hands-on experience with Liquid templating language, collaborating closely with designers to implement responsive and user-friendly UI/UX.</li>
              <li>Participated in requirement gathering sessions with clients and contributed to successful store deployment and post-launch support.</li>
            </ul>
            <hr className="bg-white"/>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="py-8"
        ref={(el) => {
          sectionRefs.projects.current = el;
          projectsRef(el);
        }}
      >
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
      <section 
        id="contact" 
        className="py-8 text-center"
        ref={(el) => {
          sectionRefs.contact.current = el;
          contactRef(el);
        }}
      >
        <motion.div className="text-center items-center h-screen flex pl-10 perspective-[1000px]">
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
          <div className="bg-violet-950 rounded-2xl px-8 py-10 flex-1 w-[50vw] shadow-xl max-w-xl mx-auto text-white transform-style: preserve-3d transition duration-[3s] ease-linear">
            <h1 className="text-6xl font-bold pt-6 pb-8 transform-style: preserve-3d">Get In Contact</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full transform-style: preserve-3d">
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
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
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
            <p className="transform-style: preserve-3d">{status}</p>
          </div>
          <motion.div className="flex-1 h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5, ease: "easeInOut" }}>
            {/* {contactInView&&<EarthModel />} */}
            <Canvas 
              camera = {{
                position : [0, 0, 5],
                fov: 75,     
                near: 0.1,
                far: 1000     
              }} 
            >
              <directionalLight intensity={2.5} position={[0, 0, 1]} />
              <ambientLight intensity={0.5} />
              <Suspense fallback={null}>
                <Fox   
                  position={[0.5, 0.35, 0]} 
                  rotation={[12.6, -0.6, 0]}            
                  scale = {[0.6, 0.6, 0.6]}
                  currentAnimation={currentAnimation}
                />  
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={true} enableRotate={true} />
            </Canvas>
          </motion.div>
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
