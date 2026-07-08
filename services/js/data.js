// Mock Database
const db = {
  categories: [
    
    
    // IT Services Categories
    { id: 'cat7', type: 'service', name: 'Web Development', icon: 'fa-solid fa-code', image: 'images/cat-webdev.jpg', count: 15 },
    { id: 'cat8', type: 'service', name: 'Cloud & DevOps', icon: 'fa-solid fa-cloud', image: 'images/cat-cloud.jpg', count: 8 },
    { id: 'cat9', type: 'service', name: 'Cybersecurity', icon: 'fa-solid fa-shield-halved', image: 'images/cat-security.jpg', count: 12 },
    { id: 'cat10', type: 'service', name: 'UI/UX Design', icon: 'fa-solid fa-pen-nib', image: 'images/cat-design.jpg', count: 22 }
  ],
  
  products: [
    
    // --- IT SERVICES ---
    {
      id: 's1',
      type: 'service',
      name: 'Full-Stack E-Commerce Development',
      description: 'End-to-end e-commerce website development using React, Node.js, and PostgreSQL.',
      price: 4999.00,
      discount: 10,
      category: 'cat7',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
      rating: 5.0,
      reviews: 24,
      stock: 99,
      features: ['Custom UI/UX', 'Payment Gateway Integration', 'Admin Dashboard', '3 Months Support']
    },
    {
      id: 's2',
      type: 'service',
      name: 'AWS Cloud Migration',
      description: 'Seamless migration of your existing infrastructure to AWS cloud architecture.',
      price: 2500.00,
      discount: 0,
      category: 'cat8',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
      rating: 4.9,
      reviews: 18,
      stock: 99,
      features: ['Zero Downtime', 'Auto-scaling Setup', 'Security Audit', 'Cost Optimization']
    },
    {
      id: 's3',
      type: 'service',
      name: 'Comprehensive Security Audit',
      description: 'Penetration testing and vulnerability assessment for your web applications.',
      price: 1200.00,
      discount: 15,
      category: 'cat9',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=600&auto=format&fit=crop',
      rating: 4.8,
      reviews: 45,
      stock: 99,
      features: ['OWASP Top 10 Check', 'API Security Test', 'Detailed Report', 'Fix Recommendations']
    },
    {
      id: 's4',
      type: 'service',
      name: 'Premium Corporate Branding & UI Design',
      description: 'Complete branding package including logo, typography, and website UI design.',
      price: 1850.00,
      discount: 0,
      category: 'cat10',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
      rating: 4.9,
      reviews: 62,
      stock: 99,
      features: ['3 Logo Concepts', 'Figma Source Files', 'Style Guide', 'Unlimited Revisions']
    }
  ]
};

// Expose to window for global access
window.db = db;
