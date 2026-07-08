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
  return window.db.products;
};

// Check if user is logged in (mock)
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('mockUser');
  const loginBtn = document.querySelector('a[href="login.html"].btn');
  const profileBtn = document.querySelector('a[href="profile.html"].btn');
  
  if (currentUser) {
    if (loginBtn) {
      loginBtn.textContent = 'Profile';
      loginBtn.href = 'profile.html';
    }
  } else {
    if (profileBtn) {
      profileBtn.textContent = 'Login';
      profileBtn.href = 'login.html';
    }
  }
});

// ==========================================
// CART LOGIC
// ==========================================
window.getCart = () => {
  const cart = localStorage.getItem('cart_services');
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
  localStorage.setItem('cart_services', JSON.stringify(cart));
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
