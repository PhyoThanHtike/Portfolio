import { motion } from "framer-motion";

export const DataScienceCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side (Text) */}
        <div className="md:w-1/2">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>

          {/* Metrics */}
          {project.metrics == "-" ? (
            <></>
          ) : (
            <div className="bg-gray-700 rounded-lg p-3 mb-4">
              <p className="text-indigo-400 font-mono">{project.metrics}</p>
            </div>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-900 text-sm rounded-md text-indigo-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 flex items-center gap-1"
            >
              <span>Source Code</span>
            </a>
          </motion.button>
        </div>

        {/* Right Side (Visualization) */}
        <div className="md:w-1/2 bg-gray-900 rounded-lg p-4 flex items-center justify-center">
          {/* Placeholder for charts (replace with actual Plotly/Matplotlib image) */}
          {/* <div className="text-center text-gray-400">
            <p>📊 Model Performance</p>
            <p className="text-sm mt-2">(Confusion Matrix / ROC Curve)</p>
          </div> */}
          <img
            src={project.img || "/fallback.jpg"}
            alt="Project Poster"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};
