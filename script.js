const sInput = document.querySelector("#sInput")
const mealList = document.querySelector("#mealList")
const sBtn = document.querySelector("#sBtn")
const mContainer = document.querySelector(".modalContainer")
const rCloseBtn = document.querySelector("#rCloseBtn")
const details = document.querySelector(".mDetContent")


sBtn.addEventListener("click",async()=>{
    const ingredient = sInput.value.trim()
    console.log(ingredient)
    if(ingredient){
        const meals = await searchMealsByIngredient(ingredient)
        displayMeals(meals);
    }
})

mealList.addEventListener("click",async(e)=>{
    const card = e.target.closest(".meal-item")
    if(card){
        const mealID=card.dataset.id
        const meal = await getMealDetails(mealID)
        if(meal){
            showMealDetailsPopup(meal)
        }
    }
})

async function searchMealsByIngredient(ingredient){
    try{
        const res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        const data = await res.json()
        return data.meals
    }
    catch(err){
        console.error("error fetching data: ", err)
    }
}


async function getMealDetails(mealID){
    try{
        const res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        const data=await res.json()
        return data.meals[0]
    }
    catch(err){
        console.error('Error fetching meal details',err)
    }
}

function displayMeals(meals){
    mealList.innerHTML=''
    if(meals){                           //if(arr of obj of api){}
        meals.forEach((meal)=>{
            const mealItem=document.createElement('div')
            mealItem.classList.add('meal-item')
            mealItem.dataset.id=meal.idMeal
            mealItem.innerHTML=`
            <img src="${meal.strMealThumb}" alt="">
            <h3>${meal.strMeal}</h3>
            `
            mealList.appendChild(mealItem)
        })
    }
    else{
        mealList.innerHTML='<p>No meals found! Please try another ingredient</p>'

    }

}

function showMealDetailsPopup(meal){
    details.innerHTML=` 
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-img">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    </div>
    <div class="recipe-video">
        <a href="${meal.strYoutube}" target="_blank">Video Tutorial</a>
    </div>
    `
    mContainer.style.display ='flex'
    document.body.classList.add('modal-open')
    
    
}

rCloseBtn.addEventListener("click",closeRecipeModel)

function closeRecipeModel(){
    mContainer.style.display='none'
    document.body.classList.remove('modal-open')
}

sInput.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        performSearch()
    }
})

async function performSearch(){
    const ingredient = sInput.value.trim()
    if(ingredient){
        const meals=await searchMealsByIngredient(ingredient)
        displayMeals(meals)
    }
}

// window.addEventListener('load',()=>{
//     sInput.value='chicken'
//     performSearch()
// })