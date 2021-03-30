// Selectors 
const mealContainer = document.querySelector('.meal-container');
const favContainer = document.querySelector('.fav-container');
const popup = document.querySelector('.popup');
const msg = document.querySelector('.msg');
const searchBtn = document.getElementById("searchBtn");

getRandomRecipe()

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    mealContainer.innerHTML="<h2>Loading...</h2>"
    const search = document.getElementById("search").value;
    mealContainer.innerHTML=`<h2>Search result for ${search}</h2>`;

    getRecipeByName(search)
    console.log("Suhas")
})

// Get A Random Recipe 
async function getRandomRecipe(){
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const resData = await res.json();
    // console.log(resData.meals[0]);
    showRecipe(resData.meals[0],true);
}

// Get A  Recipe by name
async function getRecipeById(mealId){
    const res =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    const resData = await res.json();
    // console.log(resData.meals[0]);   
    showFavRecipe(resData.meals[0]);
}

async function getRecipeByName(term){
    const res =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    const resData = await res.json();
    console.log(resData.meals);   
    for (let i=0;i<resData.meals.length;i++){
        showRecipe(resData.meals[i])
    }
}

// Display The Recipe To Screen 
function showRecipe(mealData,random=false){
    
    const meal = document.createElement("div");
    meal.classList.add('meal');
    meal.innerHTML =`  
     
    <div class="meal-header">
        <img src="${mealData.strMealThumb}" alt="">
       <span>${mealData.strCategory}</span>
        
    </div>
    <div class="meal-body">

<h4>${mealData.strMeal}</h4>

<button class="fav-btn "><i class="far fa-heart"></i></button>
</div>
<p>${mealData.strInstructions.substring(0,200)}...<a target="_blank" href="${mealData.strSource}">Learn More</a></p>
</div>

`
const btn = meal.querySelector('.fav-btn');
btn.addEventListener('click',()=>{
    if(!btn.classList.contains("active")){
        btn.classList.add("active");
        addToLs(mealData.idMeal);
        popup.classList.add("show");
        msg.textContent = "Added To Fav"
        setTimeout(()=>{
            popup.classList.remove("show")
        },2000)
    }
    else{
        btn.classList.remove("active");
        removeToLs(mealData.idMeal)
        popup.classList.add("show");
        msg.textContent = "Removed from Fav";
        setTimeout(()=>{
            popup.classList.remove("show")
        },2000)
    }
    
})
mealContainer.appendChild(meal)
}

function showFavRecipe(mealData){
    const favItem = document.createElement('div');
    favItem.classList.add("fav-item")
    favItem.innerHTML=`<img src="${mealData.strMealThumb}" alt="Recipe">
    <p class="small">${mealData.strMeal.substring(0,10)}...</p>`
    favContainer.appendChild(favItem)
}


// Adding meal Id to localStorage
function addToLs(mealId){
    const mealIds = getToLs();
    console.log(mealIds)
    console.log(mealId)    
    localStorage.setItem("mealIds",JSON.stringify([...mealIds,mealId]));
    console.log(getToLs())
}


// Fetching meal Ids from localStorage
function getToLs(){
    const mealDatas = JSON.parse(localStorage.getItem("mealIds"));
    return mealDatas==undefined?[]:mealDatas;
}


// remove meal Id from localStorage 
function removeToLs(mealId){
    const mealIds = getToLs();
    localStorage.setItem("mealIds",JSON.stringify(mealIds.filter((id)=>id!==mealId)))
    console.log(getToLs())
}

getFavRecipe();
function getFavRecipe(){
    const mealIds = getToLs();
    for(let i=0;i<mealIds.length;i++){
        
        getRecipeById(mealIds[i])
        
    }   
}




function showRecipeName(mealDatas,random=false){
    console.log(mealDatas)
//     const 
    
//     const meal = document.createElement("div");
//     meal.classList.add('meal');
//     meal.innerHTML =`     
//     <div class="meal-header">
//         <img src="${mealData.strMealThumb}" alt="">
//         ${random?"<span>Random Image</span>":""}
        
//     </div>
//     <div class="meal-body">
// <h4>${mealData.strMeal}</h4>
// <button class="fav-btn "><i class="far fa-heart"></i></button>
//     </div>
// </div>
// `
// const btn = meal.querySelector('.fav-btn');
// btn.addEventListener('click',()=>{
//     if(!btn.classList.contains("active")){
//         btn.classList.add("active");
//         addToLs(mealData.idMeal);
//         popup.classList.add("show");
//         msg.textContent = "Added To Fav"
//         setTimeout(()=>{
//             popup.classList.remove("show")
//         },2000)
//     }
//     else{
//         btn.classList.remove("active");
//         removeToLs(mealData.idMeal)
//         popup.classList.add("show");
//         msg.textContent = "Removed from Fav";
//         setTimeout(()=>{
//             popup.classList.remove("show")
//         },2000)
//     }
    
// })
// mealContainer.appendChild(meal)
}
