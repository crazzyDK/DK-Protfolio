import { useState, useEffect, useRef } from 'react';
import { Code2, Brain, Database, Terminal, Blocks, Github, Linkedin, Mail, ExternalLink, BookOpen, Users, Award, Briefcase, ArrowDown, Sparkles, Globe, Cpu, Menu, X, Download, Calendar, MapPin, Store, GraduationCap, School, Utensils, AlertTriangle, Apple as Api } from 'lucide-react';

// Custom hook for typing effect
function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Initial delay before starting
    timeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isTyping]);

  return displayText;
}

// Custom hook for number animation
function useCountAnimation(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return { count, ref: countRef };
}

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const titleText1 = useTypewriter("Backend Developer", 100, 0);
  const titleText2 = useTypewriter("Programming Educator", 100, 1500);
  const subtitleText = useTypewriter(
    "Specializing in full-stack development, system architecture, and database design. Experienced in building robust management systems and APIs.",
    30,
    3000
  );

  // Project data
  const projects = [
    {
      title: "E-Commerce Backend System",
      description: "Robust backend system with Node.js and MongoDB, featuring user authentication, product management, and order processing",
      tags: ['Node.js', 'MongoDB', 'Express', 'REST API'],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
      category: 'backend',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: "College Management System",
      description: "Comprehensive system for managing college operations including student records, attendance, and course management",
      tags: ['Nodejs', 'Reactjs', 'MongoDB', 'Tailwindcss'],
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
      category: 'backend',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: "School Management System",
      description: "Complete school administration platform with student, teacher, and class management capabilities",
      tags: ['Nodejs', 'Reactjs', 'MongoDB', 'Tailwindcss'],
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800",
      category: 'backend',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: "Meal Management System",
      description: "Digital solution for meal planning, tracking, and management in institutional settings",
      tags: ['Node.js', 'MongoDB', 'Tailwindcss'],
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
      category: 'backend',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: "Fake News Detection System",
      description: "AI-powered system to identify and classify fake news using machine learning algorithms",
      tags: ['Python', 'ML', 'NLP'],
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
      category: 'ai',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: "Dynamic API URL System",
      description: "Flexible API routing system with dynamic endpoint generation and management",
      tags: ['Node.js', 'Express', 'REST API'],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      category: 'backend',
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'experience'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              DK Portfolio
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-gray-300 hover:text-green-400 transition-colors relative ${
                    activeSection === id ? 'text-green-400' : ''
                  }`}
                >
                  {label}
                  {activeSection === id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 animate-fadeIn" />
                  )}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-all hover:scale-105"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
                    activeSection === id 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {label}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative min-h-screen overflow-hidden pt-16">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent" />

        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[Sparkles, Globe, Cpu, Brain].map((Icon, index) => (
            <div
              key={index}
              className="absolute animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${index * 0.5}s`,
                opacity: 0.1
              }}
            >
              <Icon className="w-12 h-12" />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            <div className="space-y-8 animate-fadeInUp">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-green-400">
                  <span className="px-4 py-1 bg-green-500/10 rounded-full text-sm animate-pulse">
                    Available for hire
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent inline-block min-h-[1.2em]">
                    {titleText1}
                  </span>
                  <br />
                  <span className="text-white">&</span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent inline-block min-h-[1.2em]">
                    {titleText2}
                  </span>
                </h1>
                <p className="text-gray-400 text-base sm:text-lg max-w-xl min-h-[4em]">
                  {subtitleText}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-all hover:scale-105 animate-fadeIn flex items-center justify-center gap-2"
                >
                  View Projects
                  <ArrowDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 border border-green-500/30 hover:border-green-500 rounded-lg font-medium transition-all hover:scale-105 animate-fadeIn delay-100"
                >
                  Contact Me
                </button>
              </div>

              <div className="flex items-center gap-6">
                <a href="https://github.com/unknown001dk" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/dineshkumar-a-578a0a29b/" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="dk9232525@gmail.com" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Tech visualization */}
            <div className="relative animate-fadeInRight hidden lg:block">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700">
                <div className="grid grid-cols-2 gap-6">
                  <TechCard
                    icon={<Code2 className="w-8 h-8" />}
                    title="Full-Stack Development"
                    description="Building robust web applications with modern technologies"
                  />
                  <TechCard
                    icon={<Database className="w-8 h-8" />}
                    title="Backend Systems"
                    description="Creating scalable backend solutions with Node.js & MongoDB"
                  />
                  <TechCard
                    icon={<Terminal className="w-8 h-8" />}
                    title="Multiple Languages"
                    description="Proficient in JavaScript, Python, C, and C#"
                  />
                  <TechCard
                    icon={<Blocks className="w-8 h-8" />}
                    title="System Architecture"
                    description="Designing efficient and maintainable systems"
                  />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div id="about" className="container mx-auto px-4 sm:px-6 mt-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <StatCard icon={<BookOpen className="w-6 h-6" />} value={3} suffix="+" label="Years Experience" />
          <StatCard icon={<Users className="w-6 h-6" />} value={20} suffix="+" label="Projects Completed" />
          <StatCard icon={<Award className="w-6 h-6" />} value={15} suffix="+" label="Happy Clients" />
          <StatCard icon={<Briefcase className="w-6 h-6" />} value={5} suffix="+" label="Management Systems" />
        </div>
      </div>

      {/* Featured Projects */}
      <div id="projects" className="container mx-auto px-4 sm:px-6 mt-32">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-400">Showcasing some of my best work</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fadeIn">
          {['all', 'backend', 'ai'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                activeTab === tab
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div id="experience" className="container mx-auto px-4 sm:px-6 mt-32">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold mb-4">Tech Stack & Expertise</h2>
          <p className="text-gray-400">Technologies I work with</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ExpertiseCard
            icon={<Code2 className="w-6 h-6" />}
            title="Frontend"
            items={['HTML/CSS', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'ReactJs']}
          />
          <ExpertiseCard
            icon={<Terminal className="w-6 h-6" />}
            title="Backend"
            items={['Node.js', 'Python', 'C', 'C#']}
          />
          <ExpertiseCard
            icon={<Database className="w-6 h-6" />}
            title="Database"
            items={['MongoDB', 'Database Design', 'Data Modeling']}
          />
          <ExpertiseCard
            icon={<Blocks className="w-6 h-6" />}
            title="Others"
            items={['RESTful APIs', 'System Design', 'Version Control']}
          />
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="container mx-auto px-4 sm:px-6 mt-32 mb-20">
        <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-gray-400">
              Have a project in mind? Let's discuss how we can help your business grow.
            </p>
          </div>
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
            ></textarea>
            <button className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// add types for icon, title
interface Icon {
  icon: any,
  title: string,
  description: string,
}

function TechCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all group hover:scale-105">
      <div className="text-green-400 mb-4 transform group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function ExpertiseCard({ icon, title, items }) {
  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all hover:scale-105">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-green-400">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-400 text-sm">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function StatCard({ icon, value, suffix = '', label }) {
  const { count, ref } = useCountAnimation(value);
  
  return (
    <div 
      ref={ref}
      className="p-6 bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 hover:border-green-500/50 transition-all hover:scale-105"
    >
      <div className="text-green-400 mb-4">{icon}</div>
      <div className="text-3xl font-bold mb-1">
        <span className="tabular-nums">{count}</span>
        {suffix}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}

function ProjectCard({ title, description, tags, image, demoUrl, githubUrl }) {
  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 overflow-hidden hover:scale-105 transition-all">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Source</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;