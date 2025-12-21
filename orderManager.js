  document.querySelector('.order-status')?.addEventListener('click', () => {
    window.location.href = 'order.html';
  });
      document.addEventListener('DOMContentLoaded', function() {
        orderManager.updateBadge();
    });

class OrderManager {
    constructor() {
        this.orders = JSON.parse(localStorage.getItem('coffeeOrders')) || [];
    }
    save() {
        localStorage.setItem('coffeeOrders', JSON.stringify(this.orders));
    }
    addToOrder(name, price, options, quantity = 1) {
        this.orders.push({ id: Date.now(), name, price, options, quantity });
        this.save();
        this.updateBadge();
    }
    getOrders() { return this.orders; }
    clearOrders() {
        this.orders = [];
        this.save();
        this.updateBadge();
    }
    updateBadge() {
        const badge = document.getElementById('orderBadge');
        if (badge) {
            const total = this.orders.reduce((s, o) => s + (o.quantity || 1), 0);
            badge.textContent = total;
            badge.classList.toggle('hidden', !total);
        }
    }
}
window.orderManager = new OrderManager();


const pages = ['capucino.html', 'latte.html', 'americano.html', 'espresso.html'];
const file = location.pathname.split('/').pop();
let current = pages.indexOf(file);

function goPrev() {
    current = (current - 1 + pages.length) % pages.length;
    location.href = pages[current];
}
function goNext() {
    current = (current + 1) % pages.length;
    location.href = pages[current];
}
document.querySelectorAll('.scroll-btn').forEach(b => {
    b.onclick = () => b.querySelector('path').getAttribute('d').includes('18 15') ? goPrev() : goNext();
}); 



  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keydown', e => {
    if(e.key !== 'Enter') return;
    const query = e.target.value.trim().toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      card.style.display = title.includes(query) ? '' : 'none';
    });
  });