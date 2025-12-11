import React from 'react';
import { useImages } from '../context/ImageContext';
import { motion } from 'framer-motion';
import { Target, Shield, Zap, Award } from 'lucide-react';

export const About: React.FC = () => {
  const { images } = useImages();

  const expertiseItems = [
    { title: 'Precision Engineering', icon: Target },
    { title: 'High-Grade Metallurgy', icon: Shield },
    { title: 'Ballistic Safety', icon: Award },
    { title: 'IoT Integration', icon: Zap },
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header Section */}
      <div className="relative py-24 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md z-0" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-oswald tracking-widest"
          >
            WHO WE ARE
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-orange-600 mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto font-light"
          >
            Pioneering the future of indoor ballistics and target systems since 2008.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-neutral-900/80 backdrop-blur-md p-10 border border-gray-800 rounded-sm shadow-2xl relative overflow-hidden group">
               {/* Decorative accent */}
               <div className="absolute top-0 left-0 w-2 h-full bg-orange-600/20 group-hover:bg-orange-600 transition-colors duration-500" />
               
               <h2 className="text-3xl font-bold text-white uppercase tracking-wider mb-6 font-oswald flex items-center gap-3">
                 Our Heritage
               </h2>
               <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-light">
                <p>
                  Founded on the principles of mechanical excellence and uncompromising safety, STO has grown from a specialized workshop into a global provider of indoor shooting range solutions. 
                </p>
                <p>
                  We understand that in our line of work, there is no margin for error. Our engineers work closely with ballistic experts, law enforcement trainers, and competitive shooters to develop products that withstand the harshest conditions while providing instant, accurate feedback.
                </p>
               </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 border-l-4 border-orange-600">
              <h3 className="text-xl font-bold text-white mb-2 font-oswald">OUR MISSION</h3>
              <p className="italic text-gray-400 text-lg">
                “Delivering innovative, durable, and safe indoor shooting targets for training and professional use, empowering operators to maintain the highest standards of readiness.”
              </p>
            </div>
          </motion.div>

          {/* Images Grid */}
          <div className="relative">
             <div className="grid grid-cols-2 gap-4">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="space-y-4 mt-12"
               >
                 <img 
                   src={images.about1} 
                   className="w-full h-64 object-cover rounded-sm border border-gray-700 shadow-xl grayscale hover:grayscale-0 transition-all duration-500" 
                   alt="Workshop" 
                 />
                 <div className="bg-neutral-800/90 backdrop-blur p-6 text-center border border-gray-700 shadow-lg">
                    <span className="block text-5xl font-bold text-orange-600 mb-1 font-oswald">15+</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Years Experience</span>
                 </div>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: -30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4, duration: 0.8 }}
                 className="space-y-4"
               >
                 <div className="bg-neutral-800/90 backdrop-blur p-6 text-center border border-gray-700 shadow-lg">
                    <span className="block text-5xl font-bold text-orange-600 mb-1 font-oswald">500+</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Ranges Equipped</span>
                 </div>
                 <img 
                   src={images.about2} 
                   className="w-full h-80 object-cover rounded-sm border border-gray-700 shadow-xl grayscale hover:grayscale-0 transition-all duration-500" 
                   alt="Engineering" 
                 />
               </motion.div>
             </div>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className="mt-32">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white uppercase tracking-wider font-oswald">Core Expertise</h2>
            <div className="w-16 h-1 bg-orange-600 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseItems.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 border border-gray-800 bg-neutral-900/60 backdrop-blur-sm hover:bg-neutral-800/90 transition-all duration-300 text-center overflow-hidden hover:border-orange-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-16 h-16 mx-auto bg-black border border-gray-700 rounded-full flex items-center justify-center mb-6 group-hover:border-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <item.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-white font-bold uppercase tracking-wider mb-2 font-oswald text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Industry leading standards in {item.title.toLowerCase()} for maximum reliability.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};