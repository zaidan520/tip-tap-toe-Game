let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".rest");
let newGameBtn = document.querySelector(".new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts

// All winning combinations
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Function to enable all boxes (clear and make clickable)
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
};

// Function to disable all boxes (after win or draw)
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner: ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check for a winner or draw
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }

    // Check for draw
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

// Handle box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

// Attach   listeners to buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
