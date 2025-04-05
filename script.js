const coffeeDescriptions = {
    "Espresso+Milk+Foam": "Cappuccino: A classic coffee with espresso, steamed milk, and foam. Creamy and balanced!",
    "Espresso+Milk": "Latte: Smooth and comforting espresso with lots of steamed milk.",
    "Espresso+Milk+Chocolate": "Mocha: Espresso meets rich chocolate and creamy milk sweet indulgence!",
    "Espresso+Caramel": "Caramel Macchiato: Espresso blended with milk and topped with caramel sweetness.",
    "Espresso+Vanilla": "Vanilla Latte: A smooth and aromatic coffee with vanilla and milk.",
    "Milk+Chocolate": "Chocolate Milk: Creamy milk mixed with rich chocolate—a timeless favorite!",
    "Espresso+Foam": "Espresso Macchiato: Strong espresso with just a hint of foam on top.",
    "Espresso+Whipped Cream": "Affogato: Espresso topped with sweet whipped cream—a dessert-like treat.",
    "Espresso+Caramel+Vanilla": "Caramel Vanilla Latte: Sweet caramel paired with smooth vanilla for a luxurious drink.",
};

const sliders = document.querySelectorAll('input[type="range"]');
const fillLevel = document.getElementById('fill-level');

// Update mug fill based on slider values
function updateMugFill() {
    let totalFill = Array.from(sliders).reduce((sum, slider) => {
        return sum + parseInt(slider.value); // Sum slider values
    }, 0);

    fillLevel.style.height = `${Math.min(totalFill, 100)}%`; // Cap the mug fill at 100%
}

// Generate coffee based on slider values
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

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    sliders.forEach(slider => {
        slider.addEventListener('input', updateMugFill); // Update fill level in real-time
    });

    document.getElementById('generate-coffee').addEventListener('click', generateCoffee); // Generate coffee when button is clicked
});