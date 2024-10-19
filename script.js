// For next cell on enter
const inputSelectors = ['.form-1 input', '.form-2 input', '.form-3 input', '.form-4 input'];
let allInputs = [];

inputSelectors.forEach((selector) => {
    allInputs = allInputs.concat(Array.from(document.querySelectorAll(selector)));
});

allInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 2 && index < allInputs.length - 1) {
            allInputs[index + 1].focus();
        }
    });
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
            allInputs[index - 1].focus();
        } else if (e.key === 'Enter' && input.value.length > 0 && index < allInputs.length - 1) {
            allInputs[index + 1].focus();
        }
    });
});

// Function to display the courses table
function displayTab(formOn, formBox) {
    formOn.addEventListener("click", (e) => {
        e.preventDefault();
        formBox.classList.toggle("form-show");
        formOn.scrollIntoView({ behaviour: 'smooth' });
    });
}
["formone","formtwo","formthree","formfour"].forEach((id,index)=>{
    document.querySelector(`#${id}`).addEventListener("click",()=>{
        document.querySelector(`#${id} + .mypointer`).classList.toggle("current-pointer");
    })
})
let formOnOne = document.getElementById("formone");
let formOnTwo = document.getElementById("formtwo");
let formOnThree = document.getElementById("formthree");
let formOnFour = document.getElementById("formfour");

let formOne = document.querySelector(".form-1");
let formTwo = document.querySelector(".form-2");
let formThree = document.querySelector(".form-3");
let formFour = document.querySelector(".form-4");

displayTab(formOnOne, formOne);
displayTab(formOnTwo, formTwo);
displayTab(formOnThree, formThree);
displayTab(formOnFour, formFour);

