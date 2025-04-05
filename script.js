const coffeeDescriptions = {
    "Espresso": "Espresso: The real deal! Strong and bold, served in a small cup.",
    "Espresso+Milk+Foam": "Cappuccino: A classic coffee that’s loved by many! It’s made with espresso, steamed milk, and topped with fluffy foam. Perfect for mornings!",
    "Espresso+Milk": "Latte: A creamy coffee made with espresso and lots of steamed milk. Like a warm hug in a cup!",
    "Espresso+Chocolate": "Mocha: A coffee-chocolate combo! Made with espresso, chocolate syrup, and steamed milk. Sweet and comforting!",
    "Espresso+Caramel": "Caramel Macchiato: A coffee treat with espresso, milk, and caramel syrup on top. It’s sweet and fancy!",
    "Espresso+Vanilla": "Vanilla Latte: A smooth and sweet drink with espresso, milk, and vanilla syrup. Delicious for everyone!",
    "Espresso+Cinnamon": "Cinnamon Coffee: Warm and spicy! Espresso with a sprinkle of cinnamon for cozy vibes.",
    "Espresso+Whipped Cream": "Affogato: Espresso poured over whipped cream for a fun, sweet, and creamy dessert-like coffee.",
    "Espresso+Hazelnut": "Hazelnut Coffee: Espresso with hazelnut syrup for a nutty and aromatic flavor.",
    "Espresso+Pumpkin Spice": "Pumpkin Spice Latte: Espresso with pumpkin spice syrup, milk, and foam—a fall favorite!",
    "Espresso+Honey": "Honey Coffee: Espresso sweetened with honey for a natural and gentle sweetness.",
    "Milk": "Milk: A creamy and smooth drink on its own. Simple and comforting!",
    "Vanilla": "Vanilla: Sweet and fragrant! A little magic to add to any drink or just enjoy the flavor as it is.",
    "Chocolate": "Chocolate: Rich and sweet! Perfect for anyone who loves a little treat.",
    "Caramel": "Caramel: Sweet and gooey! A delightful golden syrup that’s a joy to savor.",
    "Cinnamon": "Cinnamon: Spicy and warm! A sprinkle of this adds a cozy touch.",
    "Foam": "Foam: Light and fluffy! It’s like a cloud that makes drinks soft and fancy.",
    "Whipped Cream": "Whipped Cream: Fluffy and fun! Adds a playful sweetness to any treat.",
    "Hazelnut": "Hazelnut: A nutty syrup that adds a special aroma and taste to your coffee.",
    "Pumpkin Spice": "Pumpkin Spice: A warm, spiced syrup that brings out cozy fall vibes.",
    "Honey": "Honey: Natural and sweet, perfect for a gentle flavor boost.",
};

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const fillLevel = document.getElementById('fill-level');

function updateMugFill() {
    const selectedIngredients = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const fillPercentage = selectedIngredients * 10; // Assume 10% per ingredient, capped at 100%
    fillLevel.style.height = `${Math.min(fillPercentage, 100)}%`; // Update mug fill level
}

function generateCoffee() {
    const ingredients = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);

    if (ingredients.length === 0) {
        document.getElementById('result').textContent = "Oops! You didn’t select any ingredients. Try adding something to make your coffee creation!";
        return;
    }

    const key = ingredients.join('+'); // Combine selected ingredients into a key
    const resultText = coffeeDescriptions[key] || "Wow, you’ve created your own unique coffee blend! Be proud of your creativity!";
    document.getElementById('result').textContent = resultText;
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateMugFill);
});

document.getElementById('generate-coffee').addEventListener('click', generateCoffee);