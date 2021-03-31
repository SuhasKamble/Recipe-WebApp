// Selectors 
const mealContainer = document.querySelector('.meal-container');
const favContainer = document.querySelector('.fav-container');
const popup = document.querySelector('.popup');
const msg = document.querySelector('.msg');
const searchBtn = document.getElementById("searchBtn");
const mealInfoContainer = document.querySelector(".meal-info-container")

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
    console.log(resData.meals[0]);   
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

</div>

`
const img = meal.querySelector('img');
const title = meal.querySelector('h4')
img.addEventListener("click",()=>{
    showMealInfo(mealData)
})

title.addEventListener("click",()=>{
    showMealInfo(mealData)
})
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
        fetchFavMeals()
    }
    else{
        btn.classList.remove("active");
        removeToLs(mealData.idMeal)
        popup.classList.add("show");
        msg.textContent = "Removed from Fav";
        setTimeout(()=>{
            popup.classList.remove("show")
        },2000)
       fetchFavMeals()
    }

 
    
})
mealContainer.appendChild(meal)
}

function showFavRecipe(mealData){
    const favItem = document.createElement('div');
    favItem.classList.add("fav-item")
    favItem.innerHTML=`<div class="main_body"><img src="${mealData.strMealThumb}" alt="Recipe">
    <p class="small">${mealData.strMeal.substring(0,10)}...</p>
    </div>
    <button class="del-btn"><i class="fas fa-times"></i></button>
    `
    favContainer.appendChild(favItem)

    const btn = favItem.querySelector(".del-btn");
    btn.addEventListener("click",()=>{
        removeToLs(mealData.idMeal);
        fetchFavMeals()
    })
    const main_div =favItem.querySelector(".main_body");
    main_div.addEventListener("click",()=>{
        showMealInfo(mealData)
    })
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






 async  function fetchFavMeals() {
    // clean the container
    favContainer.innerHTML = "";

    const mealIds = getToLs();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        console.log("IDS",mealId)
        try{
         
    
            showFavRecipe( getRecipeById(mealId))
        }catch(e){
            console.log(e)
        }
       ;
    }
}


function showMealInfo(mealData){
    mealInfoContainer.innerHTML = ""
    const mealInfo = document.createElement("div")
    mealInfo.classList.add("meal-info");

    mealInfo.innerHTML=`  <div class="meal-info">
    <button class="del-pop"><i class="fas fa-times"></i></button>
    <h2>Meal Info</h2>
    <div class="meal-info-header">
        <img src="${mealData.strMealThumb}" alt="">
    </div>
    <div class="meal-info-body">
        <p>${mealData.strInstructions}</p>
    </div>`

    const btn = mealInfo.querySelector(".del-pop");
    btn.addEventListener("click",()=>{
        mealInfoContainer.classList.add('hidden')
    })

    mealInfoContainer.appendChild(mealInfo);
    mealInfoContainer.classList.remove("hidden")
}