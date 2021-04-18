'use strict';

let arrayOfProducts =[];
let imageOne;
let imageTwo;
let imageThree;

let firstImage =document.getElementById('firstImage');
let middleImage =document.getElementById('middleImage');
let lastImage = document.getElementById('lastImage')

//Constructor function of the products objects

function Product (name,picturePath){
    this.name= name;
    this.picturePath = picturePath;
    this.timesShown = 0 
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
new Product("dog duck","img/dog-duck.jpg");
new Product("dragon","img/dragon.jpg");
new Product("pen", "img/pen.jpg");
new Product("pet sweep","img/pet-sweep.jpg");
new Product("scissors", "img/scissors.jpg");
new Product("shark","img/shark.jpg");
new Product("sweep","img/sweep.png");
new Product("tauntaun","img/tauntaun.jpg");
new Product("unicorn","img/unicorn.jpg");
new Product("usb","img/usb.gif");
new Product("water can","img/water-can.jpg");
new Product("wine glass","img/wine-glass.jpg");

//console.log(arrayOfProducts);

//random function:
function randomNumber(){
    let random = Math.floor(arrayOfProducts.length*Math.random());
    return random;
}


function generateRandomImages(){
    while(imageOne === imageTwo || imageTwo ===imageThree || imageOne === imageThree){
        imageOne = arrayOfProducts[randomNumber()];
        imageTwo = arrayOfProducts[randomNumber()];
        imageThree = arrayOfProducts[randomNumber()];
        console.log(imageThree,imageOne,imageTwo)
    }
    firstImage.setAttribute('src', imageOne.picturePath);
    middleImage.setAttribute('src', imageTwo.picturePath);
    lastImage.setAttribute('src', imageThree.picturePath);

}

randomNumber();
generateRandomImages();