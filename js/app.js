// after refreshing the page, create the session storage

sessionStorage.clear();

// function to display the current seat status

function displayStatus() {
    let noOfSeats = sessionStorage.getItem("noOfSeats");
    let amount = sessionStorage.getItem("amount");

    if (noOfSeats == null && amount == null) {
        sessionStorage.setItem("noOfSeats", 0);
        sessionStorage.setItem("amount", 0);
    } else {
        let displayPara = document.querySelector(".display-status");

        let newDisplayPara = document.createElement('p');
        let html = `<p class="display-status color-white">You have selected <span class="noOfSeats">${noOfSeats}</span> seats and you will need
        to pay <span class="amount">${amount}₹</span></p>`;
        newDisplayPara.innerHTML = html;

        displayPara.replaceWith(newDisplayPara);
    }
}

displayStatus();

// when user selects the seat, change the color of the seat and also update the local storage

let rows = document.getElementsByClassName("row");
Array.from(rows).forEach(function (element) {
    let seats = element.children;

    Array.from(seats).forEach(function (element) {
        if (element.className == "seat") {
            element.addEventListener("click", function (e) {
                if (confirm("Are you sure?")) {
                    let target = e.target;
                    target.className = "seat selected";

                    let noOfSeats = sessionStorage.getItem("noOfSeats");
                    let amount = sessionStorage.getItem("amount");

                    let movie = document.getElementById("selectMovie");
                    let value = parseInt(movie.value);

                    if (noOfSeats == null && amount == null) {
                        sessionStorage.setItem("noOfSeats", 1);
                        sessionStorage.setItem("amount", value);
                    } else {
                        noOfSeats = parseInt(noOfSeats) + 1;
                        amount = value * parseInt(noOfSeats);

                        sessionStorage.clear();

                        sessionStorage.setItem("noOfSeats", noOfSeats);
                        sessionStorage.setItem("amount", amount);
                    }

                    displayStatus();
                }
            });
        }
    });
});

// whenever user selects the movie form the selection list then also update the prices in local storage and display the new prices

function updatePrice(value) {
    let newAmount = parseInt(value) * parseInt(sessionStorage.getItem("noOfSeats"));

    let displayStatus = document.querySelector(".display-status");
    displayStatus.innerHTML = `<p class="display-status color-white">You have selected <span class="noOfSeats">${sessionStorage.getItem("noOfSeats")}</span> seats and you will need to pay <span class="amount">${newAmount}₹</span></p>`;

    sessionStorage.removeItem("amount");
    sessionStorage.setItem("amount", newAmount);
}