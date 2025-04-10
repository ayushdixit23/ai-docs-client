// WhyChooseUs.jsx
import { motion } from 'framer-motion';
import { BookOpen, Zap, Lightbulb, Compass, Code, TrendingUp } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <Zap className="w-12 h-12 text-yellow-400" />,
      title: "Learn Faster",
      description: "Skip the hours of trying to understand dense documentation. Get straight to what matters in a fraction of the time."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-green-400" />,
      title: "Simplified Explanations",
      description: "Complex technical concepts are transformed into clear, jargon-free language that makes sense to beginners and experts alike."
    },
    {
      icon: <Code className="w-12 h-12 text-blue-400" />,
      title: "Practical Code Examples",
      description: "Learn by doing with relevant code examples that illustrate how to implement what you're learning in real projects."
    },
    {
      icon: <Compass className="w-12 h-12 text-purple-400" />,
      title: "Focus on What Matters",
      description: "Our AI identifies the most important concepts so you don't waste time on rarely-used features or edge cases."
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-pink-400" />,
      title: "Keep Improving",
      description: "Break through documentation roadblocks that have been holding you back from mastering new frameworks and libraries."
    },
    {
        icon: <TrendingUp className="w-12 h-12 text-red-400" />,
        title: "Stay Ahead of the Curve",
        description: "Keep up with evolving technologies and frameworks with up-to-date insights and best practices delivered in real time."
      }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-20 left-40 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300 mb-4">
            Why Choose Our Solution
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Stop struggling with complex documentation and start building with confidence
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 }
              }}
              className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-gray-700 h-full"
            >
              <div className="flex justify-center mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-white">{benefit.title}</h3>
              <p className="text-gray-300 text-center">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}