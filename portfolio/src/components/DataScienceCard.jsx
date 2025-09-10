import { motion } from "framer-motion";

export const DataScienceCard = ({ project, index }) => {
  // Parent container reveal
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        when: "beforeChildren",
        staggerChildren: 0.12,
      },
    },
  };

  // Child items (text, metrics, badges)
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{
        y: -5,
        boxShadow: "0px 8px 25px rgba(0,0,0,0.25)",
      }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side (Text) */}
        <div className="md:w-1/2">
          <motion.h3
            variants={itemVariants}
            className="text-xl font-bold text-white mb-2"
          >
            {project.title}
          </motion.h3>

          <motion.p variants={itemVariants} className="text-gray-300 mb-4">
            {project.description}
          </motion.p>

          {/* Metrics */}
          {project.metrics !== "-" && (
            <motion.div
              variants={itemVariants}
              className="bg-gray-700 rounded-lg p-3 mb-4 transition-colors duration-300 hover:bg-gray-600"
            >
              <p className="text-indigo-400 font-mono">{project.metrics}</p>
            </motion.div>
          )}

          {/* Technologies */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 mb-4"
          >
            {project.technologies.map((tech) => (
              <motion.span
                key={tech}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="px-2 py-1 bg-gray-900 text-sm rounded-md text-indigo-300 transition-colors duration-300 hover:bg-gray-800"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Links */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ x: 3 }}
            className="inline-block text-indigo-400 hover:text-indigo-300 transition-colors duration-300 relative"
          >
            <span>Source Code →</span>
            <motion.div
              layoutId="underline"
              className="absolute left-0 -bottom-0.5 h-0.5 bg-indigo-400 w-0"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>

        {/* Right Side (Visualization) */}
        <motion.div
          variants={itemVariants}
          className="md:w-1/2 bg-gray-900 rounded-lg p-4 flex items-center justify-center overflow-hidden"
        >
          <motion.img
            src={project.img || "/fallback.jpg"}
            alt="Project Poster"
            className="w-full h-full object-cover rounded-lg"
            initial={false} // prevents blank state
            whileHover={{ rotate: 1.5, x: 3 }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
