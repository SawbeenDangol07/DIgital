document.addEventListener("DOMContentLoaded", () => {
  // Theme Switcher
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Get current theme from local storage or system preference
  let currentTheme = localStorage.getItem("theme");
  if (!currentTheme) {
    currentTheme = prefersDarkScheme.matches ? "dark" : "light";
  }

  // Apply current theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      let newTheme = theme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector("i");
    if (theme === "dark") {
      icon.className = "fa-solid fa-sun";
    } else {
      icon.className = "fa-solid fa-moon";
    }
  }

  

  // Helper to format currency
  window.formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Helper to calculate discounted price
  window.calculateDiscount = (price, discountPercent) => {
    if (!discountPercent) return price;
    return price - price * (discountPercent / 100);
  };
});

// ==========================================
// MOCK DATA & UI LOGIC
// ==========================================
// Global function to fetch products (Mock)
window.fetchProducts = async () => {
  if (!window.supabase) return;
  try {
    const { data: categories, error: cErr } = await window.supabase.from('categories').select('*');
    if (cErr) throw cErr;
    if (categories) {
      window.db.categories = categories.map(c => ({
        id: c.id,
        name: c.name,
        icon: c.icon,
        type: c.portal,
        count: 0
      }));
    }

    const { data: products, error: pErr } = await window.supabase.from('products').select('*');
    if (pErr) throw pErr;
    if (products) {
      window.db.products = products.map(p => ({
        id: p.id,
        name: p.title,
        description: p.description,
        price: p.price,
        discount: p.discount,
        category: p.category_id,
        image: p.image,
        type: p.portal,
        rating: 4.8,
        reviews: 124,
        features: []
      }));
    }
  } catch (err) {
    console.error('Supabase fetch error:', err);
  }
  return window.db.products;
};


// Check if user is logged in (Supabase)
document.addEventListener('DOMContentLoaded', async () => {
  if (!window.supabase) return;
  
  try {
    const { data: { session } } = await window.supabase.auth.getSession();
    const currentUser = session?.user;
    
    const loginLinks = document.querySelectorAll('a[href="login.html"]');
    const profileLinks = document.querySelectorAll('a[href="profile.html"]');
    
    if (currentUser) {
      const avatarUrl = currentUser.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=' + (currentUser.user_metadata?.full_name || 'User');
      
      loginLinks.forEach(btn => {
        if (btn.classList.contains('btn')) {
          btn.innerHTML = `<img src="${avatarUrl}" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-primary); display: block;">`;
          btn.href = 'profile.html';
          btn.style.padding = '0';
          btn.style.background = 'transparent';
          btn.style.border = 'none';
        } else {
          // Bottom nav or other links
          const span = btn.querySelector('span');
          if(span) span.textContent = 'Profile';
          else btn.textContent = 'Profile';
          btn.href = 'profile.html';
        }
      });
    } else {
      profileLinks.forEach(btn => {
        if (btn.classList.contains('btn')) {
          btn.innerHTML = `<i class="fa-solid fa-user"></i> Login`;
          btn.href = 'login.html';
          btn.style.padding = '';
          btn.style.background = '';
          btn.style.border = '';
        } else {
          const span = btn.querySelector('span');
          if(span) span.textContent = 'Login';
          else btn.textContent = 'Login';
          btn.href = 'login.html';
        }
      });
    }
  } catch(e) {
    console.error("Session fetch error", e);
  }
});

// ==========================================
// CART LOGIC
// ==========================================
window.getCart = () => {
  const cart = localStorage.getItem('cart_digital');
  return cart ? JSON.parse(cart) : [];
};

window.addToCart = (productId) => {
  const cart = window.getCart();
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem('cart_digital', JSON.stringify(cart));
  window.updateCartBadge();
  
  // Optional: show a quick toast or UI feedback
  const btn = event.currentTarget;
  if (btn) {
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
    btn.style.backgroundColor = 'var(--color-success)';
    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.style.backgroundColor = '';
    }, 1500);
  }
};

window.updateCartBadge = () => {
  const cart = window.getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Update desktop navbar badge
  const desktopBadge = document.querySelector('.navbar .fa-cart-shopping + .badge');
  if (desktopBadge) {
    desktopBadge.textContent = totalItems;
    desktopBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
};

document.addEventListener('DOMContentLoaded', window.updateCartBadge);

window.showLoginPopup = () => {
  let modal = document.getElementById('login-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);';
    modal.innerHTML = `
      <div style="background: var(--color-surface); padding: 2rem; border-radius: var(--radius-lg); max-width: 400px; width: 90%; text-align: center; box-shadow: var(--shadow-xl); border: 1px solid var(--color-border);">
        <i class="fa-solid fa-lock" style="font-size: 3rem; color: var(--color-primary); margin-bottom: 1rem;"></i>
        <h2 style="margin-bottom: 1rem;">Login Required</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: 2rem;">Please login or sign up to continue to payment.</p>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <a href="login.html" class="btn btn-primary" style="width: 100%;">Login to Continue</a>
          <a href="signup.html" class="btn btn-outline" style="width: 100%;">Create an Account</a>
          <button class="btn" style="border: none; margin-top: 0.5rem; text-decoration: underline; background: transparent; color: var(--color-text);" onclick="document.getElementById('login-modal').style.display='none'">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';
};

window.showEmptyCartPopup = () => {
  let modal = document.getElementById('empty-cart-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'empty-cart-modal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);';
    modal.innerHTML = `
      <div style="background: var(--color-surface); padding: 2rem; border-radius: var(--radius-lg); max-width: 400px; width: 90%; text-align: center; box-shadow: var(--shadow-xl); border: 1px solid var(--color-border);">
        <i class="fa-solid fa-cart-arrow-down" style="font-size: 3rem; color: var(--color-text-muted); margin-bottom: 1rem;"></i>
        <h2 style="margin-bottom: 1rem;">Cart is Empty</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: 2rem;">You need to add some products to your cart before you can check out.</p>
        <button class="btn btn-primary" style="width: 100%;" onclick="document.getElementById('empty-cart-modal').style.display='none'">Okay</button>
      </div>
    `;
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';
};
