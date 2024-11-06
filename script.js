let gameSeq = [];
let userSeq = [];
let level = 0;
let gameStarted = false;
let boxes = ['box1', 'box2', 'box3', 'box4'];
const h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (!gameStarted) {
        gameStarted = true;
        levelUp(); // Start the game when the user presses any key
    }
});

function gameflash(box) {
    box.classList.add("gameflash");
    setTimeout(function () {
        box.classList.remove("gameflash");
    }, 250);
}

function userflash(box) {
    box.classList.add("userflash");
    setTimeout(function () {
        box.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = boxes[randomIdx];
    let randomBox = document.querySelector(`#${randomColor}`);
    gameflash(randomBox);
    gameSeq.push(randomColor);

    // Show the sequence to the user with a delay
    let i = 0;
    let interval = setInterval(() => {
        gameflash(document.querySelector(`#${gameSeq[i]}`));
        i++;
        if (i === gameSeq.length) {
            clearInterval(interval);
        }
    }, 600);
}

function btnPress() {
    let box = this;
    userflash(box);
    let userBox = box.getAttribute("id");
    userSeq.push(userBox);
    checkAns();
}

let allBoxes = document.querySelectorAll(".box");
allBoxes.forEach(function (box) {
    box.addEventListener("click", btnPress);
});

function checkAns() {
    // Check if the user's sequence is correct so far
    if (userSeq[userSeq.length - 1] === gameSeq[userSeq.length - 1]) {
        // If the user has completed the sequence correctly
        if (userSeq.length === gameSeq.length) {
            // Wait for a while before going to the next level
            setTimeout(levelUp, 1000);
        }
    } else {
        // Game Over
        h3.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start the game again.`;
        document.querySelector("body").style.backgroundColor = 'red';
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = 'white';
        }, 1000);
        reset();
    }
}

function reset() {
    gameStarted = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
