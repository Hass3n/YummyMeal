/*******************Asidebar toggle******************** */


$(document).ready(function () {
  $('#aside ').css("left", `-${$('#aside').outerWidth()}`);
  loadpage();
 
    

}


)



function loadpage()
{
  $('.loadscreen').fadeOut(1000,function(){

    $('.loadscreen').removeClass('d-flex')
  });

}


/***************load section********************* */



console.log($('#aside').outerWidth());

$('.icon').on('click', function () {


  if ($('.close-icon').hasClass("d-none")) {

    $("aside").animate({ left: '0px' }, 500);

    $('ul').slideDown('slow')
    $('.close-aside').animate({ left: `${$('#aside').outerWidth()}` }, 500);
    $('.menu').addClass('d-none')
    $('.close-icon').removeClass('d-none');
  }


  else {


    $("aside").animate({ left: `-${$('#aside').outerWidth()}` }, 500);

    $('.close-aside').animate({ left: '0px' }, 500);
    $('.menu').removeClass('d-none')
    $('.close-icon').addClass('d-none');


  }








});




/********************************Apis**************************************** */

let mealRow = document.querySelector('.row-meal');
let mealDetails = document.querySelector('.row-details');
let mainMeal = document.querySelector('.main');
let sectionMeal = document.querySelector('.Meal-details');
let Category = document.querySelector('.row-categ');
let secCatg = document.querySelector('.categ');
let area = document.querySelector('.row-area ');
let secArea = document.querySelector('.area');
let secIngredient = document.querySelector('.Ingradient');
let ingredient = document.querySelector('.row-ingradient');
let mealName = document.querySelector('.Name');
let mealLetter = document.querySelector('.letter');
let secSearch = document.querySelector('.search');
let secForm=document.querySelector('.sec-form');
let submit=document.querySelector('.submitbtn');

let links = document.querySelectorAll('.links ul li');



/*************** Links ************* */

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function (e) {

    $('#aside ').css("left", `-${$('#aside').outerWidth()}`);
    $('.close-aside').animate({ left: '0px' }, 500);
    $('.menu').removeClass('d-none')
    $('.close-icon').addClass('d-none');


    if (i == 0) {

      
    loadpage('d-block');
      secSearch.classList.replace('d-none', 'd-block');
      mainMeal.classList.add('d-none');
      sectionMeal.classList.replace('d-block', 'd-none');
      secCatg.classList.replace('d-block', 'd-none');
      secArea.classList.replace('d-block', 'd-none');
      secIngredient.classList.replace('d-block', 'd-none');
      secForm.classList.replace('d-block', 'd-none');







    }

    else if (i == 1) {

      getCategories();

    }

    else if (i == 2) {
      getArea();
    }

    else if (i == 3) {
      getIngradient();
    }

    else if(i==4)
    {
      secForm.classList.replace('d-none', 'd-block');
      mainMeal.classList.add('d-none');
      sectionMeal.classList.replace('d-block', 'd-none');
      secCatg.classList.replace('d-block', 'd-none');
      secArea.classList.replace('d-block', 'd-none');
      secIngredient.classList.replace('d-block', 'd-none');
      secSearch.classList.replace('d-block', 'd-none');


    }


  });
}


// get Meals when website start
getMeals();




let objMeal = {};
async function getMeals() {
  let urlData = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');

  let jsonData = await urlData.json();

  displayMeal(jsonData['meals'], 'start');


}





// fun to display meals
function displayMeal(objMeal, key) {

  console.log('hii', objMeal);
  let box = ``;

  let length = key == 'start' || key == 'ing' || 'search' ? objMeal.length : 20;

  for (let i = 0; i < length; i++) {


    box += `  <div class="col-sm-12 col-md-3 col-meal " onclick="getDetails('${objMeal[i]['idMeal']}');" >
    <div class="meal-info rounded-3 overflow-hidden position-relative">
      <img src="${objMeal[i]['strMealThumb']}" alt="meal" class="w-100">
      <div class="meal-title   d-flex align-items-center px-2  ">

        <h4 class="fw-bold ">${objMeal[i]['strMeal']}</h4>
      </div>
    </div>
  </div>`

  }


  mealRow.innerHTML = box;
}

