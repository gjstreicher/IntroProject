
let foodUrl = new URL("https://forkify-api.herokuapp.com/api/search");

let foodReqParams = {
	method: "GET",
	headers: {
		'content-type': 'application/json'
    }
};

const searchRecipes = async (query) => {
    let foodGetParams = {
        q: query
    }

    foodUrl.search = new URLSearchParams(foodGetParams);

    const foodData = await (await fetch(foodUrl, foodReqParams)).json();
    updateFoodPage(foodData);
}

const updateFoodPage = (foodData) => {
    foodData.recipes.forEach(recipe => pushRecipe(recipe));
}

const pushRecipe = (recipe) => {
    const MAIN = document.querySelector("main .content");
    let content = MAIN.innerHTML;
    content += `<div class="recipe">
                    <img src="${recipe.image_url}" alt="Image pending...">

                    <div class="rec-info">
                    <h3 class="rec-title">${recipe.title}</h2>
                </div>
    
                </div>`

    MAIN.innerHTML = content;
}

searchRecipes("pizza");