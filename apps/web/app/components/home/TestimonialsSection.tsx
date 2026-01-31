"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "SagaCoders helped me land my dream internship at a top tech company. The application process was seamless and the support was incredible.",
    author: "Sarah M.",
    role: "Computer Science Student",
    avatar: "SM",
  },
  {
    quote:
      "As a company, we've found exceptional talent through this platform. The quality of candidates and the streamlined process saves us valuable time.",
    author: "Ahmed K.",
    role: "HR Manager, TechCorp",
    avatar: "AK",
  },
  {
    quote:
      "The platform made it easy to showcase my skills and connect with companies that align with my career goals. Highly recommended!",
    author: "Youssef B.",
    role: "Engineering Student",
    avatar: "YB",
  },
];

export default function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-royalStart bg-royalStart/10 rounded-full border border-royalStart/20">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            What People Are{" "}
            <span className="bg-gradient-to-r from-royalStart to-royalEnd bg-clip-text text-transparent">
              Saying
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Hear from students and companies who have found success through our
            platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-royalStart/30 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-royalStart/30 mb-4" />
              <p className="text-slate-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-royalStart to-royalEnd rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
