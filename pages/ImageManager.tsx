import React from 'react';
import { useImages, imageLabels, ImageKeys } from '../context/ImageContext';
import { Button } from '../components/Button';
import { Upload, RefreshCw } from 'lucide-react';

export const ImageManager: React.FC = () => {
  const { images, updateImage, resetImage } = useImages();

  const handleFileChange = (key: ImageKeys) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateImage(key, file);
    }
  };

  // Group images for display
  const groups = {
    'Home Page': ['homeHero', 'homeShowcase'] as ImageKeys[],
    'Testimonials': ['testimonial1', 'testimonial2', 'testimonial3'] as ImageKeys[],
    'About Page': ['about1', 'about2'] as ImageKeys[],
    'Products': ['product_p1', 'product_p2', 'product_p3', 'product_p4', 'product_p5', 'product_p6'] as ImageKeys[],
    'Contact': ['contactMap'] as ImageKeys[]
  };

  return (
    <div className="pt-20 bg-black min-h-screen">
      <div className="bg-neutral-900 py-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">IMAGE MANAGER</h1>
          <p className="text-gray-400">Upload custom images for specific sections of the website. Changes are saved to your browser.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-12">
          {Object.entries(groups).map(([groupName, keys]) => (
            <div key={groupName}>
              <h2 className="text-xl font-bold text-white border-l-4 border-gray-500 pl-4 mb-6">{groupName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keys.map((key) => (
                  <div key={key} className="bg-neutral-900 border border-gray-800 p-4 rounded-sm hover:border-gray-600 transition-colors">
                    <div className="mb-3 flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-300 block">{imageLabels[key]}</span>
                      <button 
                        onClick={() => resetImage(key)}
                        title="Reset to default"
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Preview */}
                    <div className="relative aspect-video bg-black mb-4 overflow-hidden border border-gray-800 rounded-sm">
                      <img 
                        src={images[key]} 
                        alt={imageLabels[key]} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Upload */}
                    <div className="relative">
                      <input
                        type="file"
                        id={`file-${key}`}
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange(key)}
                      />
                      <label 
                        htmlFor={`file-${key}`}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer transition-colors text-sm font-medium border border-gray-700 uppercase tracking-wide"
                      >
                        <Upload className="w-4 h-4" /> Upload New
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};