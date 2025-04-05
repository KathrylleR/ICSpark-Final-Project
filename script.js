const coffeeDescriptions = {
    "Espresso": "Espresso: The real deal! Strong and bold, served in a small cup. Perfect for when you need a quick, no-fuss caffeine kick.",
    "Espresso+Milk+Foam": "Cappuccino: A classic coffee that’s loved by many! It’s made with espresso, steamed milk, and topped with fluffy foam. Perfect for mornings or whenever you want a balanced, creamy treat.",
    "Espresso+Milk": "Latte: A creamy coffee made with espresso and lots of steamed milk. Like a warm hug in a cup! Add a dash of your favorite syrup for an extra touch.",
    "Espresso+Chocolate": "Mocha: A coffee-chocolate combo! Made with espresso, chocolate syrup, and steamed milk. Sweet and comforting, it's like dessert in a mug.",
    "Espresso+Caramel": "Caramel Macchiato: A coffee treat with espresso, milk, and caramel syrup on top. It’s sweet and fancy, like a dessert and coffee hybrid.",
    "Espresso+Vanilla": "Vanilla Latte: A smooth and sweet drink with espresso, milk, and vanilla syrup. Perfect for anyone who enjoys a subtle, aromatic coffee.",
    "Espresso+Cinnamon": "Cinnamon Coffee: Warm and spicy! Espresso with a sprinkle of cinnamon for cozy vibes. A perfect pairing for chilly mornings.",
    "Espresso+Whipped Cream": "Affogato: Espresso poured over whipped cream for a fun, sweet, and creamy dessert-like coffee. A little indulgence for any time of day.",
    "Espresso+Hazelnut": "Hazelnut Coffee: Espresso with hazelnut syrup for a nutty and aromatic flavor. It’s like a walk through a cozy forest in autumn.",
    "Espresso+Pumpkin Spice": "Pumpkin Spice Latte: Espresso with pumpkin spice syrup, milk, and foam—a fall favorite! A warm and spicy beverage that screams cozy sweaters.",
    "Espresso+Honey": "Honey Coffee: Espresso sweetened with honey for a natural and gentle sweetness. A wholesome and unique coffee experience.",
    "Milk": "Milk: A creamy and smooth drink on its own. Simple and comforting, it’s a classic base or standalone delight.",
    "Milk+Chocolate": "Chocolate Milk: A timeless favorite! Smooth, creamy milk mixed with rich chocolate for a perfectly indulgent treat. Great for any time, whether it's breakfast or a sweet pick-me-up!",
    "Vanilla": "Vanilla: Sweet and fragrant! A little magic to add to any drink or just enjoy the flavor as it is. Perfect for soothing your senses.",
    "Chocolate": "Chocolate: Rich and sweet! Perfect for anyone who loves a little treat. Works wonderfully as a base for indulgent drinks.",
    "Caramel": "Caramel: Sweet and gooey! A delightful golden syrup that’s a joy to savor. Adds a luxurious touch to any drink.",
    "Cinnamon": "Cinnamon: Spicy and warm! A sprinkle of this adds a cozy touch. Great for enhancing both sweet and savory flavors.",
    "Foam": "Foam: Light and fluffy! It’s like a cloud that makes drinks soft and fancy. A barista’s finishing touch.",
    "Whipped Cream": "Whipped Cream: Fluffy and fun! Adds a playful sweetness to any treat. The ultimate topping for a luxurious feel.",
    "Hazelnut": "Hazelnut: A nutty syrup that adds a special aroma and taste to your coffee. Brings warmth and comfort to any cup.",
    "Pumpkin Spice": "Pumpkin Spice: A warm, spiced syrup that brings out cozy fall vibes. A perfect addition for autumn enthusiasts.",
    "Honey": "Honey: Natural and sweet, perfect for a gentle flavor boost. Great for a soothing and wholesome cup of coffee."
};

const coffeeFillLevels = {
    "Espresso": 10,
    "Milk": 20,
    "Foam": 10,
    "Chocolate": 15,
    "Caramel": 10,
    "Vanilla": 10,
    "Cinnamon": 5,
    "Whipped Cream": 5,
    "Hazelnut": 10,
    "Pumpkin Spice": 10,
    "Honey": 10
};

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const fillLevel = document.getElementById('fill-level');

function updateMugFill() {
    const selectedIngredients = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);

    let fillPercentage = selectedIngredients.reduce((total, ingredient) => {
        return total + (coffeeFillLevels[ingredient] || 0); // Default to 0 if ingredient has no fill level
    }, 0);

    fillLevel.style.height = `${Math.min(fillPercentage, 100)}%`; // Cap the fill level at 100%
}

function generateCoffee() {
    const ingredients = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);

    if (ingredients.length === 0) {
        document.getElementById('result').textContent = "Oops! You didn’t select any ingredients. Try adding something to make your coffee creation!";
        return;
    }

    const key = ingredients.join('+');
    console.log("Generated key:", key); // Debugging
    const resultText = coffeeDescriptions[key] || "Wow, you’ve created your own unique coffee blend! Be proud of your creativity!";
    document.getElementById('result').textContent = resultText;
}

// Attach event listeners
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateMugFill);
});

document.getElementById('generate-coffee').addEventListener('click', generateCoffee);