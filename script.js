document.getElementById('generate-coffee').addEventListener('click', function() {
    const ingredients = [];
    if (document.getElementById('espresso').checked) ingredients.push('Espresso');
    if (document.getElementById('milk').checked) ingredients.push('Milk');
    if (document.getElementById('foam').checked) ingredients.push('Foam');
    if (document.getElementById('chocolate').checked) ingredients.push('Chocolate');

    let resultText = '';
    if (ingredients.includes('Espresso') && ingredients.includes('Milk') && ingredients.includes('Foam')) {
        resultText = 'You made a Cappuccino!';
    } else if (ingredients.includes('Espresso') && ingredients.includes('Milk')) {
        resultText = 'You made a Latte!';
    } else if (ingredients.includes('Espresso') && ingredients.includes('Chocolate')) {
        resultText = 'You made a Mocha!';
    } else if (ingredients.length === 1 && ingredients.includes('Espresso')) {
        resultText = 'You made an Espresso!';
    } else {
        resultText = 'That’s a unique coffee creation!';
    }

    document.getElementById('result').textContent = resultText;
});