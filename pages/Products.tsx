import React from 'react';
import { Button } from '../components/Button';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export const Products: React.FC = () => {
  const { products } = useContent();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="pt-20 min-h-screen bg-grid-pattern">
      <div className="bg-neutral-900/60 backdrop-blur-md py-16 border-b border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 font-oswald"
          >
            PRODUCTS & SERVICES
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg"
          >
            Engineered for the modern shooter.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id} 
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-neutral-900/80 backdrop-blur-sm border border-gray-800 flex flex-col group hover:border-orange-500/50 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Card Scanline Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none z-20" />

              <div className="relative overflow-hidden h-64">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col z-10 relative">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-xs font-bold text-orange-500 uppercase tracking-widest border border-orange-900/30 px-2 py-1 bg-orange-900/10">{product.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors font-oswald tracking-wide">{product.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">{product.description}</p>
                
                <ul className="mb-6 space-y-2 border-t border-gray-800 pt-4">
                  {product.features.map((f, i) => (
                    <li key={i} className="text-xs text-gray-400 flex items-center">
                      <span className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full text-sm py-2 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 bg-black/50">Request Quote</Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Design CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 backdrop-blur p-12 border border-gray-700 text-center rounded-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5">
             <Settings className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4 font-oswald">NEED A CUSTOM SOLUTION?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              We design bespoke target systems for law enforcement agencies and specialized training centers. 
              Tell us your requirements, and our engineers will build it.
            </p>
            <Button variant="primary" className="mx-auto">Start Custom Project</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};