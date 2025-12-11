import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Mail, Phone, MapPin, CheckCircle, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useImages } from '../context/ImageContext';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const { addInquiry } = useContent();
  const { images } = useImages();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      addInquiry({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="pt-20 min-h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        
        {/* Contact Form */}
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center relative z-10 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold text-white mb-2 font-oswald">GET IN TOUCH</h1>
            <p className="text-gray-400 mb-10 text-lg">
              Ready to upgrade your range? Send us a message.
            </p>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/50 p-6 rounded-sm flex flex-col items-center justify-center text-center space-y-4 mb-8"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-oswald">MESSAGE SENT</h3>
                <p className="text-gray-300">Thank you for contacting STO. Our team has received your message and will respond shortly.</p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Name</label>
                    <input 
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-900/80 border border-gray-800 p-3 text-white focus:outline-none focus:border-orange-500 focus:bg-neutral-800 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Email</label>
                    <input 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-900/80 border border-gray-800 p-3 text-white focus:outline-none focus:border-orange-500 focus:bg-neutral-800 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Subject</label>
                  <div className="relative">
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-neutral-900/80 border border-gray-800 p-3 text-white focus:outline-none focus:border-orange-500 focus:bg-neutral-800 transition-all duration-300 appearance-none"
                    >
                      <option>General Inquiry</option>
                      <option>Product Quote</option>
                      <option>Support Request</option>
                      <option>Custom Project</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Message</label>
                  <textarea 
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900/80 border border-gray-800 p-3 text-white focus:outline-none focus:border-orange-500 focus:bg-neutral-800 transition-all duration-300 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Send Message <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}

            <div className="mt-12 pt-12 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-900/80 rounded-full flex items-center justify-center text-white border border-gray-800">
                  <Phone className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-900/80 rounded-full flex items-center justify-center text-white border border-gray-800">
                  <Mail className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm text-gray-400">info@stotargets.com</span>
              </div>
              <div className="flex items-center gap-3">
                 <Button variant="outline" className="text-xs py-2 px-4 h-10 bg-black/50">WhatsApp</Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map / Info Side - Visible on Mobile and Desktop */}
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative bg-neutral-900/40 border-t lg:border-t-0 lg:border-l border-gray-900 block overflow-hidden min-h-[600px] lg:min-h-auto"
        >
           {/* Placeholder for Map Background Image */}
           <div className="absolute inset-0 opacity-50">
             <motion.img 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
               src={images.contactMap} 
               className="w-full h-full object-cover grayscale" 
               alt="Map Background" 
             />
           </div>
           <div className="absolute inset-0 bg-black/60" />
           <div className="absolute inset-0 bg-grid-pattern opacity-10" />
           
           <div className="absolute inset-0 flex items-center justify-center p-4">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="bg-black/80 backdrop-blur-md p-6 md:p-8 border border-gray-700 w-full max-w-md shadow-2xl relative"
             >
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-600" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-600" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-600" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-600" />

                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="w-8 h-8 text-orange-600 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-oswald">HEADQUARTERS</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      124 Precision Drive, Suite 500<br/>
                      Austin, TX 78701<br/>
                      United States
                    </p>
                  </div>
                </div>
                
                {/* Dynamic Map Embed */}
                <div className="w-full h-64 bg-gray-800 mt-6 border border-gray-600 relative overflow-hidden group">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    title="STO Location"
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://maps.google.com/maps?q=124%20Precision%20Drive%2C%20Austin%2C%20TX&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
                  ></iframe>
                </div>
             </motion.div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};