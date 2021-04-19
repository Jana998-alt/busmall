'use strict';

let counterOfAttempts =0;
let arrayOfProducts =[];
let imageOne;
let imageTwo;
let imageThree;
let previousImages = ['','',''];

let firstImage =document.getElementById('firstImage');
let middleImage =document.getElementById('middleImage');
let lastImage = document.getElementById('lastImage');
let viewResultsBtn = document.getElementById('viewResultsBtn');
let listOfResults = document.getElementById('listOfResults');
let forVoteEvent = document.getElementById('forVoteEvent');
let btn;
//Constructor function of the products objects

function Product (name,picturePath){
    this.name= name,
    this.picturePath = picturePath,
    this.timesShown = 0 ,
    this.votes = 0,
    arrayOfProducts.push(this);
}

//creating product's objects
new Product("bag","../img/bag.jpg");
new Product("banana","img/banana.jpg");
new Product("bathroom","img/bathroom.jpg");
new Product("boots","img/boots.jpg");
new Product("breakfast", "img/breakfast.jpg");
new Product("bubblegum", "img/bubblegum.jpg");
new Product("chair","img/chair.jpg");
new Product("cthulhu","img/cthulhu.jpg");
new Product("dog-duck","img/dog-duck.jpg");
new Product("dragon","img/dragon.jpg");
new Product("pen", "img/pen.jpg");
new Product("pet-sweep","img/pet-sweep.jpg");
new Product("scissors", "img/scissors.jpg");
new Product("shark","img/shark.jpg");
new Product("sweep","img/sweep.png");
new Product("tauntaun","img/tauntaun.jpg");
new Product("unicorn","img/unicorn.jpg");
new Product("usb","img/usb.gif");
new Product("water-can","img/water-can.jpg");
new Product("wine-glass","img/wine-glass.jpg");

//console.log(arrayOfProducts);

//random function:
function randomNumber(){
    let random = Math.floor(arrayOfProducts.length*Math.random());
    return random;
}


function generateRandomImages(){
    imageOne = arrayOfProducts[randomNumber()];
    imageTwo = arrayOfProducts[randomNumber()];
    imageThree = arrayOfProducts[randomNumber()];
    while(imageOne === imageTwo || imageTwo ===imageThree || imageOne === imageThree){
        imageOne = arrayOfProducts[randomNumber()];
        imageTwo = arrayOfProducts[randomNumber()];
        imageThree = arrayOfProducts[randomNumber()];
        //console.log(imageThree,imageOne,imageTwo)
    }
    firstImage.setAttribute('src', imageOne.picturePath);
    middleImage.setAttribute('src', imageTwo.picturePath);
    lastImage.setAttribute('src', imageThree.picturePath);
    imageOne.timesShown++;
    // the next few lines are to make sure than no image comes out two times in row
    previousImages[0]=imageOne;
    previousImages[1]=imageTwo;
    previousImages[3]=imageThree;
    //console.log(imageOne.timesShown);
    imageTwo.timesShown++;
    imageThree.timesShown++;
}

randomNumber();
generateRandomImages();

forVoteEvent.addEventListener('click', vote);

function vote(event){
    //console.log(event.target.id);
    if (event.target.id === 'firstImage'){ 
        imageOne.votes++;
        counterOfAttempts++;
        generateRandomImages();
        //console.log(imageOne.votes)
    }
    else if (event.target.id === 'middleImage'){
        imageTwo.votes++;
        counterOfAttempts++;
        generateRandomImages();
    }
    else if (event.target.id === 'lastImage'){
        imageThree.votes++;
        counterOfAttempts++;
        generateRandomImages();
    }
   
    if (counterOfAttempts ===5){
        //Results
        btn = document.createElement('button');
        btn.textContent='View Results';
        viewResultsBtn.appendChild(btn);
        btn.addEventListener('click', displayResults);
        forVoteEvent.removeEventListener('click',vote);
    }
    
    //console.log(arrayOfProducts[0].votes);
}



function displayResults(event){
    let productList;
    for(let i=0; i<arrayOfProducts.length ;i++){
        productList=document.createElement('li');
        listOfResults.appendChild(productList);
        productList.textContent= `${arrayOfProducts[i].name} had ${arrayOfProducts[i].votes}, and was seen ${arrayOfProducts[i].timesShown}`;
       
    }
    btn.removeEventListener('click', displayResults)
}

