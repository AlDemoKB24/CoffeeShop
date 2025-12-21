const coffeeData = {
    'bursting-blueberry': { name: 'Bursting Blueberry', price: 119, image: 'images/Cappuccino/Burst.jpg' },
    'cinnamon-cocoa': { name: 'Cinnamon and Cocoa', price: 159, image: 'images/Cappuccino/CocoCinam.jpg' },
    'caramel-drizzle': { name: 'Drizzled with Caramel', price: 129, image: 'images/Cappuccino/DrizCar.jpg' },
    'matcha': { name: 'Matcha Delight', price: 109, image: 'images/Cappuccino/matcha.jpg' },
    'classic-latte': { name: 'Classic Latte', price: 89, image: 'images/Latte/ClassicLatte.jpg' },
    'vanilla-latte': { name: 'Vanilla Latte', price: 99, image: 'images/Latte/VanillaLatte.jpg' },
    'caramel-latte': { name: 'Caramel Latte', price: 109, image: 'images/Latte/CaramelLatte.jpg' },
    'hazelnut-latte': { name: 'Hazelnut Latte', price: 109, image: 'images/Latte/HazelnutLatte.jpg' },
    'classic-americano': { name: 'Classic Americano', price: 79, image: 'images/Americano/ClassicAmericano.jpg' },
    'iced-americano': { name: 'Iced Americano', price: 89, image: 'images/Americano/IcedAmericano.jpg' },
    'long-black': { name: 'Long Black', price: 85, image: 'images/Americano/LongBlack.jpg' },
    'red-eye': { name: 'Red Eye', price: 95, image: 'images/Americano/RedEye.jpg' },
    'double-americano': { name: 'Double Americano', price: 99, image: 'images/Americano/DoubleAmericano.jpg' },
    'single-espresso': { name: 'Single Espresso', price: 69, image: 'images/Espresso/SingleEspresso.jpg' },
    'double-espresso': { name: 'Double Espresso', price: 89, image: 'images/Espresso/DoubleEspresso.jpg' },
    'ristretto': { name: 'Ristretto', price: 75, image: 'images/Espresso/Ristretto.jpg' }
};

function getCoffeeType() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('coffee') || 'bursting-blueberry';
}

function loadCoffeeData() {
    const coffeeType = getCoffeeType();
    const data = coffeeData[coffeeType];

    if (!data) {
        window.history.back();
        return;
    }

    document.title = `Coffee Shop - ${data.name}`;
    
    document.getElementById('coffeeName').textContent = data.name;
    document.getElementById('coffeePrice').textContent = data.price + ' RUB';
    document.getElementById('coffeeImage').innerHTML = `<img src="${data.image}" alt="${data.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
}

function getSelectedOptions() {
    const size = document.querySelector('.size-btn.active')?.dataset.value || 'short';
    const extras = Array.from(document.querySelectorAll('.extra-btn.active')).map(btn => btn.dataset.value);
    const milk = document.querySelector('.milk-btn.active')?.dataset.value || 'oat';
    return { size, extras, milk };
}

document.querySelectorAll('.size-btn, .extra-btn, .milk-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        if (this.classList.contains('size-btn') || this.classList.contains('milk-btn')) {
            this.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        } else {
            this.classList.toggle('active');
        }
    });
});

let quantity = 1;
document.querySelector('.minus').addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        document.querySelector('.qty-display').textContent = quantity;
    }
});

document.querySelector('.plus').addEventListener('click', () => {
    quantity++;
    document.querySelector('.qty-display').textContent = quantity;
});

document.getElementById('addToOrder').addEventListener('click', function () {
    const coffeeType = getCoffeeType();
    const data = coffeeData[coffeeType];
    const selectedOptions = getSelectedOptions();
    const unitPrice = data.price;
    
    
    const options = {
        size: selectedOptions.size,
        extras: selectedOptions.extras,
        milk: selectedOptions.milk
    };
    
    orderManager.addToOrder(data.name, unitPrice, options, quantity);
    
    
    const referrer = document.referrer;
    const fromPage = referrer.includes('capucino') ? 'capucino.html' :
                     referrer.includes('latte') ? 'latte.html' :
                     referrer.includes('americano') ? 'americano.html' :
                     referrer.includes('espresso') ? 'espresso.html' : 'capucino.html';
    
    alert(`Добавлено в заказ: ${data.name} x${quantity}`);
    window.location.href = fromPage;
});
loadCoffeeData();