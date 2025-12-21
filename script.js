document.addEventListener('DOMContentLoaded', function() {
    function displayOrders() {
        const orderList = document.getElementById('orderList');
        const orderTotal = document.getElementById('orderTotal');
        const orders = orderManager.getOrders();

        if (orders.length === 0) {
            orderList.innerHTML = '<div class="empty-order">Your order is empty</div>';
            orderTotal.innerHTML = '';
            return;
        }

        let html = '';
        const total = orders.reduce((s, o) => s + o.price * (o.quantity || 1), 0);
        const discount = total * 0.15;
        const final   = total - discount;

        orders.forEach(order => {
            html += `
                <div class="order-item">
                    <div>
                        <div class="item-name">${order.name}</div>
                        <div class="item-details">
                            Size: ${order.options?.size || 'short'}, 
                            Milk: ${order.options?.milk || 'oat'},
                            ${order.options?.extras?.length ? 'Extras: ' + order.options.extras.join(', ') : ''}
                        </div>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <div class="item-quantity">x${order.quantity || 1}</div>
                        <div class="item-price">${(order.price * order.quantity).toFixed(2)} RUB</div>
                    </div>
                </div>
            `;
        });

        orderList.innerHTML = html;

        orderTotal.innerHTML = `
            <div class="total-row"><span>Subtotal:</span><span>${total.toFixed(2)} RUB</span></div>
            <div class="total-row"><span>Discount 15%:</span><span>-${discount.toFixed(2)} RUB</span></div>
            <div class="total-row" style="margin-top:10px;">
                <span>Total:</span><span class="total-amount">${final.toFixed(2)} RUB</span>
            </div>
        `;
    }

    document.getElementById('clearOrder').addEventListener('click', function() {
        orderManager.clearOrders();
        displayOrders();
    });

    document.getElementById('checkout').addEventListener('click', function() {
        const total = orderManager.getOrders().reduce((s, o) => s + o.price * (o.quantity || 1), 0);
        const final = total * 0.85;
        alert('Order placed successfully! Total: ' + final.toFixed(2) + ' RUB');
        orderManager.clearOrders();
        displayOrders();
    });

    displayOrders();
});