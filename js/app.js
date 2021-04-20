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
let chartLables=[];
let chartVotes=[];
let chartTimesShown=[];

let newVotes =0;
let newTimes =0;
let newVotesForDisplay =[];
let newTimesForDisplay =[];

//Constructor function of the products objects
function Product (name,picturePath){
    this.name= name,
    chartLables.push(this.name);
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
    // these conditions in the while loop are to make sure that no identical images appear on the same attempt, and no identical images appear two attempts in row.
    while((imageOne === imageTwo || imageTwo ===imageThree || imageOne === imageThree) || (previousImages.includes(imageOne) || previousImages.includes(imageTwo) ||previousImages.includes(imageThree))){
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
   
    if (counterOfAttempts ===24){
        //Results
        for(let i=0; i<arrayOfProducts.length; i++){
            chartVotes.push(arrayOfProducts[i].votes)
            chartTimesShown.push(arrayOfProducts[i].timesShown)
        
        }
    
        btn = document.createElement('button');
        btn.textContent='View Results';
        viewResultsBtn.appendChild(btn);
        btn.addEventListener('click', displayResults);
        forVoteEvent.removeEventListener('click',vote);
        
    }
    
    //console.log(arrayOfProducts[0].votes);
}



function displayResults(event){
    saveVotesToLS();
    let productList;
    for(let i=0; i<arrayOfProducts.length ;i++){
        productList=document.createElement('li');
        listOfResults.appendChild(productList);
        productList.textContent= `${arrayOfProducts[i].name} had ${newVotesForDisplay[i]}, and was seen ${newTimesForDisplay[i]} times`;
       
    }
    chart();
    btn.removeEventListener('click', displayResults)
}



function chart(){

    let ctx = document.getElementById('canvasId')
    let myChart = new Chart(ctx, { // its an instance 
        type: 'bar',
        data: {
            labels: chartLables, // ['goat away' ,  ... 'sassy goat']
            datasets: [{
                label: 'Number Of votes',
                data: newVotesForDisplay,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderWidth: 1
            },{
              label:'times timesShown',
              data: newTimesForDisplay,
              backgroundColor:[
                "rgb(192,192,192)"
              ],
              borderWidth: 1
            }]
        }
    })
    
}


//localStorage.setItem('votesInLS',JSON.stringify([])); 
//let timesShownInLS = [];


function saveVotesToLS(){

    if(!localStorage.getItem('bag votes')){
        for(let i=0; i<chartVotes.length;i++){
            localStorage.setItem(`${chartLables[i]} votes`,chartVotes[i]);
            newVotesForDisplay.push(chartVotes[i]);
        } 
        //console.log('first time')
        
        for(let i=0; i<chartTimesShown.length;i++){
            localStorage.setItem(`${chartLables[i]} times shown on the screen`,chartTimesShown[i]);
            newTimesForDisplay.push(chartTimesShown[i]);
            } 
        
    }

    else{
       
        for(let i=0; i<chartVotes.length;i++){
            newVotes = parseInt(localStorage.getItem(`${chartLables[i]} votes`))+ chartVotes[i];
            localStorage.setItem(`${chartLables[i]} votes`,JSON.stringify(newVotes));
            newVotesForDisplay[i] = newVotes;
            //console.log(newVotes);
        }
        for(let i=0; i<chartTimesShown.length;i++){
            newTimes = parseInt(localStorage.getItem(`${chartLables[i]} times shown on the screen`))+ chartTimesShown[i];
            localStorage.setItem(`${chartLables[i]} times shown on the screen`,JSON.stringify(newTimes));
            newTimesForDisplay[i] = newTimes;
        }
    }
}
