var price = 1;
document.getElementById("price").textContent = price.toFixed(2);
var investmentBalance = 0;
document.getElementById("investment-balance").textContent =
  investmentBalance.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
var sharesOwned = 0;
document.getElementById("shares-owned").textContent =
  sharesOwned.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
var investedAmount = 0;
document.getElementById("invested-amount").textContent =
  investedAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
var yearsPassed = 0;
document.getElementById("years-passed").textContent = yearsPassed.toFixed(1);

const monthlyPaymentForm = document.getElementById("monthly-payment-form");
monthlyPaymentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const monthlyPayment = parseFloat(
    document.getElementById("monthly-payment").value,
  );
  const amountOfMonths = parseInt(
    document.getElementById("months-schedule").value,
  );
  simulateMonthlyPayment(monthlyPayment, amountOfMonths);
});

function simulateMonthlyPayment(monthlyPayment, amountOfMonths) {
  for (var i = 0; i < amountOfMonths; i++) {
    simulateMonth(1);
    buyShares(monthlyPayment);
  }
}

//Calculate the investment balance based on the number of years, monthly amount, and return rate
document.getElementById("balance").textContent = "0.00";

const yearForm = document.getElementById("year-form");

yearForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const years = parseInt(document.getElementById("year").value);
    const monthlyAmount = parseFloat(
        document.getElementById("amount-monthly").value
    );
    const returnRate = parseFloat(
        document.getElementById("return-rate").value
    );

    calculateInvestment(years, monthlyAmount, returnRate);
});

function calculateInvestment(years, monthlyAmount, returnRate) {

    let balance = 0;

    const monthlyRate = returnRate / 100 / 12;
    const totalMonths = years * 12;

    for (let i = 0; i < totalMonths; i++) {

        balance += monthlyAmount;
        balance *= 1 + monthlyRate;

    }

    document.getElementById("balance").textContent =
        balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    document.getElementById("invested-amount-year").textContent =
        (monthlyAmount * totalMonths).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    document.getElementById("profit").textContent =
        (balance - monthlyAmount * totalMonths).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    document.getElementById("years").textContent = years;
    console.log("Final balance: $" + balance.toFixed(2));
}

//Simulate the stock price for a given number of months
const form = document.getElementById("month-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const amountOfMonths = parseInt(document.getElementById("months").value);
  simulateMonth(amountOfMonths);
});
function simulateMonth(amountOfMonths) {
  for (var i = 0; i < amountOfMonths; i++) {
    randomPrice = Math.random();

    if (randomPrice < 0.02) {
      newPrice = Math.random() * (-0.6 - -0.4) + -0.4;
    } else if (randomPrice < 0.05) {
      newPrice = Math.random() * (-0.35 - -0.2) + -0.2;
    } else if (randomPrice < 0.08) {
      newPrice = Math.random() * (0.4 - 0.2) + 0.2;
    } else {
      newPrice = Math.random() * (0.2 - -0.15) + -0.15;
    }

    price = price * (1 + newPrice);

    if (price < 0.01) {
      price = 0.01;
    }

    investmentBalance = sharesOwned * price;

    console.log("Month " + (i + 1) + ": " + price.toFixed(2));
  }
  document.getElementById("price").textContent = price.toFixed(2);
  document.getElementById("investment-balance").textContent =
    investmentBalance.toFixed(2);

  yearsPassed += amountOfMonths / 12;
  document.getElementById("years-passed").textContent = yearsPassed.toFixed(1);
}

//Buy shares based on the amount entered in the buy form
const buyForm = document.getElementById("buy-form");
buyForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const amountToInvest = parseFloat(
    document.getElementById("buy-amount").value,
  );
  buyShares(amountToInvest);
});
function buyShares(amount) {
  sharesOwned += amount / price;
  document.getElementById("shares-owned").textContent = sharesOwned.toFixed(2);

  investmentBalance = sharesOwned * price;
  document.getElementById("investment-balance").textContent =
    investmentBalance.toFixed(2);

  investedAmount += amount;
  document.getElementById("invested-amount").textContent =
    investedAmount.toFixed(2);
}
