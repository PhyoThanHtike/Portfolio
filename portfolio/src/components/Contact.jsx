import { motion } from 'framer-motion';
import { FaEnvelope, FaFacebook, FaGithub } from 'react-icons/fa';

const contactItems = [
  {
    icon: <FaEnvelope className="text-indigo-400" />,
    label: 'Email',
    value: 'phyothanhtike.ethan@gmail.com',
    link: 'mailto:phyothanhtike.ethan@gmail.com',
  },
  {
    icon: <FaFacebook className="text-indigo-400" />,
    label: 'Facebook',
    value: 'facebook.com/phyo.than.htike',
    link: 'https://www.facebook.com/phyo.than.htike.34368',
  },
  {
    icon: <FaGithub className="text-indigo-400" />,
    label: 'GitHub',
    value: 'github.com/PhyoThanHtike',
    link: 'https://github.com/PhyoThanHtike',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 120,
    },
  }),
};

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Contact Me</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={itemVariants}
              className="flex items-center gap-4 bg-indigo-950 p-4 rounded-xl shadow-md hover:shadow-indigo-700 transition duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="bg-indigo-900 p-3 rounded-full">{item.icon}</div>
              <div>
                <p className="text-gray-400 text-sm">{item.label}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:underline text-lg"
                >
                  {item.value}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


// import { motion } from 'framer-motion';
// import { FaEnvelope, FaFacebook, FaGithub } from 'react-icons/fa';

// export const Contact = () => {
//   return (
//     <section id="contact" className="py-20 bg-primary">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl font-bold text-gray-100 mb-4">Contact Me</h2>
//           <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
//         </motion.div>

//         <div className="flex flex-col md:flex-row gap-12">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="md:w-1/2"
//           >
//             <h3 className="text-xl font-semibold text-gray-100 mb-6">Get in Touch</h3>
//             <p className="text-gray-400 mb-8">
//               Have a project in mind or want to discuss potential opportunities? 
//               Feel free to reach out—I'd love to hear from you!
//             </p>
//             <div className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <div className="bg-indigo-900 p-3 rounded-full">
//                   <FaEnvelope className="text-indigo-400" />
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm">Email</p>
//                   <p className="text-gray-300">phyothanhtike.ethan@gmail.com</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="bg-indigo-900 p-3 rounded-full">
//                   <FaFacebook className="text-indigo-400" />
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm">Facebook</p>
//                   <a 
//                     href="https://www.facebook.com/phyo.than.htike.34368" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="text-indigo-400 hover:underline"
//                   >
//                     facebook.com/phyo.than.htike
//                   </a>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="bg-indigo-900 p-3 rounded-full">
//                   <FaGithub className="text-indigo-400" />
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm">GitHub</p>
//                   <a 
//                     href="https://github.com/PhyoThanHtike" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="text-indigo-400 hover:underline"
//                   >
//                     github.com/PhyoThanHtike
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="md:w-1/2"
//           >
//             <form className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
//                 <input 
//                   type="text" 
//                   id="name" 
//                   name="name" 
//                   className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-300"
//                   placeholder="Your name"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//                 <input 
//                   type="email" 
//                   id="email" 
//                   name="email" 
//                   className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-300"
//                   placeholder="your.email@example.com"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
//                 <textarea 
//                   id="message" 
//                   name="message" 
//                   rows="5" 
//                   className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-300"
//                   placeholder="Your message here..."
//                 ></textarea>
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit" 
//                 className="w-full btn-primary"
//               >
//                 Send Message
//               </motion.button>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };