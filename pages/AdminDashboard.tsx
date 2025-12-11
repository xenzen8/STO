import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { useImages, imageLabels, ImageKeys } from '../context/ImageContext';
import { Button } from '../components/Button';
import { Upload, RefreshCw, Plus, Trash2, Edit2, X, Save, Image as ImageIcon, Box, Mail, Calendar, User } from 'lucide-react';
import { Product } from '../types';

export const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'images' | 'products' | 'inquiries'>('images');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="pt-20 min-h-screen relative">
      <div className="bg-neutral-900/90 backdrop-blur border-b border-gray-800 sticky top-20 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">ADMIN DASHBOARD</h1>
              <p className="text-gray-400 text-sm">Manage website content and products.</p>
            </div>
            <div className="flex gap-4">
               <button 
                 onClick={() => setActiveTab('images')}
                 className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-colors text-sm font-bold uppercase tracking-wide ${activeTab === 'images' ? 'bg-orange-600 text-white' : 'bg-black/50 text-gray-400 hover:text-white border border-gray-800'}`}
               >
                 <ImageIcon className="w-4 h-4" /> Site Images
               </button>
               <button 
                 onClick={() => setActiveTab('products')}
                 className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-colors text-sm font-bold uppercase tracking-wide ${activeTab === 'products' ? 'bg-orange-600 text-white' : 'bg-black/50 text-gray-400 hover:text-white border border-gray-800'}`}
               >
                 <Box className="w-4 h-4" /> Products
               </button>
               <button 
                 onClick={() => setActiveTab('inquiries')}
                 className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-colors text-sm font-bold uppercase tracking-wide ${activeTab === 'inquiries' ? 'bg-orange-600 text-white' : 'bg-black/50 text-gray-400 hover:text-white border border-gray-800'}`}
               >
                 <Mail className="w-4 h-4" /> Messages
               </button>
               <button 
                onClick={logout}
                className="text-gray-500 hover:text-red-500 text-sm font-bold uppercase tracking-wide px-4 py-2"
               >
                Logout
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'images' && <ImagesTab />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'inquiries' && <InquiriesTab />}
      </div>
    </div>
  );
};

// --- Sub-components ---

const InquiriesTab: React.FC = () => {
  const { inquiries, deleteInquiry } = useContent();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white border-l-4 border-orange-500 pl-4">Received Inquiries ({inquiries.length})</h2>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/50 border border-gray-800 rounded-sm">
          <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl text-gray-400 font-bold">No messages yet</h3>
          <p className="text-gray-500">Inquiries sent from the Contact form will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-neutral-900/80 backdrop-blur-sm border border-gray-800 p-6 rounded-sm hover:border-gray-600 transition-all">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-600/20 text-orange-500 rounded-full flex items-center justify-center shrink-0 border border-orange-600/30">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{inquiry.subject}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-400 mt-1">
                      <span className="font-medium text-white">{inquiry.name}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-orange-500">{inquiry.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 shrink-0">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(inquiry.date)}
                  </div>
                  <button 
                    onClick={() => deleteInquiry(inquiry.id)}
                    className="p-2 text-red-400 hover:text-white hover:bg-red-500 rounded-sm transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-black/30 p-4 rounded-sm border border-gray-800/50">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{inquiry.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ImagesTab: React.FC = () => {
  const { images, updateImage, resetImage } = useImages();

  const handleFileChange = (key: ImageKeys) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) updateImage(key, file);
  };

  const groups = {
    'Home Page': ['homeHero'] as ImageKeys[],
    'Testimonials': ['testimonial1', 'testimonial2', 'testimonial3'] as ImageKeys[],
    'About Page': ['about1', 'about2'] as ImageKeys[],
    'Contact': ['contactMap'] as ImageKeys[]
  };

  return (
    <div className="space-y-12 animate-fade-in">
       {Object.entries(groups).map(([groupName, keys]) => (
        <div key={groupName}>
          <h2 className="text-xl font-bold text-white border-l-4 border-orange-500 pl-4 mb-6">{groupName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keys.map((key) => (
              <div key={key} className="bg-neutral-900/80 backdrop-blur-sm border border-gray-800 p-4 rounded-sm hover:border-gray-600 transition-colors">
                <div className="mb-3 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-300 block uppercase tracking-wide">{imageLabels[key]}</span>
                  <button onClick={() => resetImage(key)} title="Reset to default" className="text-gray-500 hover:text-red-500 transition-colors">
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
                <div className="relative aspect-video bg-black mb-4 overflow-hidden border border-gray-800 rounded-sm">
                  <img src={images[key]} alt={imageLabels[key]} className="w-full h-full object-cover" />
                </div>
                <div className="relative">
                  <input type="file" id={`file-${key}`} accept="image/*" className="hidden" onChange={handleFileChange(key)} />
                  <label htmlFor={`file-${key}`} className="flex items-center justify-center gap-2 w-full py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer transition-colors text-xs font-bold uppercase tracking-wide border border-gray-700">
                    <Upload className="w-3 h-3" /> Upload New
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductsTab: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const initialFormState: Omit<Product, 'id'> = {
    title: '',
    description: '',
    category: 'paper',
    features: [''],
    image: 'https://via.placeholder.com/600x400?text=No+Image'
  };
  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setImageFile(null);
    setIsAdding(false);
  };

  const startAdd = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setImageFile(null);
    setIsAdding(true);
  };

  const cancelForm = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(initialFormState);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeatureField = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean empty features
    const cleanData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== '')
    };

    if (isAdding) {
      addProduct(cleanData);
    } else if (editingId) {
      updateProduct({ ...cleanData, id: editingId });
    }
    
    cancelForm();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      {/* List of Products */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold text-white border-l-4 border-orange-500 pl-4">Existing Products ({products.length})</h2>
           <Button variant="outline" onClick={startAdd} className={isAdding ? 'opacity-50' : ''}>
             <Plus className="w-4 h-4" /> Add New Product
           </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {products.map((p) => (
            <div key={p.id} className={`bg-neutral-900/80 backdrop-blur-sm border p-4 flex flex-col md:flex-row gap-4 transition-all ${editingId === p.id ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-800'}`}>
              <img src={p.image} alt={p.title} className="w-full md:w-32 h-32 object-cover rounded-sm bg-black" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-lg">{p.title}</h3>
                    <span className="text-xs uppercase bg-gray-800 text-gray-300 px-2 py-1 rounded-sm border border-gray-700">{p.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(p)} className="p-2 hover:bg-gray-800 rounded text-blue-400"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-2 hover:bg-gray-800 rounded text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Form */}
      {(isAdding || editingId) && (
        <div className="lg:col-span-1">
          <div className="bg-neutral-900/90 backdrop-blur border border-gray-700 p-6 sticky top-40 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{isAdding ? 'Add Product' : 'Edit Product'}</h3>
              <button onClick={cancelForm}><X className="w-5 h-5 text-gray-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Product Image</label>
                <div className="relative aspect-video bg-black border border-gray-700 overflow-hidden mb-2">
                   <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                </div>
                <input type="file" onChange={handleImageUpload} className="text-sm text-gray-400 w-full" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Title</label>
                <input 
                  required
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 p-2 text-white text-sm focus:border-orange-500 outline-none" 
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as any})}
                  className="w-full bg-black/50 border border-gray-700 p-2 text-white text-sm focus:border-orange-500 outline-none"
                >
                  <option value="paper">Paper Targets</option>
                  <option value="metal">Metal Targets</option>
                  <option value="tech">Electronics/Tech</option>
                  <option value="range">Range Equipment</option>
                  <option value="custom">Custom Solutions</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 p-2 text-white text-sm focus:border-orange-500 outline-none" 
                />
              </div>

              {/* Features */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Bullet Features</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="text" 
                      value={feature}
                      onChange={e => handleFeatureChange(index, e.target.value)}
                      className="w-full bg-black/50 border border-gray-700 p-2 text-white text-sm focus:border-orange-500 outline-none"
                    />
                    <button type="button" onClick={() => removeFeatureField(index)} className="text-gray-500 hover:text-red-500"><X className="w-4 h-4" /></button>
                  </div>
                ))}
                <button type="button" onClick={addFeatureField} className="text-xs text-orange-500 hover:text-orange-400 font-bold uppercase mt-1">+ Add Feature</button>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="submit" className="flex-1">{isAdding ? 'Create' : 'Save Changes'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};