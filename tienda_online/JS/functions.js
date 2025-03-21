document.addEventListener('DOMContentLoaded', function () {
    const renderProduct = (product) => {
        const productCard = document.createElement('div');
        const imgContainer = document.createElement('figure');
        const img = document.createElement('img');
        const h3Title = document.createElement('h3');
        const pDescription = document.createElement('p');
        const pPrice = document.createElement('p');
        const addToCartBtn = document.createElement('button');

        productCard.classList.add('product-card');
        imgContainer.classList.add('product-img');
        h3Title.classList.add('product-title');
        pDescription.classList.add('product-description');
        pPrice.classList.add('product-price');
        addToCartBtn.classList.add('add-to-cart-button');

        productCard.id = product.id;

        imgContainer.appendChild(img);
        img.src = product.image;
        img.alt = product.name;

        h3Title.textContent = product.name;
        pDescription.textContent = product.description;
        pPrice.textContent = `€${product.price}`; 
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.id = product.id;

        productCard.append(imgContainer, h3Title, pDescription, pPrice, addToCartBtn);
        return productCard;
    };

    const renderAllProducts = (products) => {
        const productsSection = document.querySelector('.products-container');
        productsSection.innerHTML = '';

        products.forEach((product) => {
            productsSection.appendChild(renderProduct(product));
        });
    };

    /* Funciones del carrito  */

    const addToCart = (cart, id) => {
        let itemIndex = cart.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity++;
        } else {
            cart.push({ id: id, quantity: 1 });
        }
        printCart(cart);

        const cartContainer = document.querySelector('.cart-container');
        if (cartContainer.classList.contains('hidden')) cartContainer.classList.remove('hidden');
    };

    const printCart = (cart) => {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = '';

        let total = 0;

        for (const item of cart) {
            const productFound = products.find((product) => product.id == item.id);

            const itemContainer = document.createElement('div');
            itemContainer.classList.add('item-cart-container');

            const itemDetail = document.createElement('p');
            itemDetail.textContent = `${productFound.name} - €${productFound.price} x ${item.quantity}`; 

            const btnsContainer = document.createElement('div');
            btnsContainer.classList.add('btns-container');

            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Delete';
            eliminarBtn.classList.add('eliminar-btn');

            const restBtn = document.createElement('button');
            restBtn.textContent = '-';
            restBtn.classList.add('cantidad-btn');

            const addBtn = document.createElement('button');
            addBtn.textContent = '+';
            addBtn.classList.add('cantidad-btn');

            btnsContainer.append(eliminarBtn, restBtn, addBtn);

            itemContainer.append(itemDetail, btnsContainer);
            cartItems.appendChild(itemContainer);

            total += Number(productFound.price) * Number(item.quantity);
        
            /* Event listeners para eliminar y modificar cantidad */
            eliminarBtn.addEventListener('click', () => {
                cart = cart.filter((item) => item.id != productFound.id);
                printCart(cart);
            });

            addBtn.addEventListener('click', () => {
                const itemIndex = cart.findIndex((item) => item.id == productFound.id);
                cart[itemIndex].quantity++;
                printCart(cart);
            });

            restBtn.addEventListener('click', () => {
                const itemIndex = cart.findIndex((item) => item.id == productFound.id);
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                    printCart(cart);
                }
            });
            
        }

        const totalAmount = document.querySelector('.cart-total');
        totalAmount.textContent = `Total: €${total}`; 
    };

    /* Event listeners para vaciar y comprar */ 
    const emptyCartBtn = document.querySelector('.empty-btn');
    emptyCartBtn.addEventListener('click', () => {
        cart = [];
        printCart(cart);
    });

    const buyBtn = document.querySelector('.buy-btn');
    buyBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Cart is empty');
        } else {
            alert('Thank you for your purchase!');
            cart = [];
            printCart(cart);
        }
    });
  

    /* Resto del código */

    let cart = [];

    renderAllProducts(products);

    const toggleDisplay = (itemName) => {
        const item = document.querySelector(itemName);
        item.classList.toggle('hidden');
    };

    const cartBtn = document.querySelector('.cart-icon');
    cartBtn.addEventListener('click', () => toggleDisplay('.cart-container'));

    const productCards = document.querySelectorAll('.product-card');
    for (const product of productCards) {
        product.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-button')) {
                addToCart(cart, e.target.id);
            }
        });
    }
});