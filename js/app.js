/*
 * Declaration of global variables
 */
let card = document.getElementsByClassName('card'); //Creates an HTML Collection of the li elements.
const cards = Array.from(card); //creates an array therefrom.
let deck = document.querySelector('.deck'); //a variable holding the <ul> element.
let matches = new Array(); //an array to hold all matches found.
let count=0;//counting no of open unmatched cards.
let movesCounter=document.querySelector('.moves');//the number of moves elements
let noOfMoves=0;//moves count
movesCounter.innerHTML=noOfMoves;
let starrating = document.querySelector('.stars');//the stars element
let restartbutton = document.querySelector('.restart');//the restart button
let finalstars=3;
let matchedmoves=0;//the number of succesfull matches
let clicked=0;
let interval;
let minutes = document.getElementById("minutes");//timer variables
let seconds = document.getElementById("seconds");
let now = 0, time=0, secs=0, mins=0, clocksecs=0;
let modal = document.querySelector('.modal-content');//modal setup
modal.style.display = 'none';
let modalstatistics = document.getElementById('statistics');


window.onload = function() //let the games begin!
{
   start();
}


function timer() //timer function
{
  now = new Date().getTime();//reset date-time object.
  interval= setInterval(function()
  {
  time = new Date().getTime() - now;//accurately calculate time in milliseconds.
  clocksecs = Math.floor(time / 1000);//calculate seconds.
  secs=clocksecs%60;//reset seconds every minute
  mins = Math.floor(clocksecs/60);//calculate minutes

        let min = Ticking(mins);//format minutes
        let sec = Ticking(secs);//format seconds

        minutes.textContent = min; //show in HTML
        seconds.textContent = ":" + sec;
      }, 1000);
    }


function Ticking(value)//a function for formatting minutes & seconds
{
    if (value < 10)
    {value = "0" + value;}
    return value;
}


function start() //the core function of the game
{

  clearInterval(interval);//stop & reset the timer
  time=0;
  clicked=0;
  matchedmoves=0;
  count = 0;
  noOfMoves = 0;
  matches = [];
  minutes.textContent = "00"; //show in HTML
  seconds.textContent = ":" + "00";
  modal.style.display = "none";//hide modal
  movesCounter.innerHTML = noOfMoves; //insert no of moves
  showstars();
  let newcards = shuffle(cards); // shuffle the cards
  deck.innerHTML = ""; //remove existing <li> elements from ul.
  for (let i = 0; i < newcards.length; i++) //insert the shuffled cards.
  {
    deck.appendChild(newcards[i]); //append the <li> elements one by one.
    newcards[i].classList.remove('show', 'open', 'match'); //reset the board.
  }
  clickcard(); //the event listener function.
  restart(); //the restart event listener.
  }

  function clickcard() //event listener for click.
  {
    deck.addEventListener('click', getClick);

  }

function getClick(evt) // check that the user clicks a card and not the deck.
{
  let cardclass=evt.target;
  if (cardclass.classList=="card")
  openCard(cardclass);
}


function openCard(event) // a function to show the card once clicked.
{

  clicked++;//this sets-off the timer on the first click
  if (clicked==1)
  timer();
  let cardtemp=event;
  count++;//increment counter
  if (cardtemp.classList!="card match" && cardtemp.classList!="card open show")//the right elements are pushed onto the stack
  {
  cardtemp.classList +=" open show";
  matches.push(cardtemp);//push first card onto the stack.
  if (count==2)//check to see if they match.
  {
  incrementMoves();
  match(); //check if it's a match.
  stars(); //check the star rating.
  completed();//check if all cards have been matched.
  }
}
}

function incrementMoves()//a function to display the number of moves. Two clicks count as one move.
{
  noOfMoves++;
  movesCounter.innerHTML=noOfMoves;

}

function match() //the card matching function
{
  count=0;
  let temp1=matches.pop();
  let temp2=matches.pop();
  if (temp1.innerHTML != temp2.innerHTML)
  {
  setTimeout (function remove() {
  temp1.classList.remove("open", "show");
  temp2.classList.remove("open", "show");}, 500);
}
  else
  {
    temp1.classList="card match";
    temp2.classList="card match";
    ++matchedmoves;//increment the number of matched pairs.

  }
}

function completed() //call game over function when all cards have been matched.
{
if (matchedmoves==8)
gameover();
}

function gameover() //the gameover function to stop the timer and show the modal.
{
  clearInterval(interval);//stop the timer

  setTimeout(function () {
  modal.style.display="";//show the modal
  modalstatistics.textContent =
  "You completed the game in " + mins + " minutes," + " " + secs +" seconds" + " with " + finalstars + " stars left.";
  window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    reset();
      }
    }
},500);

}

function showstars()
{
  for (i=0 ; i<3 ; i++)
  {
    starrating.children[i].style.visibility="visible";
  }
}

function stars() //a function to change the star rating after a number of moves.
{
  if (noOfMoves==10)
  {
    let starone = starrating.children[0];
    starone.style.visibility="hidden";
    finalstars=2;
    }

  else if (noOfMoves>=20)
  {
    let startwo = starrating.children[1];
    startwo.style.visibility="hidden";
    finalstars=1
  }
  return finalstars;
}

function reset() //a function to reset the timer and restart the game.
{

  start();

}

function restart() //event listener for reset
{

  restartbutton.addEventListener('click', reset);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
