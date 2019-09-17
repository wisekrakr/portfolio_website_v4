// Select DOM Items

// Time Items (Philosophy page)
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const name = document.getElementById("name");
const thought = document.getElementById("thought");
let is24Hours = true;
let changeButton = document.getElementById("changeFormat");

// Show Time
function updateTime() {
  //Add button and function to set
  let today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  // Set AM or PM
  if (!is24Hours) {
    const amPm = hour >= 12 ? "PM" : "AM";

    // 12hr Format
    let newHour = hour % 12 || 12;

    time.innerHTML = `${newHour}<span>:</span>${addZero(
      minute
    )}<span>:</span>${addZero(second) + amPm}`;
  } else {
    time.innerHTML = `${hour}<span>:</span>${addZero(
      minute
    )}<span>:</span>${addZero(second)}`;
  }

  setTimeout(updateTime, 1000);
}

// Change from 24 hours to 12 hours
let changeFormat = function() {
  is24Hours = !is24Hours;
};

// Add Zeros to Time
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Set Background and Greeting
function setGreeting() {
  let today = new Date();
  let hour = today.getHours();

  switch (hour) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      //Night
      document.body.style.backgroundImage =
        "url(https://raw.githubusercontent.com/wisekrakr/portfolio_res/master/images/philo_page/night.jpg)";
      greeting.textContent = "Good Night ";

      break;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      //Morning
      document.body.style.backgroundImage =
        "url(https://raw.githubusercontent.com/wisekrakr/portfolio_res/master/images/philo_page/morning.jpg)";
      greeting.textContent = "Good Morning ";

      break;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      //Afternoon
      document.body.style.backgroundImage =
        "url(https://raw.githubusercontent.com/wisekrakr/portfolio_res/master/images/philo_page/afternoon.jpg?)";
      greeting.textContent = "Good Afternoon ";

      break;
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
      //Evening
      document.body.style.backgroundImage =
        "url(https://raw.githubusercontent.com/wisekrakr/portfolio_res/master/images/philo_page/evening.jpg)";
      greeting.textContent = "Good Evening ";

      break;
    default:
      console.log("No Time Given " + hour);
  }
}

//Get Name
function getName() {
  if (localStorage.getItem("name") === null) {
    name.innerHTML = "[Enter your name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

// Set Name
function setName(event) {
  if (event.type === "keypress") {
    // Check if Enter is pressed

    if (event.keyCode === 13) {
      //13 is the Enter key
      localStorage.setItem("name", event.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", event.target.innerText);
  }
}

// Get Thought
function getThought() {
  if (localStorage.getItem("thought") === null) {
    thought.textContent = "Tell me your thoughts here";
  } else {
    thought.textContent = localStorage.getItem("thought");
  }
}

// Set Thought
function setThought(event) {
  if (event.type === "keypress") {
    // Check if Enter is pressed

    if (event.keyCode === 13) {
      //13 is the Enter key
      localStorage.setItem("thought", event.target.innerText);
      thought.blur();
    }
  } else {
    localStorage.setItem("thought", event.target.innerText);
  }
}

// Event Listeners
changeButton.addEventListener("click", changeFormat);
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
thought.addEventListener("keypress", setThought);
thought.addEventListener("blur", setThought);

// Run Functions
updateTime();
setGreeting();
getName();
getThought();
