import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Inquiry } from '../types';
import { api } from '../services/api';

interface ContentContextType {
  products: Product[];
  inquiries: Inquiry[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date'>) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  refreshData: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await api.products.getAll();
      setProducts(data);
    } catch (e) {
      console.error("Error fetching products: ", e);
    }
  };

  const fetchInquiries = async () => {
    try {
      const data = await api.inquiries.getAll();
      setInquiries(data);
    } catch (e) {
      console.error("Error fetching inquiries: ", e);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchInquiries();
  }, []);

  // Product Actions
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    await api.products.create(productData);
    fetchProducts();
  };

  const updateProduct = async (updatedProduct: Product) => {
    await api.products.update(updatedProduct);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await api.products.delete(id);
    fetchProducts();
  };

  // Inquiry Actions
  const addInquiry = async (inquiryData: Omit<Inquiry, 'id' | 'date'>) => {
    await api.inquiries.create(inquiryData);
    fetchInquiries();
  };

  const deleteInquiry = async (id: string) => {
    await api.inquiries.delete(id);
    fetchInquiries();
  };

  return (
    <ContentContext.Provider value={{ 
      products, 
      inquiries,
      addProduct, 
      updateProduct, 
      deleteProduct,
      addInquiry,
      deleteInquiry,
      refreshData: () => { fetchProducts(); fetchInquiries(); }
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within ContentProvider");
  return context;
};