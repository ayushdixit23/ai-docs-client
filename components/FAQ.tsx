import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { PlusIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"

const items = [
  {
    id: "1",
    title: "Is this app free to use?",
    content:
      "Yes, the app is currently free to use while in public beta. We're focused on gathering feedback and improving the product. In the future, premium features or usage limits may be introduced.",
  },
  {
    id: "2",
    title: "Why use this instead of ChatGPT?",
    content:
      "Unlike ChatGPT, which requires users to paste long documentation or prompt it manually, our app allows you to simply paste a URL. It automatically scrapes, summarizes, and prepares the content for follow-up questions—making the process seamless and focused on technical documentation.",
  },
  {
    id: "3",
    title: "Can I ask general questions not related to documents?",
    content:
      "Absolutely. You can switch to 'General Questions' mode from the dropdown and ask anything without needing to submit a URL or document.",
  },
 {
  id: "4",
  title: "Do I need an account to use it?",
  content:
    "Yes, you need to log in to use the app. This helps us provide personalized features such as saving your previous interactions and managing document history securely.",
},
  {
    id: "5",
    title: "What kind of documents does it support?",
    content:
      "You can submit links to documentation pages, technical blogs, or product manuals. As long as the URL contains readable HTML content, the AI will try to simplify and summarize it for you.",
  },
  {
    id: "6",
    title: "What AI model powers this app?",
    content:
      "We use models from Google’s Gemini family to generate embeddings and simplify content. Our system also uses vector search to enable smart follow-up queries on previously scraped documents.",
  },
];

export default function FAQ() {
  return (
    <div className="space-y-4 max-w-3xl pt-6 pb-16 px-4 text-white mx-auto">
          <div
    
          className="text-center mb-6 sm:mb-12"
        >
          <h2 className="sm:text-4xl text-3xl py-3 md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300  mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white sm:text-base text-sm">
            Everything you need to know about our AI documentation simplifier
          </p>
        </div>

      <Accordion type="single" collapsible className="w-full" >
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="focus-visible:border-ring text-white/90 focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                {item.title}
                <PlusIcon
                  size={16}
                  className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="text-white/80 pb-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
