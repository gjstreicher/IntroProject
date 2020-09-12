const searchBar = document.querySelector("#searchBar");
const content = document.querySelector("main .content");
const queryOptions = ["carrot","broccoli","asparagus","cauliflower","corn","cucumber","green pepper","lettuce","mushrooms",
    "onion","potato","pumpkin","red pepper","tomato","beetroot","brussel sprouts","peas","zucchini",
    "radish","sweet potato","artichoke","leek","cabbage","celery","chili","garlic","basil","coriander",
    "parsley","dill","rosemary","oregano","cinnamon","saffron","green bean","bean","chickpea","lentil",
    "apple","apricot","avocado","banana","blackberry","blackcurrant","blueberry","boysenberry","cherry",
    "coconut","fig","grape","grapefruit","kiwifruit","lemon","lime","lychee","mandarin","mango","melon",
    "nectarine","orange","papaya","passion fruit","peach","pear","pineapple","plum","pomegranate","quince",
    "raspberry","strawberry","watermelon","salad","pizza","pasta","popcorn","lobster","steak","bbq",
    "pudding","hamburger","pie","cake","sausage","tacos","kebab","poutine","seafood","chips","fries",
    "masala","paella","som tam","chicken","toast","marzipan","tofu","ketchup","hummus","chili",
    "maple syrup","parma ham","fajitas","champ","lasagna","poke","chocolate","croissant","arepas",
    "bunny chow","pierogi","donuts","rendang","sushi","ice cream","duck","curry","beef","goat","lamb",
    "turkey","pork","fish","crab","bacon","ham","pepperoni","salami","ribs"];

let matchingQueries = [];
let queryLength = 0;


let foodUrl = new URL("https://forkify-api.herokuapp.com/api/search");

let foodReqParams = {
	method: "GET",
	headers: {
		'content-type': 'application/json'
    }
};

const analyzeQueries = () => {
    clearFoodPage();

    const queries = matchingQueries;

    console.log("Matching:", queries.length);

    if ((queries.length != 0) && (queries.length <= 4)) {
        fetchRecipes();
    }
}

const fetchRecipes = async() => {
    const queries = matchingQueries;

    const responsePromises = queries.map(query => {
        let foodGetParams = {
            q: query
        }

        console.log(query);

        foodUrl.search = new URLSearchParams(foodGetParams);

        return fetch(foodUrl, foodReqParams);  
    });

    const responses = await Promise.all(responsePromises);

    const resultPromises = responses.map(response => response.json());
    const results = await Promise.all(resultPromises);

    results.forEach(result => appendFoodPage(result));
    console.log(queries);
}

const clearFoodPage = () => {
    content.innerHTML = "";
}

const appendFoodPage = (foodData) => {
    foodData.recipes.forEach(recipe => pushRecipe(recipe));
}

const pushRecipe = (recipe) => {
    let contentHTML = content.innerHTML;
    contentHTML += `<div class="recipe">
                    <img src="${recipe.image_url}" alt="Image pending...">

                    <div class="rec-info">
                        <h3 class="rec-title">${recipe.title}</h2>
                    </div>
                </div>`

    content.innerHTML = contentHTML;
}

const testMethod = () => {
    console.log("Test Method Successfully Run");
}

searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value;

    matchingQueries = queryOptions.filter(query => {
        return query.includes(searchString);
    });

    let newLength = matchingQueries.length;

    if (newLength != queryLength) {
        queryLength = newLength;

        analyzeQueries();
    }
});
