import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaInstagram, FaCode, FaServer, FaRobot, FaDatabase } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiTensorflow,
  SiLangchain,
  SiTypescript,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { BiLogoSpringBoot } from "react-icons/bi";
import profile from "../assets/profile.jpg";

export const Hero = ({ scrollToSection }) => {
  // Skills data with proficiency levels (0-100)
  const skills = [
    { name: "HTML", level: 90, icon: <SiHtml5 className="text-orange-500" /> },
    { name: "CSS", level: 85, icon: <SiCss3 className="text-blue-500" /> },
    {
      name: "JavaScript",
      level: 80,
      icon: <SiJavascript className="text-yellow-400" />,
    },
    {
      name:"TypeScript",
      level: 80,
      icon: <SiTypescript className="text-blue-500"/>
    },
    { name: "Java", level: 75, icon: <DiJava className="text-red-500" /> },
    { name: "Python", level: 70, icon: <SiPython className="text-blue-400" /> },
    { name: "React", level: 85, icon: <SiReact className="text-cyan-400" /> },
    {
      name: "Node.js",
      level: 80,
      icon: <SiNodedotjs className="text-green-500" />,
    },
    {
      name: "Spring Boot",
      level: 70,
      icon: <BiLogoSpringBoot className="text-green-600" />,
    },
    {
      name: "Tailwind CSS",
      level: 90,
      icon: <SiTailwindcss className="text-cyan-300" />,
    },
    {
      name: "TensorFlow",
      level: 65,
      icon: <SiTensorflow className="text-orange-600" />,
    },
    {
      name: "LangChain",
      level: 65,
      icon: <SiLangchain className="text-green-700"/>
    }
  ];

  const interests = [
    { name: "Frontend Development", icon: <FaCode className="text-blue-400" /> },
    { name: "Backend Systems", icon: <FaServer className="text-purple-400" /> },
    { name: "AI/ML", icon: <FaRobot className="text-green-400" /> },
    { name: "Data Science", icon: <FaDatabase className="text-red-400" /> }
  ];

  return (
    <section id="about" className="flex items-center justify-center py-10 md:py-0 xl:py-20 bg-primary relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 overflow-hidden"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 1000 }}
            animate={{ y: 1000, x: Math.random() * 1000 }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute text-gray-500 opacity-50"
            style={{
              fontSize: `${10 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`
            }}
          >
            {['</>', '{ }', ';', '=>', '()', '[]'].sort(() => 0.5 - Math.random())[0]}
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="md:w-1/3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 3
              }}
              className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-indigo-500 shadow-xl"
            >
              <motion.img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="absolute inset-0 bg-indigo-500 opacity-0 hover:opacity-20 transition-opacity duration-300"
                whileHover={{ opacity: 0.2 }}
              />
            </motion.div>
          </div>
          
          <div className="md:w-2/3 text-center md:text-left">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-100 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Hi, I'm <span className="text-indigo-400">Phyo Than Htike</span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold text-gray-400 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Junior <span className="text-indigo-300">Software Engineer</span> & <span className="text-green-300">AI Enthusiast</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              With a passion for building clean, functional, and user-focused
              applications. I specialize in full-stack development with expertise in 
              <span className="text-indigo-400"> React</span>, 
              <span className="text-indigo-400"> Node.js</span>, and 
              <span className="text-indigo-400"> Spring Boot</span>. Currently exploring the fascinating world of 
              <span className="text-green-300"> ML/AI and LLMs</span>, and working with data to create intelligent solutions.
            </motion.p>

            <motion.div 
              className="flex justify-center md:justify-start gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/PhyoThanHtike"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition shadow-lg"
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.facebook.com/phyo.than.htike.34368"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 transition shadow-lg"
              >
                <FaFacebook size={20}/>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/p_thhhhh/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full hover:opacity-90 transition shadow-lg"
              >
                <FaInstagram size={20}/>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="btn-primary flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
              >
                <FaEnvelope /> Contact Me
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Interests Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <h3 className="text-xl text-center font-semibold text-gray-100 mb-6 pb-2 relative">
            <span className="relative z-10 px-4 bg-primary">
              My Interests & Focus Areas
            </span>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-0"></div>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-400 transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2 }}
                  >
                    {interest.icon}
                  </motion.div>
                  <span className="font-medium text-gray-100">
                    {interest.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <h3 className="text-xl text-center font-semibold text-gray-100 mb-6 pb-2 relative">
            <span className="relative z-10 px-4 bg-primary">
              Technical Skills
            </span>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-0"></div>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.05, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="skill-card bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700 hover:border-indigo-400 transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="text-3xl mb-2"
                    whileHover={{ scale: 1.2 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <span className="font-medium text-gray-100 mb-2">
                    {skill.name}
                  </span>
                  <div className="w-full">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-400">Proficiency</span>
                      <span className="text-gray-300">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 1 + index * 0.05 }}
                        className={`h-2 rounded-full ${
                          skill.level > 80
                            ? "bg-gradient-to-r from-green-400 to-teal-400"
                            : skill.level > 60
                            ? "bg-gradient-to-r from-blue-400 to-indigo-400"
                            : "bg-gradient-to-r from-yellow-400 to-orange-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};