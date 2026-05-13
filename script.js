
const cardContainer = document.getElementById("card-container");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalElement = document.getElementById("cart-total");




let cart = []; 


function showSpinner() {
    document.getElementById("loading-spinner").classList.add("show");
}

function hideSpinner() {
    document.getElementById("loading-spinner").classList.remove("show");
}


function loadCategories() {
    showSpinner();

    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            hideSpinner();
            displayCategories(data.categories);
        })
        .catch(err => {
            hideSpinner();
            console.log("Error loading categories:", err);
        });
}


//  Display category buttons in the sidebar 

function displayCategories(categories) {
    const categoriesContainer = document.getElementById("CategoriesContainer");
    categoriesContainer.innerHTML = ""; 

    for (let cat of categories) {
        const catDiv = document.createElement("div");
        catDiv.innerHTML = `
            <button 
                id="cat-${cat.id}" 
                onclick="loadCardsByCategory('${cat.id}')"
                class="category-btn hover:bg-green-200 rounded-md cursor-pointer px-3 py-1 text-sm font-semibold text-left w-full transition">
                ${cat.category_name}
            </button>
        `;
        categoriesContainer.appendChild(catDiv);
    }
}


function loadCardsByCategory(categoryId) {
    showSpinner();

    const allCatBtns = document.querySelectorAll(".category-btn");
    allCatBtns.forEach(btn => btn.classList.remove("bg-[#15803D]", "text-white"));

    const clickedBtn = document.getElementById("cat-" + categoryId);
    if (clickedBtn) {
        clickedBtn.classList.add("bg-[#15803D]", "text-white");
    }

    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            hideSpinner();
            displayCards(data.plants); 
        })
        .catch(err => {
            hideSpinner();
            console.log("Error loading category cards:", err);
        });
}


function loadAllCards() {
    showSpinner();

    const allCatBtns = document.querySelectorAll(".category-btn");
    allCatBtns.forEach(btn => btn.classList.remove("bg-[#15803D]", "text-white"));

    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            hideSpinner();
            displayCards(data.plants); 
        })
        .catch(err => {
            hideSpinner();
            console.log("Error loading all cards:", err);
        });
}


function displayCards(plants) {
    cardContainer.innerHTML = ""; 

    if (!plants || plants.length === 0) {
        cardContainer.innerHTML = `<p class="col-span-3 text-center text-gray-400 py-10">No trees found.</p>`;
        return;
    }

    for (let plant of plants) {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white border border-gray-100 rounded-xl shadow-md p-4 flex flex-col h-full">
                
                <!-- Tree Image -->
                <img class="w-full h-[180px] object-cover rounded-lg mb-3" src="${plant.image}" alt="${plant.name}">
                
                <!-- Tree Name (clickable to open modal) -->
                <button 
                    onclick="loadTreeDetail('${plant.id}')" 
                    class="font-semibold text-left text-[#15803D] hover:underline cursor-pointer text-base mb-1">
                    ${plant.name}
                </button>
                
                <!-- Description -->
                <p class="text-xs text-gray-500 flex-1 mb-3 line-clamp-2">${plant.description}</p>
                
                <!-- Category + Price row -->
                <div class="flex justify-between items-center mb-3">
                    <span class="bg-[#DCFCE7] text-[#15803D] text-xs rounded-md px-2 py-1 font-medium">
                        ${plant.category}
                    </span>
                    <span class="font-semibold text-gray-700">$${plant.price}</span>
                </div>

                <!-- Add to Cart button -->
                <button 
                    onclick="addToCart('${plant.id}', '${plant.name}', '${plant.price}')"
                    class="w-full bg-[#15803D] hover:bg-green-700 transition text-white py-2 rounded-2xl text-sm font-medium cursor-pointer">
                    🛒 Add to Cart
                </button>

            </div>
        `;
        cardContainer.appendChild(card);
    }
}


function loadTreeDetail(plantId) {
    showSpinner();
    fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
        .then(res => res.json())
        .then(data => {
            hideSpinner();
            showTreeDetailModal(data.plants);
        })
        .catch(err => {
            hideSpinner();
            console.log("Error loading tree detail:", err);
        });
}


function showTreeDetailModal(tree) {
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
        <div class="space-y-3">
            
            <!-- Tree Image -->
            <img class="w-full h-[220px] object-cover rounded-xl" src="${tree.image}" alt="${tree.name}">
            
            <!-- Tree Name -->
            <h2 class="text-2xl font-bold text-[#15803D]">${tree.name}</h2>
            
            <!-- Category -->
            <p><span class="font-semibold text-gray-600">Category:</span> 
               <span class="bg-[#DCFCE7] text-[#15803D] text-sm px-2 py-0.5 rounded-md">${tree.category}</span>
            </p>
            
            <!-- Price -->
            <p><span class="font-semibold text-gray-600">Price:</span> 
               <span class="text-[#15803D] font-bold text-lg">$${tree.price}</span>
            </p>
            
            <!-- Description -->
            <p class="text-sm text-gray-600 leading-relaxed">
                <span class="font-semibold text-gray-700">Description: </span>${tree.description}
            </p>

        </div>
    `;

    document.getElementById("tree-detail-modal").showModal();
}


function addToCart(id, name, price) {
    const alreadyInCart = cart.find(item => item.id === id);

    if (alreadyInCart) {
        // If already in cart, just increase the quantity
        alreadyInCart.quantity += 1;
    } else {
        // If new item, add it to the cart array
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price), // Convert price string to a number
            quantity: 1
        });
    }

    updateCartUI();
}


function removeFromCart(id) {
    // Filter out the item with this id
    cart = cart.filter(item => item.id !== id);

    updateCartUI();
}


function updateCartUI() {
    cartItemsContainer.innerHTML = ""; // Clear old cart content

    // If cart is empty, show a message
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <p class="text-gray-400 text-sm text-center py-4">Your cart is empty 🌱</p>
        `;
        cartTotalElement.textContent = "$0.00";
        return;
    }

    let totalPrice = 0;

    // Loop through each cart item and display it
    for (let item of cart) {
        // Calculate the price for this item (price x quantity)
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal; // Add to total

        const cartItemDiv = document.createElement("div");
        cartItemDiv.innerHTML = `
            <div class="bg-[#f0fdf4] p-3 mt-3 rounded-lg flex justify-between items-center gap-2">
                
                <!-- Item info -->
                <div class="flex-1">
                    <p class="font-medium text-sm text-gray-800">${item.name}</p>
                    <p class="text-xs text-gray-400 mt-0.5">$${item.price.toFixed(2)} × ${item.quantity}</p>
                </div>

                <!-- Item subtotal + remove button -->
                <div class="flex items-center gap-2">
                    <span class="text-[#15803D] text-sm font-semibold">$${itemTotal.toFixed(2)}</span>
                    <button 
                        onclick="removeFromCart('${item.id}')"
                        class="text-red-400 hover:text-red-600 font-bold text-lg cursor-pointer leading-none">
                        ×
                    </button>
                </div>

            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    }

    // Show the total price
    cartTotalElement.textContent = "$" + totalPrice.toFixed(2);
}


loadCategories(); // Load the left side category list
loadAllCards();   // Load all tree cards in the middle