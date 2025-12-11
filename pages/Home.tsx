import React from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { Shield, Award, Settings, ArrowRight, Crosshair } from 'lucide-react';
import { Feature, Testimonial } from '../types';
import { useImages } from '../context/ImageContext';
import { motion, Variants } from 'framer-motion';

export const Home: React.FC = () => {
  const { images } = useImages();

  const features: Feature[] = [
    {
      title: "High Precision Engineering",
      description: "Our targets are manufactured with sub-millimeter accuracy ensuring consistent training results.",
      icon: Crosshair
    },
    {
      title: "Durable Materials",
      description: "AR500 steel and proprietary self-healing polymers rated for heavy caliber continuous fire.",
      icon: Shield
    },
    {
      title: "Certified Safety",
      description: "Compliant with all major indoor range safety regulations and ricochet prevention standards.",
      icon: Award
    },
    {
      title: "Custom Solutions",
      description: "Tailored designs for military, law enforcement, and private security training facilities.",
      icon: Settings
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sgt. Marcus Reed',
      role: 'Police Training Division',
      text: "STO's reactive steel targets have revolutionized our tactical drills. The durability is unmatched.",
      avatar: images.testimonial1
    },
    {
      id: '2',
      name: 'Sarah Jenkins',
      role: 'Owner, Alpha Range Club',
      text: "The electronic scoring system integrated seamlessly. Our members love the real-time feedback.",
      avatar: images.testimonial2
    },
    {
      id: '3',
      name: 'David Chen',
      role: 'Competition Shooter',
      text: "Precision is key in my sport. STO paper targets are the only ones I trust for practice.",
      avatar: images.testimonial3
    }
  ];

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Zoom - This section keeps its own background but blends it */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            src={images.homeHero} 
            alt="Indoor Shooting Range" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6 text-white drop-shadow-2xl font-oswald">
              PRECISION <span className="text-orange-600 orange-glow">DEFINED</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light drop-shadow-lg"
          >
            STO delivers precision-engineered targets for safe, professional, and advanced indoor shooting experiences.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/products">
              <Button variant="primary">Explore Products <ArrowRight className="w-4 h-4" /></Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose STO */}
      <section className="py-24 bg-neutral-950/80 backdrop-blur-md relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">WHY CHOOSE STO</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent mx-auto" />
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-black/40 backdrop-blur-sm p-8 border border-neutral-800 hover:border-orange-500/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(234,88,12,0.1)]"
              >
                <div className="w-14 h-14 bg-neutral-800/80 rounded-sm flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-oswald">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-black/80 backdrop-blur-md relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-16 text-center font-oswald"
          >
            TRUSTED BY PROFESSIONALS
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div 
                key={t.id} 
                variants={itemVariants}
                className="bg-neutral-900/50 backdrop-blur p-8 border-l-4 border-gray-700 hover:border-orange-600 transition-all hover:bg-neutral-900/70"
              >
                 <div className="flex items-center gap-4 mb-6">
                   <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-gray-600 object-cover" />
                   <div>
                     <h4 className="text-white font-bold font-oswald tracking-wide">{t.name}</h4>
                     <p className="text-xs text-orange-500 uppercase tracking-wide">{t.role}</p>
                   </div>
                 </div>
                 <p className="text-gray-400 italic font-light">"{t.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};