// fun to display meal Details 

async function getDetails(id) {




  mainMeal.classList.add('d-none');
  sectionMeal.classList.replace('d-none', 'd-block');

  let urlData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

  let urlJson = await urlData.json();

  displayDetails(urlJson['meals'][0])
  console.log(urlJson);
}



function displayDetails(Objdetails) {


  secSearch.classList.replace('d-block', 'd-none');



  let box = ``;



  box += ` <div class="col-sm-12 col-lg-4">
      <div class="details-image rounded-2 overflow-hidden">
        <img src="${Objdetails['strMealThumb']} " class="w-100 ">
      </div>
      <h3 class="mt-2">${Objdetails['strMeal']}</h3>

      </div>`;


  box += `  <div class="col-sm-12 col-lg-8">`

  box += ` <div class="details-info">`

  box += `   <h2>Instructions</h2>
          <p>
  
          ${Objdetails['strInstructions']}
          </p>`



  box += `<ul class="list-unstyled">`


  box += ` <li class="fw-bold fs-4">Area : <span class="fw-medium">${Objdetails['strArea']}</span></li>
            <li class="fw-bold fs-4">Category : <span class="fw-medium">${Objdetails['strCategory']}</span></li>`


  box += `   <li class="fw-bold fs-4 ">
              Recipes :`;

  box += `<ul class="list-unstyled recipes d-flex gap-3 flex-wrap text-black mt-2"  >`


  for (let i = 1; i <= 20; i++) {

    console.log('here', Objdetails[`strMeasure8`]);


    if (Objdetails[`strMeasure${i}`] != "" && Objdetails[`strIngredient${i}`] != "") {



      box += `  <li class="fw-normal fs-6 rounded-2">${Objdetails[`strMeasure${i}`]}  ${Objdetails[`strIngredient${i}`]} </li>`



    }

  }





  box += `</ul>`


  box += `</li>`

  box += `<li class="fw-bold fs-4 mt-3">Tags :`



  box += `<ul class="list-unstyled tag">`


  if (Objdetails['strTags'] != null) {

    Objdetails['strTags'].split(',').forEach(element => {


      box += `<li class="fw-normal fs-6 rounded-2 mt-3 mb-3 childone me-1 ">${element}</li>`


    });


  }

  box += ` <div class="socila d-flex gap-2 mt-2 ">`


  box += `    <li class="fw-normal fs-6 rounded-2 px-3 py-1"><a href="${Objdetails['strSource']}" class="text-decoration-none text-white">Source</a></li>
    <li class="fw-normal px-3 fs-6 rounded-2 d-flex justify-content-center align-items-center"><a href="${Objdetails['strYoutube']}" class="text-decoration-none text-white">Youtube</a></li>`



  box += `</div>`

  box += `</ul">`;


  box += `</li>`





  box += `</ul>`;


  box += `</div>`;



  box += `</div>`;







  mealDetails.innerHTML = box;
}






/****************categories****************** */
// get categories

async function getCategories() {

  mainMeal.classList.add('d-none');
  secSearch.classList.add('d-none');
  mainMeal.classList.add('d-none');
  sectionMeal.classList.replace('d-block', 'd-none')
  secCatg.classList.replace('d-none', 'd-block');
  secIngredient.classList.replace('d-block', 'd-none');
  secForm.classList.replace('d-block', 'd-none');



  let urlData = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

  let DataJson = await urlData.json();

  console.log('datacatg', DataJson);
  displayCategories(DataJson)



}




// function display ui categories


