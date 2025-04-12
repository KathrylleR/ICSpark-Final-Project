const coffeeDescriptions = {
    "Chocolate Milk": "Chocolate Milk: A creamy delight with 70% Milk and 30% Chocolate. While not a coffee drink, it's a universally loved treat offering rich, nostalgic comfort.",
    "Cappuccino": "Cappuccino: A classic coffee made with approximately 30% Espresso, 50% Milk, and 20% Foam. Creamy and balanced! Originating from Italy, its name comes from the Capuchin friars, inspired by the color of their robes.",
    "Latte": "Latte: A smooth and comforting drink with about 20% Espresso, 70% Milk, and 10% Foam. 'Latte' means 'milk' in Italian, and it became popular in the U.S. during the 1980s coffee culture boom.",
    "Mocha": "Mocha: A sweet and indulgent blend of 25% Espresso, 50% Milk, and 25% Chocolate. Named after the Yemeni port city of Mocha, famed for its unique coffee beans with chocolatey undertones.",
    "Caramel Macchiato": "Caramel Macchiato: Made with around 30% Espresso, 50% Milk, and 20% Caramel for a sweet finish. Introduced by Starbucks in 1996, it quickly became an iconic modern coffee drink.",
    "Vanilla Latte": "Vanilla Latte: A smooth and aromatic coffee crafted with 30% Espresso, 60% Milk, and 10% Vanilla. This variation of the latte is beloved for its warm, sweet notes and versatility.",
    "Affogato": "Affogato: A delightful dessert-like coffee featuring 50% Espresso and 50% Whipped Cream. Originating in Italy, it literally means 'drowned' because of the espresso poured over ice cream."
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

// Tolerance percentage for matching coffee blends
const tolerance = 0.3;

// Update mug fill appearance
function updateMugFill() {
    const selectedSliders = Array.from(sliders).filter(slider => parseInt(slider.value) > 0);
    let totalFill = 0;

    const gradientColors = selectedSliders.map(slider => {
        const percentage = parseInt(slider.value);
        totalFill += percentage;
        return `${coffeeColors[slider.id]} ${totalFill}%`;
    });

    if (gradientColors.length === 1) {
        fillLevel.style.background = `linear-gradient(to top, ${gradientColors[0]}, ${gradientColors[0]})`;
    } else if (gradientColors.length > 1) {
        fillLevel.style.background = `linear-gradient(to top, ${gradientColors.join(", ")})`;
    } else {
        fillLevel.style.background = "none";
    }

    fillLevel.style.height = `${Math.min(totalFill, 100)}%`;

    sliders.forEach(slider => {
        const valueDisplay = document.getElementById(`${slider.id}-value`);
        if (valueDisplay) {
            valueDisplay.textContent = `${slider.value}%`;
        }
    });
}

// Generate coffee based on slider input
function generateCoffee() {
    const selectedSliders = Array.from(sliders).filter(slider => parseInt(slider.value) > 0);

    if (selectedSliders.length === 0) {
        document.getElementById('result').textContent = "Oops! You didn’t select any ingredients. Adjust the sliders to create your coffee!";
        return;
    }

    const userBlend = {};
    selectedSliders.forEach(slider => {
        userBlend[slider.id] = parseInt(slider.value);
    });

    let closestMatch = null;
    let smallestDifference = Infinity;

    // Find the closest matching coffee type
    for (const [coffeeName, coffeeDescription] of Object.entries(coffeeDescriptions)) {
        const targetBlend = {};
        const percentages = coffeeDescription.match(/\d+%/g);
        const ingredients = Object.keys(coffeeColors);
        if (percentages) {
            percentages.forEach((percentage, index) => {
                targetBlend[ingredients[index]] = parseInt(percentage.replace('%', ''));
            });
        }

        // Calculate the total difference between user blend and target blend
        let totalDifference = 0;
        for (const ingredient of Object.keys(coffeeColors)) {
            const userPercentage = userBlend[ingredient] || 0;
            const targetPercentage = targetBlend[ingredient] || 0;
            totalDifference += Math.abs(userPercentage - targetPercentage);
        }

        // Check if this coffee is the closest match so far
        if (totalDifference < smallestDifference) {
            closestMatch = coffeeName;
            smallestDifference = totalDifference;
        }
    }

    // Display the result with the coffee description
    if (closestMatch) {
        const coffeeDescription = coffeeDescriptions[closestMatch];
        document.getElementById('result').textContent = `Your blend is similar to: ${closestMatch}\n\nDescription: ${coffeeDescription}`;
    } else {
        document.getElementById('result').textContent = "Couldn't find a similar coffee type. Try adjusting your blend!";
    }
}

function suggestRandomCoffee() {
    const coffeeNames = Object.keys(coffeeDescriptions);
    const randomIndex = Math.floor(Math.random() * coffeeNames.length);
    const randomCoffee = coffeeNames[randomIndex];
    const coffeeDescription = coffeeDescriptions[randomCoffee];

    // Extract ingredient hints based on percentages
    const hint = [];
    const percentages = coffeeDescription.match(/\d+%/g);
    const ingredients = Object.keys(coffeeColors);
    if (percentages) {
        percentages.forEach((percentage, index) => {
            const ingredient = ingredients[index];
            hint.push(`${percentage} ${ingredient}`);
        });
    }

    const hintText = hint.length > 0 ? `Hint: Mix ${hint.join(", ")}.` : "Hint: Explore the flavors and experiment!";
    
    document.getElementById('suggestions').textContent = `How about trying: ${randomCoffee}?\n\n${hintText}`;
}

document.addEventListener('DOMContentLoaded', () => {
    sliders.forEach(slider => slider.addEventListener('input', updateMugFill));
    document.getElementById('generate-coffee').addEventListener('click', generateCoffee);
    document.getElementById('suggest-random-coffee').addEventListener('click', suggestRandomCoffee);
});