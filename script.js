const close =document.getElementById('close');
const bar =document.getElementById('bar');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}

const filterButtons = document.querySelectorAll('.filter-buttons button')
const fiterableCards = document.querySelectorAll('.fiterable-cards .card')



const filterCards = e => {
    document.querySelector(".active")?.classList.remove("active")
    e.target.classList.add("active")
    fiterableCards.forEach(card => {
        card.classList.add('hide')
        if (card.dataset.name === e.target.dataset.name || e.target.dataset.name == 'all') {
            card.classList.remove('hide')
        }
    })


}

const addHref = e => {
    e.innerHtml('a')
}




filterButtons.forEach(button => button.addEventListener("click", filterCards))

// cart button

document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id'); 
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const productImage = button.getAttribute('data-image');

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            addProductToCart(product);
            appendProductToCartTable(product);
        });
    });

    function addProductToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function appendProductToCartTable(product) {
        const cartTableBody = document.querySelector('#cart tbody');
        let row = document.querySelector(`#cart tbody tr[data-id="${product.id}"]`);

        if (row) {
            // Update existing row
            const quantityInput = row.querySelector('input[type="number"]');
            quantityInput.value = product.quantity;
            const subtotalCell = row.querySelector('td:last-child');
            subtotalCell.textContent = `₹ ${(product.price * product.quantity).toFixed(2)}`;
        } else {
            // Add new row
            row = document.createElement('tr');
            row.setAttribute('data-id', product.id);
            row.innerHTML = `
                <td><i class="far fa-times-circle" data-id="${product.id}"></i></td>
                <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
                <td>${product.name}</td>
                <td>₹ ${product.price.toFixed(2)}</td>
                <td><input type="number" value="${product.quantity}" data-id="${product.id}" min="1"></td>
                <td>₹ ${(product.price * product.quantity).toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
        }

        updateSubtotal();
        addRemoveProductListeners();
        addQuantityChangeListeners();
    }

    function updateCartTable() {
        const cartTableBody = document.querySelector('#cart tbody');
        cartTableBody.innerHTML = ''; // Clear the table before adding items

        cart.forEach(item => {
            appendProductToCartTable(item);
        });

        updateSubtotal();
    }

    function updateSubtotal() {
        const subtotalElement = document.querySelector('#subtotal td:nth-child(2)');
        const subtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
        subtotalElement.textContent = `₹ ${subtotal.toFixed(2)}`;
    }

    function addRemoveProductListeners() {
        const removeButtons = document.querySelectorAll('.far.fa-times-circle');

        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                removeProductFromCart(productId);
            });
        });
    }

    function addQuantityChangeListeners() {
        const quantityInputs = document.querySelectorAll('#cart input[type="number"]');

        quantityInputs.forEach(input => {
            input.addEventListener('change', () => {
                const productId = input.getAttribute('data-id');
                const newQuantity = parseInt(input.value);
                updateProductQuantity(productId, newQuantity);
            });
        });
    }

    function removeProductFromCart(productId) {
        const productIndex = cart.findIndex(item => item.id === productId);
        if (productIndex > -1) {
            cart.splice(productIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTable();
    }

    function updateProductQuantity(productId, newQuantity) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity = newQuantity;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTable();
    }

    function loadCart() {
        updateCartTable();
    }

    loadCart();
});




