// Mock Database
const db = {
  categories: [
    // Digital Goods Categories
    { id: 'cat1', type: 'digital', name: 'Subscriptions', icon: 'fa-solid fa-crown', image: 'images/cat-subscriptions.jpg', count: 120 },
    { id: 'cat2', type: 'digital', name: 'Gift Cards', icon: 'fa-solid fa-gift', image: 'images/cat-giftcards.jpg', count: 85 },
    { id: 'cat3', type: 'digital', name: 'Software', icon: 'fa-solid fa-laptop-code', image: 'images/cat-software.jpg', count: 45 },
    { id: 'cat4', type: 'digital', name: 'E-Books', icon: 'fa-solid fa-book', image: 'images/cat-ebooks.jpg', count: 210 },
    { id: 'cat5', type: 'digital', name: 'Courses', icon: 'fa-solid fa-graduation-cap', image: 'images/cat-courses.jpg', count: 64 },
    { id: 'cat6', type: 'digital', name: 'Digital Keys', icon: 'fa-solid fa-key', image: 'images/cat-keys.jpg', count: 320 }
  ],
  
  products: [
    // --- DIGITAL GOODS ---
    {
      id: 'p1',
      type: 'digital',
      name: 'Netflix Premium - 1 Month',
      description: 'Ultra HD streaming on 4 devices simultaneously.',
      price: 15.99,
      discount: 10,
      category: 'cat1',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=600&auto=format&fit=crop',
      rating: 4.8,
      reviews: 1245,
      stock: 50,
      features: ['4K Ultra HD', '4 Screens', 'No ads', 'Download offline']
    },
    {
      id: 'p2',
      type: 'digital',
      name: 'Spotify Premium - 3 Months',
      description: 'Ad-free music listening, offline playback, and more.',
      price: 29.99,
      discount: 15,
      category: 'cat1',
      image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=600&auto=format&fit=crop',
      rating: 4.9,
      reviews: 3200,
      stock: 100,
      features: ['Ad-free', 'Offline mode', 'High quality audio']
    },
    {
      id: 'p3',
      type: 'digital',
      name: 'Canva Pro - 1 Year',
      description: 'Design like a professional with premium templates and tools.',
      price: 119.99,
      discount: 25,
      category: 'cat3',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop',
      rating: 4.7,
      reviews: 890,
      stock: 20,
      features: ['Premium templates', 'Brand kit', 'Background remover', '1TB Cloud storage']
    },
    {
      id: 'p4',
      type: 'digital',
      name: 'ChatGPT Plus - 1 Month',
      description: 'Access to GPT-4, faster response times, and priority access.',
      price: 20.00,
      discount: 0,
      category: 'cat1',
      image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=600&auto=format&fit=crop',
      rating: 5.0,
      reviews: 5430,
      stock: 999,
      features: ['GPT-4 Access', 'DALL-E 3', 'Advanced Data Analysis']
    },
    {
      id: 'p5',
      type: 'digital',
      name: 'Steam Wallet $50',
      description: 'Add funds to your Steam Wallet to purchase games.',
      price: 50.00,
      discount: 2,
      category: 'cat2',
      image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?q=80&w=600&auto=format&fit=crop',
      rating: 4.6,
      reviews: 210,
      stock: 5,
      features: ['Instant delivery', 'Global region']
    },
    {
      id: 'p6',
      type: 'digital',
      name: 'Adobe Creative Cloud - 1 Year',
      description: 'All 20+ creative desktop and mobile apps.',
      price: 599.99,
      discount: 30,
      category: 'cat3',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop',
      rating: 4.8,
      reviews: 420,
      stock: 15,
      features: ['Photoshop', 'Illustrator', 'Premiere Pro', '100GB Cloud Storage']
    }
  ]
};

// Expose to window for global access
window.db = db;
