import { Product, Inquiry } from '../types';

// Simulasi Latency Jaringan (agar terasa seperti request ke server asli)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Key untuk LocalStorage (Simulasi Database SQL)
const KEYS = {
  USER: 'sto_user',
  PRODUCTS: 'sto_products',
  INQUIRIES: 'sto_inquiries',
  IMAGES: 'sto_images'
};

// --- DATA SEEDING (Data Awal) ---
// Data ini akan otomatis masuk ke database jika kosong
const defaultProducts: Product[] = [
  {
    id: 'seed-1',
    title: 'B-27 Official Silhouette',
    description: 'Standard FBI Q-target dimensions. Printed on high-quality non-glare paper for superior visibility in indoor lighting conditions.',
    category: 'paper',
    features: ['Official Dimensions', 'Non-glare Matte Finish', '100 Pack Bundle', 'High Contrast Ink'],
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'seed-2',
    title: 'AR500 Steel Gong (10")',
    description: '3/8" thick AR500 steel gong designed for centerfire handgun and rifle use. Audible feedback confirm hits instantly.',
    category: 'metal',
    features: ['3/8" AR500 Steel', 'Laser Cut Edges', 'Powder Coated Finish', 'Mounting Holes Included'],
    image: 'https://images.unsplash.com/photo-1599313689439-d36d40c749b5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'seed-3',
    title: 'Auto-Reset Popper',
    description: 'Heavy-duty steel popper that falls when hit and automatically resets via spring mechanism. No manual reset required.',
    category: 'metal',
    features: ['Auto-Reset Spring', 'Adjustable Calibration', 'All-Weather Coating', 'Heavy Base'],
    image: 'https://images.unsplash.com/photo-1533575677944-77e84ce43a85?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'seed-4',
    title: 'Smart Range Tablet',
    description: 'Control target distance, turning intervals, and lighting presets directly from the firing lane.',
    category: 'tech',
    features: ['Touchscreen Interface', 'Wireless Connection', 'Preset Drills', 'Rugged Casing'],
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'seed-5',
    title: 'Overhead Retriever System',
    description: 'Rail-mounted target retrieval system with smooth acceleration and variable speed control.',
    category: 'range',
    features: ['Wireless Control', '360 Degree Turning', 'LED Target Light', 'Heavy Payload Capable'],
    image: 'https://images.unsplash.com/photo-1583307222340-988362d8544a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'seed-6',
    title: 'Ballistic Rubber Trap',
    description: 'Granulated rubber bullet trap designed to capture rounds safely with minimal lead dust.',
    category: 'range',
    features: ['Captures up to .308', 'Fire Retardant', 'Low Maintenance', 'Dust Containment'],
    image: 'https://images.unsplash.com/photo-1516246342263-d30907474438?auto=format&fit=crop&q=80&w=800'
  }
];

// Data Default Gambar
const defaultImages = {
  homeHero: 'https://images.unsplash.com/photo-1572511443722-1d624b4f5351?auto=format&fit=crop&q=80&w=1920', // Indoor Range
  homeShowcase: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=800',
  testimonial1: 'https://randomuser.me/api/portraits/men/32.jpg',
  testimonial2: 'https://randomuser.me/api/portraits/women/44.jpg',
  testimonial3: 'https://randomuser.me/api/portraits/men/86.jpg',
  about1: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600', // Engineering
  about2: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600', // Construction
  product_p1: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=800',
  product_p2: 'https://images.unsplash.com/photo-1599313689439-d36d40c749b5?auto=format&fit=crop&q=80&w=800',
  product_p3: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
  product_p4: 'https://images.unsplash.com/photo-1533575677944-77e84ce43a85?auto=format&fit=crop&q=80&w=800',
  product_p5: 'https://images.unsplash.com/photo-1583307222340-988362d8544a?auto=format&fit=crop&q=80&w=800',
  product_p6: 'https://images.unsplash.com/photo-1516246342263-d30907474438?auto=format&fit=crop&q=80&w=800',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200'
};

export const api = {
  // --- AUTHENTICATION ---
  auth: {
    login: async (email: string, pass: string) => {
      await delay(500);
      // VALIDASI LOGIN DIPERBARUI DI SINI
      if (email === 'admin@sto.com' && pass === 'admin123') {
        const user = { uid: '1', email };
        localStorage.setItem(KEYS.USER, JSON.stringify(user));
        return user;
      }
      throw new Error('Invalid credentials');
    },
    logout: async () => {
      await delay(200);
      localStorage.removeItem(KEYS.USER);
    },
    getCurrentUser: () => {
      const u = localStorage.getItem(KEYS.USER);
      return u ? JSON.parse(u) : null;
    }
  },

  // --- PRODUCTS ---
  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(500);
      const data = localStorage.getItem(KEYS.PRODUCTS);
      
      // AUTO-SEEDING: Jika kosong, isi dengan data default
      if (!data || JSON.parse(data).length === 0) {
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(defaultProducts));
        return defaultProducts;
      }
      
      return JSON.parse(data);
    },
    create: async (product: Omit<Product, 'id'>) => {
      await delay(500);
      const products = await api.products.getAll();
      const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
      products.push(newProduct);
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    },
    update: async (product: Product) => {
      await delay(500);
      const products = await api.products.getAll();
      const index = products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products[index] = product;
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      }
    },
    delete: async (id: string) => {
      await delay(500);
      const products = await api.products.getAll();
      const filtered = products.filter(p => p.id !== id);
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(filtered));
    }
  },

  // --- INQUIRIES ---
  inquiries: {
    getAll: async (): Promise<Inquiry[]> => {
      await delay(500);
      const data = localStorage.getItem(KEYS.INQUIRIES);
      return data ? JSON.parse(data) : [];
    },
    create: async (inquiry: Omit<Inquiry, 'id' | 'date'>) => {
      await delay(500);
      const inquiries = await api.inquiries.getAll();
      const newInquiry = { 
        ...inquiry, 
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString()
      };
      inquiries.unshift(newInquiry);
      localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
    },
    delete: async (id: string) => {
      await delay(500);
      const inquiries = await api.inquiries.getAll();
      const filtered = inquiries.filter(i => i.id !== id);
      localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(filtered));
    }
  },

  // --- IMAGES ---
  images: {
    getAll: async () => {
      await delay(300);
      const stored = localStorage.getItem(KEYS.IMAGES);
      
      // Merge stored images with defaults (defaults act as fallback)
      const storedObj = stored ? JSON.parse(stored) : {};
      return { ...defaultImages, ...storedObj };
    },
    update: async (key: string, file: File) => {
      await delay(1000);
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const current = localStorage.getItem(KEYS.IMAGES);
          const images = current ? JSON.parse(current) : {};
          images[key] = base64String;
          localStorage.setItem(KEYS.IMAGES, JSON.stringify(images));
          resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
    reset: async (key: string) => {
      await delay(300);
      const current = localStorage.getItem(KEYS.IMAGES);
      if (current) {
        const images = JSON.parse(current);
        delete images[key]; // Deleting allows fallback to defaultImages
        localStorage.setItem(KEYS.IMAGES, JSON.stringify(images));
      }
    }
  }
};