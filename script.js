/* =========================
   CART DATA
========================= */

let cart = [];


/* =========================
   ADD TO CART
========================= */

function addToCart(productName, price) {

    const existingProduct = cart.find(
        item => item.name === productName
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    showNotification(productName + " added to cart!");
}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const cartCount = document.getElementById("cartCount");

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;


    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>Add some fresh groceries!</p>

            </div>
        `;

        document.getElementById("cartTotal").textContent = "₹0";

        return;
    }


    cartItems.innerHTML = "";

    let totalPrice = 0;


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        totalPrice += itemTotal;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>

            <div>

                <strong>
                    ₹${itemTotal}
                </strong>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;

        cartItems.appendChild(cartItem);

    });


    document.getElementById("cartTotal").textContent =
        "₹" + totalPrice;
}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


/* =========================
   CATEGORY FILTER
========================= */

function filterCategory(category) {

    const products =
        document.querySelectorAll(".product-card");

    const buttons =
        document.querySelectorAll(".filter-btn");


    buttons.forEach(button => {

        button.classList.remove("active");

        if (
            button.textContent.trim().toLowerCase() ===
            category.toLowerCase()
        ) {
            button.classList.add("active");
        }

    });


    products.forEach(product => {

        const productCategory =
            product.dataset.category;


        if (
            category === "All" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   SEARCH
========================= */

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener("input", function () {

    const searchValue =
        this.value.toLowerCase().trim();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productName =
            product
                .querySelector("h3")
                .textContent
                .toLowerCase();


        const category =
            product
                .querySelector(".product-category")
                .textContent
                .toLowerCase();


        if (
            productName.includes(searchValue) ||
            category.includes(searchValue)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});


/* =========================
   WISHLIST
========================= */

document.addEventListener("click", function (event) {

    const wishlist =
        event.target.closest(".wishlist");


    if (!wishlist) return;


    const icon =
        wishlist.querySelector("i");


    if (icon.classList.contains("fa-regular")) {

        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");

        icon.style.color = "#e74c3c";

    } else {

        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");

        icon.style.color = "";

    }

});


/* =========================
   SUBSCRIBE
========================= */

function subscribe(event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value;


    if (email) {

        showNotification(
            "Thank you! You are subscribed."
        );


        document.getElementById("email").value = "";

    }

}


/* =========================
   CHECKOUT
========================= */

function checkout() {

    if (cart.length === 0) {

        showNotification(
            "Your cart is empty!"
        );

        return;
    }


    showNotification(
        "Checkout page coming soon!"
    );

}


/* =========================
   NOTIFICATION
========================= */

function showNotification(message) {

    const notification =
        document.createElement("div");


    notification.textContent = message;


    notification.style.position = "fixed";
    notification.style.bottom = "25px";
    notification.style.right = "25px";
    notification.style.background = "#193b28";
    notification.style.color = "white";
    notification.style.padding = "14px 20px";
    notification.style.borderRadius = "8px";
    notification.style.zIndex = "5000";
    notification.style.fontSize = "13px";
    notification.style.fontWeight = "600";
    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.2)";


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.style.opacity = "0";

        notification.style.transform =
            "translateY(10px)";

        notification.style.transition =
            "0.3s";

        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2000);

}


/* =========================
   INITIAL CART
========================= */

updateCart();