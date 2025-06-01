// Shop-specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Cart functionality
  const cartButtons = document.querySelectorAll('[data-cart-button]');
  cartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const variantId = this.dataset.variantId;
      const quantity = parseInt(this.dataset.quantity || 1);
      
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [{
            id: variantId,
            quantity: quantity
          }]
        })
      })
      .then(response => response.json())
      .then(data => {
        updateCartCount();
        showCartNotification();
      })
      .catch(error => {
        console.error('Error:', error);
        showErrorNotification();
      });
    });
  });

  // Helper functions
  function updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const count = cart.item_count;
        document.querySelectorAll('.cart-count').forEach(el => {
          el.textContent = count;
        });
      });
  }

  function showCartNotification() {
    const notification = document.getElementById('cart-notification');
    if (notification) {
      showNotification(notification);
    }
  }

  function showErrorNotification() {
    const notification = document.getElementById('error-notification');
    if (notification) {
      showNotification(notification);
    }
  }

  function showNotification(notification) {
    notification.classList.add('active');
    setTimeout(() => {
      notification.classList.remove('active');
    }, 3000);
  }

  // Initialize cart functionality
  updateCartCount();
  
  // Handle add to cart form submissions
  document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: new FormData(form)
        });
        
        if (!response.ok) throw new Error('Add to cart failed');
        
        updateCartCount();
        showCartNotification();
      } catch (err) {
        console.error('Error adding to cart:', err);
        showErrorNotification();
      }
    });
  });
}); 