# 🌿 Green Earth

Green Earth is a responsive tree plantation and eco-awareness web application built with HTML, Tailwind CSS, DaisyUI, and Vanilla JavaScript. The project allows users to browse different tree categories, explore detailed tree information, and manage a simple shopping cart experience.

The application focuses on promoting environmental awareness through a clean and interactive user interface.

---

# 🚀 Features

## 🌱 Tree Categories

* Fetches tree categories dynamically from an external API.
* Users can filter trees based on selected categories.
* Active category highlighting for better user experience.

## 🌳 Tree Cards

* Displays all available trees in a responsive card layout.
* Each card includes:

  * Tree image
  * Tree name
  * Short description
  * Category badge
  * Price
  * Add to Cart button

## 📖 Tree Details Modal

* Clicking on a tree name opens a modal.
* Shows detailed information about the selected tree.
* Includes image, description, category, and pricing.

## 🛒 Shopping Cart

* Add trees to the cart.
* Increase quantity automatically for duplicate items.
* Remove items from the cart.
* Dynamic total price calculation.
* Empty cart message support.

## ⏳ Loading Spinner

* Displays a loading spinner while API data is being fetched.
* Improves user feedback during asynchronous operations.

## 📱 Responsive Design

* Fully responsive layout.
* Optimized for:

  * Mobile devices
  * Tablets
  * Desktop screens

---

# 🛠️ Technologies Used

## Frontend

* HTML5
* CSS3
* Vanilla JavaScript (ES6)

## UI Frameworks & Libraries

* Tailwind CSS
* DaisyUI
* Font Awesome
* Google Fonts (Poppins)

## API

Data is fetched from the Programming Hero API:

* Categories API
* Plants API
* Plant Details API

---

# ⚙️ How It Works

## 1. Load Categories

When the application starts:

```javascript
loadCategories();
```

The app fetches all tree categories from the API and renders category buttons dynamically.

---

## 2. Load All Trees

```javascript
loadAllCards();
```

This loads all available tree cards into the UI.

---

## 3. Filter Trees by Category

```javascript
loadCardsByCategory(categoryId)
```

Fetches and displays trees based on the selected category.

---

## 4. Tree Details Modal

```javascript
loadTreeDetail(plantId)
```

Fetches a single tree’s details and displays them in a modal window.

---

## 5. Cart Management

### Add to Cart

```javascript
addToCart(id, name, price)
```

### Remove from Cart

```javascript
removeFromCart(id)
```

### Update Cart UI

```javascript
updateCartUI()
```

Handles:

* Quantity updates
* Price calculations
* Rendering cart items
* Total amount updates

---

# 🎨 UI Sections

## Navbar

* Responsive navigation menu
* Mobile dropdown support

## Hero Banner

* Promotional banner with call-to-action

## Choose Your Trees

* Main shopping section
* Categories + Tree Cards + Cart

## About Campaign

* Awareness section explaining the mission

## Impact Statistics

* Displays campaign achievements

## Donation Section

* Mock donation form UI

## Footer

* Copyright information

---

# 🔄 API Endpoints Used

## Categories

```bash
https://openapi.programming-hero.com/api/categories
```

## All Plants

```bash
https://openapi.programming-hero.com/api/plants
```

## Plants by Category

```bash
https://openapi.programming-hero.com/api/category/{categoryId}
```

## Plant Details

```bash
https://openapi.programming-hero.com/api/plant/{plantId}
```

---

# 📸 Screenshots

You can add screenshots here after deployment.

Example:

```md
![Homepage Screenshot](./assets/screenshot.png)
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/your-username/green-earth.git
```

## Navigate to the Project Folder

```bash
cd green-earth
```

## Open in Browser

Simply open:

```bash
index.html
```

Or use VS Code Live Server.

---

# 💡 Future Improvements

Potential improvements for the project:

* Local storage cart persistence
* Search functionality
* Sorting by price/category
* User authentication
* Payment integration
* Real donation system
* Backend database support
* Wishlist feature
* Dark mode support
* Improved accessibility

---

# 🧠 Learning Objectives

This project demonstrates:

* DOM manipulation
* Fetch API usage
* Asynchronous JavaScript
* Dynamic UI rendering
* Responsive web design
* State management with arrays
* Event handling
* Modal interaction

---

# 👨‍💻 Author

Developed as a frontend JavaScript project focused on environmental awareness and responsive UI development.

---

# 📄 License

This project is open-source and available for educational purposes.
