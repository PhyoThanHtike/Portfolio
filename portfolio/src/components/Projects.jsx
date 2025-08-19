import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { DataScienceCard } from "./DataScienceCard";
import { useState } from "react";
import ChestXRay from "../assets/ChestXRay.png";
import Sales from "../assets/Sales.png";
import Marketing from "../assets/Marketing.png";
import HR from "../assets/HR.png";
import Git from "../assets/Git.png";
import RAG from "../assets/RAG.png";

const webProjects = [
  {
    id: 1,
    title: "AI-Powered Real-Time Quiz App",
    description:
      "Real-Time Quiz App with Creating/Joining Quiz Rooms functionalities and AI generated quizzes",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Typescript",
      "Tailwind CSS",
      "FastApi",
      "LangChain",
      "Express.js",
    ],
    video:
      "https://res.cloudinary.com/dka5cmrlx/video/upload/v1755261660/TrimmedQuiz_fwh4t7.mp4",
    url: "https://github.com/PhyoThanHtike/RealTimeQuiz",
  },
  {
    id: 2,
    title: "Doi Tung E-Learning Platform",
    description: "An E-Learning app for a corporate training platform ",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MySQL",
      "Express.js",
    ],
    video:
      "https://res.cloudinary.com/dka5cmrlx/video/upload/v1755330475/TrimmedDoiTung_vnyw1u.mp4",
    url: "https://github.com/Nayyelin-14/DoiTung",
  },
  {
    id: 3,
    title: "Agentic AI Comarade",
    description:
      "Personal AI comarade with sending notifications/emails, writing codes and searching web functionalities",
    technologies: ["Python", "LangGraph", "Gradio"],
    video:
      "https://res.cloudinary.com/dka5cmrlx/video/upload/v1755356985/TrimmedAgent_s86lts.mp4",
    url: "#",
  },
  {
    id: 4,
    title: "Real-Time Chat App",
    description: "Chat app with Real-Time conversation",
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Socket.io",
    ],
    video:
      "https://res.cloudinary.com/dka5cmrlx/video/upload/v1755367717/Screen_Recording_2025-08-17_at_12.15.55_AM_trzybw.mp4",
    url: "https://github.com/PhyoThanHtike/ChatApp",
  },
  {
    id: 5,
    title: "MFU Sport Complex Booking App",
    description: "MFU booking app for various sports around the campus",
    technologies: ["React", "Tailwind CSS", "Node.js", "Express.js"],
    video:
      "https://res.cloudinary.com/dka5cmrlx/video/upload/v1755368239/Screen_Recording_2025-08-17_at_1.01.16_AM_q3hqtr.mp4",
    url: "https://github.com/Ethan-13/MiniProject",
  },
];

const dataScienceProjects = [
  {
    id: 1,
    title: "Transfer Learning with ResNet50 on Chest X-rays",
    description:
      "A deep learning model to classify chest X-rays between Normal, Covid19, Viral Pneumonia and Bacterial Pneumonia",
    technologies: [
      "Python",
      "TensorFlow",
      "ResNet50",
      "Scikit-learn",
      "Pandas",
      "Matplotlib",
      "Seaborn",
    ],
    metrics: "Accuracy: 70%",
    github: "https://colab.research.google.com/drive/1a0rf1tuOzgr97H_fuu1WJ2XYk0vkh7FS?usp=sharing",
    img: ChestXRay
  },
  {
    id: 2,
    title: "Sales Department",
    description: "Time Series Analysis and Future Sales prediction for each stores using Prophet",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Tensorflow",
      "Prophet"
    ],
    metrics: "-",
    github:
      "https://colab.research.google.com/drive/1R_smKEfMT0wnbgpvuVLhBmhoQZf0bsxN?usp=sharing",
    img: Sales
    // kaggle: "https://kaggle.com/yourusername/fraud-model",
  },
  {
    id: 3,
    title: "Marketing Department",
    description: "Learn Customers behaviors and types by performing Clustering & PCA",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Tensorflow",
    ],
    metrics: "-",
    github:
      "https://github.com/PhyoThanHtike/Marketing",
    img: Marketing
    // kaggle: "https://kaggle.com/yourusername/fraud-model",
  },
  {
    id: 4,
    title: "HR Department",
    description: "ML/DL model to predict who's likely to quit the job",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Tensorflow",
    ],
    metrics: "Accuracy: 88%",
    github:
      "https://github.com/PhyoThanHtike/HR_department/blob/main/HR_department.ipynb",
    img: HR
    // kaggle: "https://kaggle.com/yourusername/fraud-model",
  },
  {
    id: 5,
    title: "Git Analyzer",
    description: "LLM powered git analyzer analyzes github repositories's content.",
    technologies: [
      "Python",
      "LangChain",
      "Gemini",
      "ChromaDB",
      "Gradio"
    ],
    metrics: "-",
    github:
      "https://github.com/PhyoThanHtike/LangChainProjects",
    img: Git
  },
  {
    id: 6,
    title: "RAG",
    description: "LLM powered simple RAG app which can generate answers according to the uploaded file",
    technologies: [
      "Python",
      "LangChain",
      "Gemini",
      "ChromaDB",
      "Streamlit"
    ],
    metrics: "-",
    github:
      "https://github.com/PhyoThanHtike/LangChainProjects",
    img: RAG
  }
  // Add more DS projects...
];

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("web"); // "web" or "data-science"

  // Floating shapes for background
  const floatingShapes = [
    { id: 1, top: "10%", left: "5%", size: "w-15 h-15", color: "bg-indigo-500", rotate: 45 },
    { id: 2, top: "25%", right: "10%", size: "w-12 h-12", color: "bg-purple-600", rotate: 90 },
    { id: 3, bottom: "15%", left: "8%", size: "w-10 h-10", color: "bg-pink-500", rotate: 0 },
    { id: 4, top: "60%", right: "5%", size: "w-18 h-18", color: "bg-blue-400", rotate: 30 },
  ];

  return (
    <section id="projects" className="py-20 bg-primary relative overflow-hidden">
      {/* Animated background elements */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            y: [0, -15, 0],
            rotate: shape.rotate + 360,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-lg blur-sm opacity-30 ${shape.size} ${shape.color}`}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
        />
      ))}

      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
            animate={{
              opacity: [0, 0.4, 0],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute w-4 h-4 bg-gray-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-4">My Projects</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-indigo-600 mx-auto origin-left"
          />
        </motion.div>

        {/* Tabs with enhanced animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex border border-indigo-600 rounded-lg p-1 bg-gray-800 backdrop-blur-sm bg-opacity-60">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("web")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "web"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              Web Applications
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("data-science")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "data-science"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              Data Science/AI
            </motion.button>
          </div>
        </motion.div>

        {/* Projects Grid with staggered animations */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="space-y-24"
        >
          {activeTab === "web"
            ? webProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            : dataScienceProjects.map((project, index) => (
                <DataScienceCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
        </motion.div>
      </div>
    </section>
  );
};