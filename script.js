// ==========================================
// GET ALL SCREENS
// ==========================================
const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwFsDXaY5g0H267UIYgxAEtxxle4J6EnG_nc3yUCDKZ6kjqy8SiSZJOb36GQwuLxxgTiw/exec";


const screens = document.querySelectorAll(".screen");


// ==========================================
// BUTTONS
// ==========================================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const dateBtn = document.getElementById("dateBtn");
const foodBtn = document.getElementById("foodBtn");

const addMovieBtn = document.getElementById("addMovieBtn");
const movieBtn = document.getElementById("movieBtn");

const bucketBtn = document.getElementById("bucketBtn");

const acceptBtn = document.getElementById("acceptBtn");
const comeBtn = document.getElementById("comeBtn");


// ==========================================
// DATE & TIME INPUTS
// ==========================================

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");


// ==========================================
// MOVIE INPUT
// ==========================================

const movieInput = document.getElementById("movieInput");
const movieList = document.getElementById("movieList");


// ==========================================
// BUCKET LIST INPUTS
// ==========================================

const bucket1 = document.getElementById("bucket1");
const bucket2 = document.getElementById("bucket2");
const bucket3 = document.getElementById("bucket3");


// ==========================================
// ERROR MESSAGES
// ==========================================

const dateError = document.getElementById("dateError");
const foodError = document.getElementById("foodError");
const movieError = document.getElementById("movieError");
const bucketError = document.getElementById("bucketError");


// ==========================================
// FOOD CARDS
// ==========================================

const foodCards = document.querySelectorAll(".food-card");


// ==========================================
// FINAL DETAILS
// ==========================================

const finalDate = document.getElementById("finalDate");
const finalTime = document.getElementById("finalTime");
const finalFood = document.getElementById("finalFood");


// ==========================================
// PROJECT DATA / STATE
// ==========================================

let selectedDate = "";
let selectedTime = "";
let selectedFood = "";

let movies = [];


// ==========================================
// SCREEN SWITCHING
// ==========================================

function showScreen(number) {

    screens.forEach(function(screen) {

        screen.classList.remove("active");

    });


    const nextScreen =
        document.getElementById(`screen${number}`);


    if (nextScreen) {

        nextScreen.classList.add("active");

    }

}


// ==========================================
// SCREEN 1
// YES BUTTON
// ==========================================

yesBtn.addEventListener("click", function() {

    showScreen(2);

});


// ==========================================
// SCREEN 1
// NO BUTTON - RUN AWAY 😂
// ==========================================

noBtn.addEventListener("mouseenter", function () {

    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - buttonWidth - 20;
    const maxY = window.innerHeight - buttonHeight - 20;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

});



// Mobile touch support

noBtn.addEventListener("touchstart", function(event) {

    event.preventDefault();


    const maxX =
        window.innerWidth -
        noBtn.offsetWidth -
        20;


    const maxY =
        window.innerHeight -
        noBtn.offsetHeight -
        20;


    const randomX =
        Math.random() * maxX;


    const randomY =
        Math.random() * maxY;


    noBtn.style.position = "fixed";

    noBtn.style.left =
        randomX + "px";

    noBtn.style.top =
        randomY + "px";

});


// ==========================================
// SCREEN 2
// DATE + TIME
// ==========================================

dateBtn.addEventListener("click", function() {

    dateError.textContent = "";


    selectedDate =
        dateInput.value;


    selectedTime =
        timeInput.value;


    // Check date

    if (selectedDate === "") {

        dateError.textContent =
            "Please choose a date ❤️";

        return;

    }


    // Check time

    if (selectedTime === "") {

        dateError.textContent =
            "Please choose a time ❤️";

        return;

    }


    // Everything is valid

    showScreen(3);

});


// ==========================================
// SCREEN 3
// FOOD SELECTION
// ==========================================

