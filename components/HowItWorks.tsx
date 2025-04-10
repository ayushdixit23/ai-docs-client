import { motion } from 'framer-motion';
import { Link, FileSearch, Brain, Code } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Link className="w-16 h-16 text-blue-400" />,
      title: "Share Documentation URL",
      description: "Simply paste the URL of any technical documentation (like React, Vue, or Python) you're struggling to understand."
    },
    {
      icon: <FileSearch className="w-16 h-16 text-purple-400" />,
      title: "Smart Content Extraction",
      description: "Our AI scrapes the documentation, extracting the core concepts and important details without the overwhelming jargon."
    },
    {
      icon: <Brain className="w-16 h-16 text-pink-400" />,
      title: "AI Simplification",
      description: "Complex technical concepts are broken down into simple, digestible explanations that anyone can understand."
    },
    {
      icon: <Code className="w-16 h-16 text-teal-400" />,
      title: "Practical Code Examples",
      description: "Learn by doing with custom code examples that demonstrate concepts in action, making it easier to apply what you've learned."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 mb-4">
            How It Works
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Turn overwhelming documentation into clear, actionable knowledge with our AI-powered learning assistant
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 }
              }}
              className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-gray-700 relative group"
            >
              <div className="flex justify-center mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-300 text-center">
                {step.description}
              </p>
              
             
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}