function displayCategories(ObjCateg) {


  let box = ``;

  for (let i = 0; i < ObjCateg['categories'].length; i++) {
    box += `<div class="col-sm-12 col-md-3 col-catg" onclick="getCategMeal('${ObjCateg['categories'][i]['strCategory']}');">
        <div class="Catg-info rounded-3 overflow-hidden position-relative">
          <img src="${ObjCateg['categories'][i]['strCategoryThumb']}" alt="categ" class="w-100">
          <div class="Categ-title  text-center    ">
    
            <h4 class="fw-bold">${ObjCateg['categories'][i]['strCategory']}</h4>
            <p>${ObjCateg['categories'][i]['strCategoryDescription'].substring(0, 110)}</p>
          </div>
        </div>
      </div>`;
  }




  Category.innerHTML = box;
}



// get Category Meal

async function getCategMeal(mealName) {



  mainMeal.classList.replace('d-none', 'd-block');
  secCatg.classList.replace('d-block', 'd-none');
  let urlData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);

  let urlJson = await urlData.json();

  displayMeal(urlJson['meals'], 'categ');

}



/*****************Get All area */


async function getArea() {

  mainMeal.classList.add('d-none');
  secCatg.classList.add('d-none');
  sectionMeal.classList.add('d-none');
  secArea.classList.replace('d-none', 'd-block');
  secSearch.classList.replace('d-block', 'd-none');

  secIngredient.classList.replace('d-block', 'd-none');
  secForm.classList.replace('d-block', 'd-none');



  let urlData = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

  let DataJson = await urlData.json();


  displayArea(DataJson)


}


// display Area

function displayArea(mealsArea) {

  let box = ``;

  for (let i = 0; i < mealsArea['meals'].length; i++) {
    box += `   <div class="col-sm-12 col-md-3 col-area  " onclick="getFilterArea('${mealsArea['meals'][i]['strArea']}')">
      
        <div class="iteam-area text-white  text-center ">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h4 class="mt-2">${mealsArea['meals'][i]['strArea']}</h4>

        </div>

      </div>`;
  }




  area.innerHTML = box;

}




// filter area 

async function getFilterArea(area) {



  secCatg.classList.replace('d-block', 'd-none');
  mainMeal.classList.replace('d-none', 'd-block');

  sectionMeal.classList.replace('d-block', 'd-none');
  secArea.classList.replace('d-block', 'd-none');

  let urlData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);

  let urlJson = await urlData.json();

  displayMeal(urlJson['meals'], 'area');

}

/****************Get ALL Ingradients**************** */

async function getIngradient() {

  mainMeal.classList.add('d-none');
  secCatg.classList.add('d-none');
  sectionMeal.classList.add('d-none');
  secArea.classList.add('d-none');
  secSearch.classList.replace('d-block', 'd-none');

  secIngredient.classList.replace('d-none', 'd-block');
  secForm.classList.replace('d-block', 'd-none');


  let urlData = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

  let DataJson = await urlData.json();


  displayIngredient(DataJson['meals'])


}

// display Ingredients

function displayIngredient(ObjIngredient) {

  let box = ``;

  for (let i = 0; i < 20; i++) {
    box += `   <div class="col-sm-12 col-md-3 col-area   " onclick="getFilterIngredient('${ObjIngredient[i]['strIngredient']}')">
      
        <div class="iteam-area text-white  text-center ">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h4 class="mt-2">${ObjIngredient[i]['strIngredient']}</h4>
          <p>'${ObjIngredient[i]['strDescription'].substring(0, 108)}'</p>

        </div>

      </div> `
  }




  ingredient.innerHTML = box;

}



// filter Ingradients