// Function to get grade points based on score
function getGradePoint(score) {
    if (score >= 70) return 5; // A
    if (score >= 60) return 4; // B
    if (score >= 50) return 3; // C
    if (score >= 45) return 2; // D
    if (score >= 40) return 1; // E
    return 0; // F
}
function getDegree(cgpa) {
    if (cgpa >= 4.5) return "Your currenntly on 1st Class"; // A
    if (cgpa >= 3.5) return "Your currenntly on 2nd Class Upper"; // B
    if (cgpa >= 2.4) return "Your currenntly on 2nd Class Lower"; // C
    if (cgpa >= 1.5) return "Your currenntly on 3rd Class"; // D
    if (cgpa >= 1.0) return "Your on Pass"; // E
    return "Failed"; // F
}
function containsSymbols(input) {
    let symbolCheck = /[!@#$%^&*(),.?":{}|<>]/;
    return symbolCheck.test(input);
}
// Function to calculate GPA for a given form and GPA display element
function calculateGPA(formSelector, gpaSelector) {
    const rows = document.querySelectorAll(`${formSelector} .row`);
    let totalPoints = 0;
    let totalCredits = 0;

    rows.forEach(row => {
        const scoreInput = row.querySelector('input.score');
        const creditUnitsElement = row.querySelector('p.cu');

        if (scoreInput && creditUnitsElement) {
            const creditUnits = parseInt(creditUnitsElement.textContent);
            const score = parseInt(scoreInput.value);

            if (!isNaN(score) && !isNaN(creditUnits) && (score <= 100) && !containsSymbols(score)) {
                totalCredits += creditUnits;
                totalPoints += getGradePoint(score) * creditUnits;
            } else {
                console.error(`Invalid score (${score}) or credit unit (${creditUnits}) in row:`, row);
            }
        } else {
            console.error('Missing score input or credit unit element in row:', row);
        }
    });

    if (totalCredits > 0) {
        const gpa = totalPoints / totalCredits;
        document.querySelector(gpaSelector).textContent = gpa.toFixed(2);
    } else {
        console.error('No valid credits found.');
        document.querySelector(gpaSelector).textContent = '0.0';
    }
}

 // Selectors for table view elements
let tabViewBox = document.querySelector(".tabViewBox");
let tabViewNo = document.querySelector(".noView");
let tabViewYes = document.querySelector(".yesView");
let tableView = document.querySelector(".table-view");
let closeTable = document.querySelector(".close-table");

let yearOneFirst = document.querySelector(".fory11");
let yearOneSecond = document.querySelector(".fory12");
let yearTwoFirst = document.querySelector(".fory21");
let yearTwoSecond = document.querySelector(".fory22");
let yearOneCgpa = document.querySelector(".cgfory1");
let yearTwoCgpa = document.querySelector(".cgfory2");
let myCurrentCgpa = document.querySelector(".myCgpa");

// Event listeners for calculate buttons (looped for simplicity)
['first', 'second', 'third', 'fourth'].forEach((id, index) => {
    document.getElementById(id).addEventListener('click', function (event) {
        event.preventDefault();
        calculateGPA(`.form-${index + 1}`, `.gpa-${index + 1}`);
    });
});

// Event listener for the final calculation button
document.getElementById('final').addEventListener('click', function (event) {
    event.preventDefault();
    
    // Collecting GPAs from the forms
    let gpa1 = document.querySelector(".gpa-1").textContent;
    let gpa2 = document.querySelector(".gpa-2").textContent;
    let gpa3 = document.querySelector(".gpa-3").textContent;
    let gpa4 = document.querySelector(".gpa-4").textContent;

    // Display the GPA values in the table
    yearOneFirst.innerHTML = gpa1;
    yearOneSecond.innerHTML = gpa2;
    yearTwoFirst.innerHTML = gpa3;
    yearTwoSecond.innerHTML = gpa4;

    // Calculate CGPAs for each year and the overall CGPA
    yearOneCgpa.innerHTML = ((parseFloat(gpa1) + parseFloat(gpa2)) / 2).toFixed(2);
    yearTwoCgpa.innerHTML = ((parseFloat(gpa3) + parseFloat(gpa4)) / 2).toFixed(2);
    myCurrentCgpa.innerHTML = ((parseFloat(yearOneCgpa.textContent) + parseFloat(yearTwoCgpa.textContent)) / 2).toFixed(2);

    // Calculate the overall CGPA and update the degree classification
    let cgpa = (parseFloat(gpa1) + parseFloat(gpa2) + parseFloat(gpa3) + parseFloat(gpa4)) / 4;
    document.querySelector(".gpa-final").textContent = cgpa.toFixed(2);
    document.querySelector("#degree").textContent = getDegree(cgpa);

    // Show or hide the table view based on its current display state
    if (window.getComputedStyle(tableView).display !== 'flex') {
        tabViewBox.classList.add("show-tabBox");
    }
});

// Event listener for showing or hiding the table view
tabViewYes.addEventListener("click", (e) => {
    e.preventDefault();
    tableView.classList.add("show-table");
    tabViewBox.classList.remove("show-tabBox");
});

tabViewNo.addEventListener("click", (e) => {
    e.preventDefault();
    tabViewBox.classList.remove("show-tabBox");
});

closeTable.addEventListener("click", (e) => {
    if (tableView) {
        tableView.classList.remove("show-table");
    }
});

document.querySelector("#clear").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".gpa-final").textContent = "";
    document.querySelector("#degree").textContent = "";
});

// For scroll up
let up = document.querySelector(".up");
let btn = document.querySelector(".btn");
function scrollVisible() {
    if (window.scrollY > 30) {
        btn.classList.add("show");
        up.classList.add("show");
    }
    else {
        btn.classList.remove("show");
        up.classList.remove("show");
    }
}
function circleLoad() {
    let screenHeight = window.scrollY;
    console.log("screen", screenHeight);
    let docHeight = document.documentElement.scrollHeight - window.innerHeight;
    console.log("scrollheight", document.documentElement.scrollHeight);
    console.log("docheight", docHeight);
    console.log("windowInner", window.innerHeight);
    let currentHeight = screenHeight / docHeight;
    console.log("current", currentHeight);
    let loadHeight = currentHeight * 360;
    console.log("load", loadHeight);
    btn.style.background = `conic-gradient(rgb(255, 0, 0) ${loadHeight}deg, transparent ${loadHeight}deg)`;
}

window.addEventListener("scroll", circleLoad);
circleLoad();
window.addEventListener("scroll", scrollVisible);
scrollVisible();
up.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Optional, for smooth scrolling effect
    });
});
