import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

// Default placeholders (kept for typing inference, though logic is now in api)
const defaultImages = {
  homeHero: 'https://picsum.photos/id/147/1920/1080?grayscale&blur=2',
  homeShowcase: 'https://picsum.photos/id/896/800/600?grayscale',
  testimonial1: 'https://picsum.photos/seed/police/100/100?grayscale',
  testimonial2: 'https://picsum.photos/seed/sarah/100/100?grayscale',
  testimonial3: 'https://picsum.photos/seed/david/100/100?grayscale',
  about1: 'https://picsum.photos/seed/shoot1/400/500?grayscale',
  about2: 'https://picsum.photos/seed/shoot2/400/300?grayscale',
  product_p1: 'https://picsum.photos/seed/paper/600/400?grayscale',
  product_p2: 'https://picsum.photos/seed/steel/600/400?grayscale',
  product_p3: 'https://picsum.photos/seed/tech/600/400?grayscale',
  product_p4: 'https://picsum.photos/seed/popper/600/400?grayscale',
  product_p5: 'https://picsum.photos/seed/track/600/400?grayscale',
  product_p6: 'https://picsum.photos/seed/trap/600/400?grayscale',
  contactMap: 'https://picsum.photos/id/1033/1000/1000?grayscale&blur=2'
};

export type ImageKeys = keyof typeof defaultImages;

export const imageLabels: Record<ImageKeys, string> = {
  homeHero: 'Home: Hero Background',
  homeShowcase: 'Home: Equipment Showcase',
  testimonial1: 'Testimonial: Police Avatar',
  testimonial2: 'Testimonial: Owner Avatar',
  testimonial3: 'Testimonial: Shooter Avatar',
  about1: 'About: Workshop Image',
  about2: 'About: Engineering Image',
  product_p1: 'Product: Paper Targets',
  product_p2: 'Product: Steel Targets',
  product_p3: 'Product: Smart Scoring',
  product_p4: 'Product: Auto-Reset',
  product_p5: 'Product: Track Systems',
  product_p6: 'Product: Bullet Traps',
  contactMap: 'Contact: Map Background'
};

interface ImageContextType {
  images: typeof defaultImages;
  updateImage: (key: ImageKeys, file: File) => Promise<void>;
  resetImage: (key: ImageKeys) => Promise<void>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [images, setImages] = useState(defaultImages);

  const fetchImages = async () => {
    try {
      const data = await api.images.getAll();
      setImages(data);
    } catch (e) {
      console.error("Error fetching images", e);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const updateImage = async (key: ImageKeys, file: File) => {
    try {
      await api.images.update(key, file);
      // Refresh local state
      const data = await api.images.getAll();
      setImages(data);
    } catch (e) {
      console.error("Error updating image", e);
      alert("Failed to upload image.");
    }
  };

  const resetImage = async (key: ImageKeys) => {
    try {
      await api.images.reset(key);
      const data = await api.images.getAll();
      setImages(data);
    } catch (e) {
      console.error("Error resetting image", e);
    }
  };

  return (
    <ImageContext.Provider value={{ images, updateImage, resetImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) throw new Error("useImages must be used within ImageProvider");
  return context;
};