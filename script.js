const coffeeDescriptions = {
    "Espresso+Milk+Foam": "Cappuccino: A classic coffee with espresso, steamed milk, and foam. Creamy and balanced!",
    "Espresso+Milk": "Latte: Smooth and comforting espresso with lots of steamed milk.",
    "Espresso+Milk+Chocolate": "Mocha: Espresso meets rich chocolate and creamy milk—sweet indulgence!",
    "Espresso+Caramel": "Caramel Macchiato: Espresso blended with milk and topped with caramel sweetness.",
    "Espresso+Vanilla": "Vanilla Latte: A smooth and aromatic coffee with vanilla and milk.",
    "Milk+Chocolate": "Chocolate Milk: Creamy milk mixed with rich chocolate—a timeless favorite!",
    "Espresso+Foam": "Espresso Macchiato: Strong espresso with just a hint of foam on top.",
    "Espresso+Whipped Cream": "Affogato: Espresso topped with sweet whipped cream—a dessert-like treat.",
    
    "Espresso+Caramel+Vanilla": "Caramel Vanilla Latte: Sweet caramel paired with smooth vanilla for a luxurious drink.",
    "Espresso+Milk+Foam+Chocolate": "Fancy Mocha: Espresso with steamed milk, foam, and rich chocolate—a delightful treat!",
    "Milk+Vanilla+Whipped Cream": "Vanilla Whipped Delight: A creamy and smooth drink with milk, vanilla, and topped with whipped cream.",
    "Espresso+Milk+Caramel+Foam": "Caramel Cappuccino: Espresso, steamed milk, foam, and a touch of caramel sweetness—balanced and aromatic!",
    "Espresso+Chocolate+Milk+Vanilla": "Choco-Vanilla Latte: Rich espresso with chocolate, milk, and a hint of vanilla—perfect for indulgent moments!",
    "Espresso+Foam+Vanilla+Caramel": "Sweet Vanilla Caramel Macchiato: Espresso combined with foam, vanilla, and caramel for a sweet, aromatic delight.",
    
    "Espresso": "Espresso: The real deal! Strong and bold, served in a small cup. Perfect for when you need a quick caffeine boost.",
    "Milk": "Milk: Creamy and smooth on its own—a comforting drink!",
    "Foam": "Foam: Light and fluffy—perfect for softening any coffee.",
    "Chocolate": "Chocolate: Sweet and rich! Adds a touch of indulgence to your drink.",
    "Caramel": "Caramel: Golden syrup that’s sweet and gooey—a joy to savor.",
    "Vanilla": "Vanilla: Aromatic and smooth—perfect for a subtle sweetness.",
    "Whipped Cream": "Whipped Cream: Fluffy and fun—a playful addition to any creation!"
};

const sliders = document.querySelectorAll('input[type="range"]');
const fillLevel = document.getElementById('fill-level');

function updateMugFill() {
    let totalFill = Array.from(sliders).reduce((sum, slider) => {
        return sum + parseInt(slider.value); // Sum slider values
    }, 0);

    fillLevel.style.height = `${Math.min(totalFill, 100)}%`; // Cap the mug fill at 100%
}

function generateCoffee() {
    const selectedIngredients = Array.from(sliders)
        .filter(slider => parseInt(slider.value) > 0) // Include sliders with values greater than 0
        .map(slider => slider.id);

    if (selectedIngredients.length === 0) {
        document.getElementById('result').textContent = "Oops! You didn’t select any ingredients. Adjust the sliders to create your coffee!";
        return;
    }

    const key = selectedIngredients.join('+'); // Combine selected ingredient IDs into a key
    const resultText = coffeeDescriptions[key] || "Wow, you’ve created your own unique coffee blend! Be proud of your creativity!";
    document.getElementById('result').textContent = resultText;
}

document.addEventListener('DOMContentLoaded', () => {
    sliders.forEach(slider => {
        slider.addEventListener('input', updateMugFill); // Update fill level in real-time
    });

    document.getElementById('generate-coffee').addEventListener('click', generateCoffee); // Generate coffee when button is clicked
});