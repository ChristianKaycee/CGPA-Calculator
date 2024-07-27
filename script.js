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

                if (!isNaN(score) && !isNaN(creditUnits) && (score<=100) && !containsSymbols(score)) {
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

    // Event listeners for calculate buttons
    document.getElementById('first').addEventListener('click', function(event) {
        event.preventDefault();
        calculateGPA('.form-1', '.gpa-1');
    });

    document.getElementById('second').addEventListener('click', function(event) {
        event.preventDefault();
        calculateGPA('.form-2', '.gpa-2');
    });
    document.getElementById('third').addEventListener('click', function(event) {
        event.preventDefault();
        let gpa1=document.querySelector(".gpa-1");
        let gpa2=document.querySelector(".gpa-2");
        let cgpa = (parseFloat(gpa1.textContent)+parseFloat(gpa2.textContent))/2;
        document.querySelector(".gpa-3").textContent= cgpa.toFixed(2);
        document.querySelector("#degree").textContent = getDegree(cgpa);
    });
    document.querySelector("#clear").addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector(".gpa-3").textContent = "";
        document.querySelector("#degree").textContent = "";
    });