async function getFilterIngredient(ingName) {



  secCatg.classList.replace('d-block', 'd-none');
  mainMeal.classList.replace('d-none', 'd-block');

  sectionMeal.classList.replace('d-block', 'd-none');
  secArea.classList.replace('d-block', 'd-none');

  secIngredient.classList.replace('d-block', 'd-none');
  secForm.classList.replace('d-block', 'd-none');


  let urlData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`);

  let urlJson = await urlData.json();

  console.log(urlJson);

  displayMeal(urlJson['meals'], 'ing');

}



/********************Serach************************/



// event meal name 
mealName.addEventListener('keyup', function (e) {

  searchhMealName(e.target.value)
})

// event by letter Meal
mealLetter.addEventListener('keyup', function (e) {
  if (e.key === 'Backspace') {
    searchMealLetter('a');
  }
  else {
    searchMealLetter(e.target.value)

  }
})
// Search by Name
async function searchhMealName(mealName) {


  // append section meal inside search section
  secSearch.appendChild(mainMeal);


  // select section meal
  let searchMeal = document.querySelector('.search .main')
  searchMeal.classList.replace('d-none', 'd-block');

  let urlData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);

  let urlJson = await urlData.json();

  displayMeal(urlJson['meals'], 'search');

}


// search by letter

async function searchMealLetter(letterMeal) {


  // append section meal inside search section
  secSearch.appendChild(mainMeal);


  // select section meal
  let searchMeal = document.querySelector('.search .main')
  searchMeal.classList.replace('d-none', 'd-block');

  let urlData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterMeal}`);

  let urlJson = await urlData.json();

  displayMeal(urlJson['meals'], 'search');

}



/*********************form***************** */


let Name=document.getElementById('userName');
let Email=document.getElementById('userEmail');
let Phone=document.getElementById('userPhone');
let Age=document.getElementById('userAge');
let Password=document.getElementById('userPassword');
let Repassword=document.getElementById('userRepassword');
let flag=false;


Name.addEventListener('input',function(e){


  if(validation(e.target))
  {
    Name.setAttribute('count','1')

    enableButton();
  }



});

Email.addEventListener('input',function(e){

  if(validation(e.target))
    {
      Email.setAttribute('count','1');
      enableButton();
    } 
     

 
 });
 

 Phone.addEventListener('input',function(e){

  if(validation(e.target))
    {
      Phone.setAttribute('count','1');
      enableButton();
    }
 
 });

 
 Age.addEventListener('input',function(e){

  if(validation(e.target))
    {
      Age.setAttribute('count','1');
      enableButton();
    }
     
 
 });
 
 Password.addEventListener('input',function(e){

  if(validation(e.target))
    {
      Password.setAttribute('count','1');
      enableButton();
    }
      
 });

 Repassword.addEventListener('input',function(e){

    if(e.target.value ===Password.value)
    {
       

     
        
          Repassword.setAttribute('count','1');
         
        
          enableButton();
      Repassword.nextElementSibling.classList.replace('d-block','d-none');


     
      
    

    }

    else
    {
      Repassword.nextElementSibling.classList.replace('d-none','d-block');
    }
  

 });






 function validation(element)
 {

  let regex={
    userName:/^[a-z A-Z]*$/,
    userEmail:/^[a-z A-Z 0-9]{1,}(\@)(gmail)(.)(com)$/,
    userPhone:/^(01)[0-25][0-9]{8}$/,
    userAge:/^[1-9][0-9]*$/,
    userPassword:/^(?=.*[A-Za-z])(?=.*\d)[A-Z a-z \d]{8}$/
    
  }

  if(regex[element.id].test(element.value))
    {
     
      element.nextElementSibling.classList.replace('d-block','d-none');
      
  
      return true;
    }
  
    else
    {
      element.nextElementSibling.classList.replace('d-none','d-block');
  
      return false;
    }

 }




function enableButton()
{
  if( Name.hasAttribute('count')&&Email.hasAttribute('count')&&Phone.hasAttribute('count')
    &&Password.hasAttribute('count')&&Repassword.hasAttribute('count')&&Age.hasAttribute('count'))
  {
    submit.removeAttribute('disabled');
  }
}



new WOW().init();
