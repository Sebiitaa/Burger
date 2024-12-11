const prices = {
    starters: { "chicken wings": 7, "cheese pops": 6, salad: 6, chips: 6 },
    mains: { crispy: 8, pecadora: 8, "the donut": 8, "the hulk": 8, "super hot": 8 },
    drinks: { "batido fresa": 8, "batido vainilla": 8, "batido chocolate": 8, "soda de cola": 7, "soda de naranja": 7, "soda de limon": 7 },
    combos: { entrante: 60, principal: 70 },
    discounts: {
        LSPD: { main: 65, individualDiscount: 1 },
        FIB: { main: 65, individualDiscount: 1 },
        SAFD: { main: 65, individualDiscount: 1 },
        BCSO: { main: 65, individualDiscount: 1 },
        SAMS: { main: 65, individualDiscount: 1 },
        BENNYS: { main: 60, entrante: 50, individualDiscount: 1 },
        "24/7": { main: 65, entrante: 55 },
        STARWALKS: { main: 65, entrante: 55 },
    },
};

const comboFoods = [];
const comboDrinks = [];
const purchases = [];

function populateComboProducts() {
    const type = document.getElementById("combo-type").value;
    const foodSelect = document.getElementById("combo-product-food");
    const drinkSelect = document.getElementById("combo-product-drink");

    foodSelect.innerHTML = "";
    drinkSelect.innerHTML = "";

    const foodOptions = type === "entrante" ? prices.starters : prices.mains;
    const drinkOptions = prices.drinks;

    for (const food in foodOptions) {
        const option = document.createElement("option");
        option.value = food;
        option.textContent = `${food} ($${foodOptions[food]})`;
        foodSelect.appendChild(option);
    }

    for (const drink in drinkOptions) {
        const option = document.createElement("option");
        option.value = drink;
        option.textContent = `${drink} ($${drinkOptions[drink]})`;
        drinkSelect.appendChild(option);
    }
}

// Similar functions for individual handling...

document.getElementById("combo-type").addEventListener("change", populateComboProducts);
