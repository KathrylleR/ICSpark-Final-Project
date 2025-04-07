const coffeeDescriptions = {
    "Cappuccino": "Cappuccino: A classic coffee made with approximately 30% Espresso, 50% Milk, and 20% Foam. Creamy and balanced! Originating from Italy, its name comes from the Capuchin friars, inspired by the color of their robes.",
    "Latte": "Latte: A smooth and comforting drink with about 20% Espresso, 70% Milk, and 10% Foam. 'Latte' means 'milk' in Italian, and it became popular in the U.S. during the 1980s coffee culture boom.",
    "Mocha": "Mocha: A sweet and indulgent blend of 25% Espresso, 50% Milk, and 25% Chocolate. Named after the Yemeni port city of Mocha, famed for its unique coffee beans with chocolatey undertones.",
    "Caramel Macchiato": "Caramel Macchiato: Made with around 30% Espresso, 50% Milk, and 20% Caramel for a sweet finish. Introduced by Starbucks in 1996, it quickly became an iconic modern coffee drink.",
    "Vanilla Latte": "Vanilla Latte: A smooth and aromatic coffee crafted with 30% Espresso, 60% Milk, and 10% Vanilla. This variation of the latte is beloved for its warm, sweet notes and versatility.",
    "Affogato": "Affogato: A delightful dessert-like coffee featuring 50% Espresso and 50% Whipped Cream. Originating in Italy, it literally means 'drowned' because of the espresso poured over ice cream.",
    "Chocolate Milk": "Chocolate Milk: A comforting, creamy classic with about 70% Milk and 30% Chocolate. Although not a coffee drink, it's a favorite of all ages, with origins dating back to the 1600s.",
    "Caramel Latte": "Caramel Latte: A luscious blend of 30% Espresso, 60% Milk, and 10% Caramel. This sweet and creamy drink is a modern invention, popularized by coffeehouse culture.",
    "Vanilla Mocha": "Vanilla Mocha: A rich combination of 25% Espresso, 50% Milk, 15% Chocolate, and 10% Vanilla. This twist on the traditional mocha adds an extra layer of flavor with vanilla.",
    "Chocolate Cappuccino": "Chocolate Cappuccino: A bold twist with 30% Espresso, 40% Milk, 20% Foam, and 10% Chocolate. A decadent version of the Italian classic, appealing to chocolate lovers.",
    "Whipped Caramel Delight": "Whipped Caramel Delight: A fun treat with 25% Espresso, 50% Milk, 15% Caramel, and 10% Whipped Cream. A playful and indulgent drink perfect for those with a sweet tooth.",
    "Vanilla Caramel Latte": "Vanilla Caramel Latte: A decadent blend of 25% Espresso, 50% Milk, 10% Vanilla, and 15% Caramel. Combining two classic flavors, this drink offers a luxurious coffee experience.",
    "Chocolate Vanilla Latte": "Chocolate Vanilla Latte: A balanced drink with 20% Espresso, 50% Milk, 20% Chocolate, and 10% Vanilla. A harmonious blend of sweet chocolate and aromatic vanilla.",
    "Foamy Espresso": "Foamy Espresso: A simple yet bold drink with 50% Espresso and 50% Foam for texture. A minimalist choice that highlights the intensity of espresso.",
    "Caramel Mocha": "Caramel Mocha: A decadent mix of 25% Espresso, 50% Milk, 15% Chocolate, and 10% Caramel. This hybrid drink blends mocha's richness with caramel's sweetness.",
    "Vanilla Whipped Cappuccino": "Vanilla Whipped Cappuccino: A creamy, frothy delight with 30% Espresso, 40% Milk, 20% Foam, and 10% Vanilla. A whimsical variation of the cappuccino with added vanilla charm."
};

const coffeeColors = {
    "Espresso": "#6B4F3F", // Dark brown
    "Milk": "#F5F5F5", // Creamy white
    "Foam": "#DCDCDC", // Light gray
    "Chocolate": "#A0522D", // Chocolate brown
    "Caramel": "#DAA520", // Golden caramel
    "Vanilla": "#F3E5AB", // Pale yellow
    "Whipped Cream": "#FFFFFF" // Pure white
};

const sliders = document.querySelectorAll('input[type="range"]');
const fillLevel = document.getElementById('fill-level');

// Update mug fill dynamically
function updateMugFill() {
    const selectedSliders = Array.from(sliders).filter(slider => parseInt(slider.value) > 0);
    let totalFill = 0;

    const gradientColors = selectedSliders.map(slider => {
        const percentage = parseInt(slider.value);
        totalFill += percentage;
        return `${coffeeColors[slider.id]} ${totalFill}%`;
    });

    fillLevel.style.height = `${Math.min(totalFill, 100)}%`; // Cap the fill level at 100%
    fillLevel.style.background = `linear-gradient(to top, ${gradientColors.join(", ")})`;

    // Update slider value indicators
    sliders.forEach(slider => {
        const valueDisplay = document.getElementById(`${slider.id}-value`);
        if (valueDisplay) {
            valueDisplay.textContent = `${slider.value}%`;
        }
    });
}

// Generate coffee based on slider values and a single randomized tip
function generateCoffee() {
    const selectedSliders = Array.from(sliders).filter(slider => parseInt(slider.value) > 0);

    if (selectedSliders.length === 0) {
        document.getElementById('result').textContent = "Oops! You didn’t select any ingredients. Adjust the sliders to create your coffee!";
        return;
    }

    // Create unique blend description
    const uniqueBlend = selectedSliders.map(slider => `${slider.id} (${slider.value}%)`).join(", ");

    // Pool of coffee combinations for a single randomized tip
    const tipsPool = Object.entries(coffeeDescriptions).map(
        ([coffeeName, description]) => `Tip: Try making a ${coffeeName}. ${description}`
    );

    // Select one random tip
    const randomTip = tipsPool[Math.floor(Math.random() * tipsPool.length)];

    // Display unique blend and the single randomized tip
    document.getElementById('result').textContent = `Wow, you’ve created your own unique coffee blend with ${uniqueBlend}!

    Here's an idea for your next creation:
    
    ${randomTip}`;
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    sliders.forEach(slider => slider.addEventListener('input', updateMugFill));
    document.getElementById('generate-coffee').addEventListener('click', generateCoffee);
});