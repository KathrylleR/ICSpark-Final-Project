document.getElementById('generate-coffee').addEventListener('click', function() {
    const ingredients = [];
    if (document.getElementById('espresso').checked) ingredients.push('Espresso');
    if (document.getElementById('milk').checked) ingredients.push('Milk');
    if (document.getElementById('foam').checked) ingredients.push('Foam');
    if (document.getElementById('chocolate').checked) ingredients.push('Chocolate');
    if (document.getElementById('caramel').checked) ingredients.push('Caramel');
    if (document.getElementById('vanilla').checked) ingredients.push('Vanilla');
    if (document.getElementById('cinnamon').checked) ingredients.push('Cinnamon');
    if (document.getElementById('whipped-cream').checked) ingredients.push('Whipped Cream');

    let resultText = '';
    if (ingredients.includes('Espresso') && ingredients.includes('Milk') && ingredients.includes('Foam')) {
        resultText = 'Cappuccino: A classic Italian coffee with espresso, steamed milk, and foam.';
    } else if (ingredients.includes('Espresso') && ingredients.includes('Milk')) {
        resultText = 'Latte: A creamy coffee made with espresso and steamed milk.';
    } else if (ingredients.includes('Espresso') && ingredients.includes('Chocolate')) {
        resultText = 'Mocha: A rich coffee with espresso, chocolate, and steamed milk.';
    } else if (ingredients.includes('Espresso') && ingredients.includes('Caramel')) {
        resultText = 'Caramel Macchiato: Espresso mixed with milk and topped with caramel syrup.';
    } else if (ingredients.includes('Espresso') && ingredients.includes('Vanilla')) {
        resultText = 'Vanilla Latte: A smooth blend of espresso, steamed milk, and vanilla syrup.';
    } else if (ingredients.includes('Espresso') && ingredients.includes('Cinnamon')) {
        resultText = 'Cinnamon Coffee: A spiced coffee with espresso and a touch of cinnamon.';
    } else if (ingredients.includes('Espresso') && ingredients.includes('Whipped Cream')) {
        resultText = 'Affogato: Espresso poured over whipped cream for a luscious treat.';
    } else if (ingredients.length === 1 && ingredients.includes('Espresso')) {
        resultText = 'Espresso: A pure and strong shot of coffee.';
    } else {
        resultText = 'You’ve created your own unique coffee blend!';
    }

    document.getElementById('result').textContent = resultText;
});