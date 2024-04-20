// const fs = require('fs');

const startTestButton = document.getElementById("startTestButton");
const responseButton = document.getElementById("responseButton");
const result = document.getElementById("result");
let startTime;
let reactionTimes = [];

startTestButton.addEventListener("click", () => {
  if (startTestButton.textContent == "Go Back") {
    startTestButton.style.background = "yellow";
    window.location.href = "/";
    //redirect to homepage
  } else {
    startTestButton.style.display = "none";
    document.body.style.backgroundColor = "red";
    const randomInterval = Math.floor(Math.random() * 4) + 1;
    result.textContent = "";
    responseButton.disabled = true;
    responseButton.style.display = "block";

    setTimeout(() => {
      document.body.style.backgroundColor = "green";
      startTime = new Date();
      responseButton.disabled = false;
    }, randomInterval * 1000);
  }
});

responseButton.addEventListener("click", () => {
  const endTime = new Date();
  const reactionTime = endTime - startTime;
  //   console.log(endTime, startTime)
  reactionTimes.push(reactionTime);
  console.log(reactionTimes);
  if (reactionTimes.length < 3) {
    // console.log("1");
    document.body.style.backgroundColor = "red";
    responseButton.style.display = "block";
    responseButton.disabled = true;
    setTimeout(() => {
      document.body.style.backgroundColor = "green";
      responseButton.disabled = false;
      startTime = new Date();
    }, Math.floor(Math.random() * 4000) + 1000);
  } else {
    const averageReactionTime =
      reactionTimes.reduce((a, b) => a + b) / reactionTimes.length;
    result.textContent = `Your average reaction time is ${averageReactionTime} milliseconds.`;
    responseButton.style.display = "none";
    document.body.style.backgroundColor = "white";
    startTestButton.style.display = "block";
    startTestButton.textContent="Go Back";
    reactionTimes = [];

    data.name = localStorage.getItem("name");
    data.gender = localStorage.getItem("gender");
    data.reactionTime = averageReactionTime;
    savv();
  }
});

document.body.addEventListener("transitionend", () => {
  if (document.body.style.backgroundColor === "green") {
    startTime = new Date();
    responseButton.style.display = "block";
  }
});

const csvFilePath = "reaction_times.csv";
const csvHeader = "Name,Roll Number,Reaction Time\n";

const data = {
  name: null,
  gender: null,
  reactionTime: null,
};

function savv() {
  fetch("/submitData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Data successfully sent to server");
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
