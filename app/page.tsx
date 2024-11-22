'use client';

import { ArrowDown, BookOpen, Users, Briefcase, Award, MessageCircle, Calendar} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/router';
const features = [
  {
    title: "Student Profiles",
    description: "Create your digital identity showcasing your skills, achievements, and academic journey.",
    icon: <BookOpen className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Connect & Network",
    description: "Build meaningful connections with peers, mentors, and industry professionals.",
    icon: <Users className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Opportunities",
    description: "Discover internships, projects, and job opportunities tailored for students.",
    icon: <Briefcase className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Mentorship",
    description: "Learn from experienced seniors and guide juniors in your field of expertise.",
    icon: <Award className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Community Forums",
    description: "Engage in discussions, share resources, and get help from the student community.",
    icon: <MessageCircle className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Event Calendar",
    description: "Stay updated with upcoming events, webinars, and workshops for skill development.",
    icon: <Calendar className="w-6 h-6 text-pink-500" />,
  },
  // {
  //   title: "Skill Building Resources",
  //   description: "Access curated resources like articles, courses, and tools to improve your skills.",
  //   icon: <Tool className="w-6 h-6 text-pink-500" />,
  // }
];

const stats = [
  { value: "50K+", label: "Active Students" },
  { value: "1000+", label: "Universities" },
  { value: "5K+", label: "Projects" },
  { value: "10K+", label: "Mentors" },
];


function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // IntersectionObserver to detect when the HeroSection enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // When the section enters the viewport
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070')] bg-cover bg-center opacity-5" />
      <div
        className={`text-center z-10 max-w-4xl mx-auto space-y-6 transition-all duration-1000 ease-in-out ${
          isVisible
            ? 'opacity-100 transform translate-y-0' // When in view
            : 'opacity-0 transform translate-y-10' // Initially hidden (move down)
        }`}
      >
        <div className="flex justify-center items-center flex-col relative">
          <img
            alt="Avatar"
            src="avatartion.png"
            className="h-[300px] w-[300px] object-cover rounded-full"
          />
        </div>
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          Welcome to Studify
        </h1>
        <p className="text-xl text-gray-600">
          Connect, Collaborate, and Grow with Fellow Students
        </p>
        <div className="flex gap-4 justify-center mt-8">
        <Link href="/Login_page"
      className="px-8 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-200">
      Get Started
    </Link>
          <button className="px-8 py-3 bg-white text-pink-500 rounded-full font-medium hover:bg-pink-50 transform hover:scale-105 transition-all duration-300 shadow-lg" >
            Explore
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 animate-bounce">
        <ArrowDown className="w-6 h-6 text-pink-500" />
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 px-4" id="features">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50" id="stats">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-pink-500 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50" id="testimonials">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-800">What Our Users Are Saying</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="p-8 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center items-center flex-col relative">
          <img
            alt="Avatar"
            src="Patric.png"
            className="h-[300px] w-[300px] object-cover rounded-full"
          />
        </div>
            <p className="text-gray-600 italic">"Studify helped me connect with mentors and peers that have shaped my career. It's an essential platform for anyone looking to grow in their field."</p>
            <h4 className="mt-4 text-xl font-semibold text-pink-500">Aye Min Khant</h4>
            <p className="text-gray-500">Software Engineer</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center items-center flex-col relative">
          <img
            alt="Avatar"
            src="Jeje.png"
            className="h-[300px] w-[300px] object-cover rounded-full"
          />
        </div>
            <p className="text-gray-600 italic">"I found multiple opportunities on Studify that were tailored to my career interests. It helped me land my dream internship."</p>
            <h4 className="mt-4 text-xl font-semibold text-pink-500">Jeje Thanida</h4>
            <p className="text-gray-500">Product Designer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className="py-20 px-4" id="resources">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-800">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-pink-500 mb-4">Career Building</h3>
            <p className="text-gray-600">Access expert advice, tips, and tools to enhance your career prospects, including resume templates, job search strategies, and interview preparation.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-pink-500 mb-4">Skill Development</h3>
            <p className="text-gray-600">Explore resources like online courses, tutorials, and books that will help you enhance your technical, soft, and leadership skills.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-pink-500 mb-4">Wellness & Balance</h3>
            <p className="text-gray-600">Discover tips and strategies to maintain a healthy study-life balance, including mental health resources and wellness tips for students.</p>
          </div>
        </div>
      </div>
    </section>
    
  );
}
export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // IntersectionObserver to detect when the section enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // When the section enters the viewport
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (

    <section ref={sectionRef} className="py-20 px-4">
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-in-out ${
          isVisible
            ? 'opacity-100 transform translate-y-0' // When in view
            : 'opacity-0 transform translate-y-10' // Initially hidden (move down)
        }`}
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Ready to Start Your Journey?</h2>
        <p className="text-xl text-gray-600 mb-12">
          Join thousands of students already building their future on Studify
        </p>
        <Link
          href="/Login_page"
          className="px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-200"
        >
          Join Studify Today
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialSection />
      <ResourcesSection />
      <CTASection/>
    </>
  );
}
