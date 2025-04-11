import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
};

type TestimonialCardProps = {
  testimonial: Testimonial;
  isActive: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Frontend Developer",
    company: "TechStack Inc.",
    image: "/api/placeholder/64/64",
    content:
      "This tool has been a game-changer for my work. I used to spend hours trying to understand React documentation, but now I get clear, concise explanations with practical code examples instantly.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Full Stack Engineer",
    company: "DevFlow",
    image: "/api/placeholder/64/64",
    content:
      "As someone who mentors junior developers, this AI documentation simplifier has become my secret weapon. Complex technical concepts are broken down beautifully with relevant code examples.",
  },
  {
    id: 3,
    name: "Miguel Santana",
    role: "CTO",
    company: "CodeNova",
    image: "/api/placeholder/64/64",
    content:
      "We've integrated this tool into our onboarding process. New hires can now quickly get up to speed with our tech stack without getting lost in dense documentation.",
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "React Developer",
    company: "Interfaced",
    image: "/api/placeholder/64/64",
    content:
      "I can't believe how much time this saves me. The AI explanations are spot-on and the code examples actually work in real-world scenarios, not just simplified demos.",
  },
];

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isActive }) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg p-6 mx-4 my-2 flex flex-col h-full ${isActive ? 'border-2 border-blue-500' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={`${testimonial.name} profile`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-bold text-lg">{testimonial.name}</h3>
          <p className=" text-sm">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
      <p className=" italic flex-grow">{testimonial.content}</p>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300  mb-4">
            What Our Users Say
          </h2>

          <p className=" max-w-2xl mx-auto">
            Developers and teams are simplifying technical documentation and accelerating their learning with our AI-powered tool.
          </p>
        </motion.div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={testimonial.id === activeIndex + 1}
            />
          ))}
        </div>

        <div className="md:hidden">
          <TestimonialCard testimonial={testimonials[activeIndex]} isActive={true} />
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 mx-1 rounded-full ${index === activeIndex ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
