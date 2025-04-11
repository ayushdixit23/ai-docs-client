import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

type FAQItemProps = {
  faq: FAQ;
  isOpen: boolean;
  toggleOpen: () => void;
};

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How does your AI documentation simplifier work?",
    answer:
      "Our AI documentation simplifier scrapes technical documentation from sources like React.dev, processes the information, and generates simplified explanations with practical code examples. The AI is trained to break down complex concepts into digestible chunks while maintaining technical accuracy.",
  },
  {
    id: 2,
    question: "Which technical documentation sources do you support?",
    answer:
      "We currently support documentation from React, Vue, Angular, Next.js, Node.js, Express, MongoDB, and several other popular frameworks and libraries. We're constantly expanding our coverage based on user requests.",
  },
  {
    id: 3,
    question: "Can I request simplification for specific documentation?",
    answer:
      "Yes! If you need simplified explanations for specific technical documentation that we don't currently support, you can submit a request through our dashboard. We prioritize requests based on demand.",
  },
  {
    id: 4,
    question: "How accurate are the code examples provided?",
    answer:
      "Our AI generates code examples that follow best practices and are tested to work in real-world scenarios. Each example is validated against the latest version of the technology. However, we recommend reviewing any code before using it in production.",
  },
  {
    id: 5,
    question: "Do you offer a free plan?",
    answer:
      "Yes, we offer a free tier that allows you to simplify up to 50 documentation pages per month. For more extensive usage, we have affordable paid plans with additional features like saved explanations, custom topics, and team sharing.",
  },
  {
    id: 6,
    question: "Can I integrate this with my team's learning resources?",
    answer:
      "Absolutely! Our Enterprise plan includes API access and custom integration options. Many teams use our tool as part of their onboarding process or integrate it with their internal knowledge bases.",
  },
];

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium  focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="text-lg">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-6 flex-shrink-0"
        >
          <svg
            className="h-6 w-6 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 ">{faq.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 text-white/80">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300  mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white">
            Everything you need to know about our AI documentation simplifier
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=" rounded-lg p-6"
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              toggleOpen={() => toggleFaq(faq.id)}
            />
          ))}
        </motion.div>


      </div>
    </section>
  );
};

export default FAQ;
