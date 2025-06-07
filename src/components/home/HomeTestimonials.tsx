
import React from 'react';

export function HomeTestimonials() {
  const testimonials = [
    {
      quote: "THIS SYSTEM COMPLETELY TRANSFORMED HOW I APPROACH MY GOALS. NO MORE EXCUSES.",
      author: "BETA USER #001",
      role: "EARLY ADOPTER"
    },
    {
      quote: "FINALLY, A HABIT TRACKER THAT ACTUALLY WORKS. THE DISCIPLINE IS UNMATCHED.",
      author: "BETA USER #002", 
      role: "TRANSFORMATION PIONEER"
    },
    {
      quote: "WENT FROM CHAOS TO COMPLETE CONTROL. THIS IS THE REAL DEAL.",
      author: "BETA USER #003",
      role: "HABIT ENGINEER"
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="neo-text-huge text-black mb-8">
            WHAT EARLY USERS SAY
          </h2>
        </div>
        
        <div className="neo-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="neo-card">
              <div className="text-center">
                <blockquote className="neo-text-medium text-black mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="neo-card-charcoal inline-block">
                  <div>
                    <div className="neo-text-medium text-white">{testimonial.author}</div>
                    <div className="text-sm font-bold text-white uppercase">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