foodCards.forEach(function(card) {

    card.addEventListener("click", function() {


        // Remove selection
        // from all cards

        foodCards.forEach(function(item) {

            item.classList.remove("selected");

        });


        // Select clicked card

        card.classList.add("selected");


        // Store food name

        selectedFood =
            card.dataset.food;


        // Clear error

        foodError.textContent = "";

    });

});


// ==========================================
// SCREEN 3
// FOOD → MOVIES
// ==========================================

foodBtn.addEventListener("click", function() {


    if (selectedFood === "") {

        foodError.textContent =
            "Please choose something delicious ❤️";

        return;

    }


    showScreen(4);

});


// ==========================================
// SCREEN 4
// ADD MOVIE
// ==========================================

addMovieBtn.addEventListener("click", function() {

    const movieName =
        movieInput.value.trim();


    // Empty movie

    if (movieName === "") {

        movieError.textContent =
            "Please enter a movie name 🎬";

        return;

    }


    // Add movie to array

    movies.push(movieName);


    // Clear input

    movieInput.value = "";


    // Clear error

    movieError.textContent = "";


    // Display movies

    displayMovies();

});


// ==========================================
// ADD MOVIE WITH ENTER KEY
// ==========================================

movieInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addMovieBtn.click();

    }

});


// ==========================================
// DISPLAY MOVIES
// ==========================================

function displayMovies() {

    movieList.innerHTML = "";


    movies.forEach(function(movie, index) {


        const movieItem =
            document.createElement("div");


        movieItem.classList.add(
            "movie-item"
        );


        movieItem.innerHTML = `

            <span>
                🎬 ${movie}
            </span>

            <button
                class="remove-movie"
                data-index="${index}">
                ✕
            </button>

        `;


        movieList.appendChild(movieItem);

    });


    // Add remove events

    const removeButtons =
        document.querySelectorAll(".remove-movie");


    removeButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const index =
                    Number(
                        button.dataset.index
                    );


                removeMovie(index);

            }
        );

    });

}


// ==========================================
// REMOVE MOVIE
// ==========================================

function removeMovie(index) {

    movies.splice(index, 1);


    displayMovies();

}


// ==========================================
// SCREEN 4
// MOVIES → BUCKET LIST
// ==========================================

movieBtn.addEventListener("click", function() {


    if (movies.length === 0) {

        movieError.textContent =
            "Add at least one movie 🎬❤️";

        return;

    }


    showScreen(5);

});


// ==========================================
// SCREEN 5
// BUCKET LIST
// ==========================================

bucketBtn.addEventListener("click", function() {

    bucketError.textContent = "";


    const item1 =
        bucket1.value.trim();


    const item2 =
        bucket2.value.trim();


    const item3 =
        bucket3.value.trim();


    // Check all three

    if (
        item1 === "" ||
        item2 === "" ||
        item3 === ""
    ) {

        bucketError.textContent =
            "Complete all three little dreams ❤️";

        return;

    }


    // Prepare final details

    finalDate.textContent =
        formatDate(selectedDate);


    finalTime.textContent =
        selectedTime;


    finalFood.textContent =
        selectedFood;


    // Go to confirmation

    showScreen(6);

});


// ==========================================
// SCREEN 6
// OK I ACCEPT
// ==========================================

acceptBtn.addEventListener("click", function() {

    const responseData = {

        date: selectedDate,

        time: selectedTime,

        food: selectedFood,

        movies: movies,

        bucket1: bucket1.value.trim(),

        bucket2: bucket2.value.trim(),

        bucket3: bucket3.value.trim()

    };


    fetch(GOOGLE_SCRIPT_URL, {

        method: "POST",

        mode: "no-cors",

        headers: {
            "Content-Type": "text/plain"
        },

        body: JSON.stringify(responseData)

    });


    showScreen(7);

});


// ==========================================
// SCREEN 7
// WILL YOU COME?
// ==========================================

comeBtn.addEventListener("click", function() {

    showScreen(8);

});


// ==========================================
// DATE FORMAT
// ==========================================

function formatDate(value) {

    const date =
        new Date(value);


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}