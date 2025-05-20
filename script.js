document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const startButton = document.getElementById("start-button");
  const gameScreen = document.getElementById("game-screen");
  const gameBoard = document.getElementById("game-board");
  const message = document.getElementById("message");
  const backButton = document.getElementById("back-button");

  const kanjiPairs = ["簡", "単", "結", "若", "回", "番", "母", "安"];
  let cards = [];
  let firstCard = null;
  let lockBoard = false;
  let matchedPairs = 0;

  startButton.addEventListener("click", startGame);
  backButton.addEventListener("click", returnToStart);

  function startGame() {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    message.classList.add("hidden");
    gameBoard.innerHTML = "";
    cards = [];
    firstCard = null;
    lockBoard = false;
    matchedPairs = 0;

    const shuffledKanji = shuffle([...kanjiPairs, ...kanjiPairs]);

    for (let i = 0; i < shuffledKanji.length; i++) {
      const card = document.createElement("button");
      card.textContent = "？";
      card.style.fontFamily = "MS Gothic";
      card.style.fontSize = "38px";
      card.style.backgroundColor = "blanchedalmond";
      card.style.color = "black";
      card.style.borderRadius = "8px";
      card.style.cursor = "pointer";
      card.classList.add("card");

      // Hover-Effekt
      card.addEventListener("mouseenter", () => {
        if (card.textContent === "？") {
          card.style.backgroundColor = "yellow";
        }
      });
      card.addEventListener("mouseleave", () => {
        if (card.textContent === "？") {
          card.style.backgroundColor = "blanchedalmond";
        }
      });

      card.addEventListener("click", () => handleCardClick(card, i, shuffledKanji));
      gameBoard.appendChild(card);
      cards.push(card);
    }
  }

  function handleCardClick(card, index, kanjiArray) {
    if (lockBoard || card.textContent !== "？") return;

    card.textContent = kanjiArray[index];
    card.style.backgroundColor = "black";
    card.style.color = getColorForKanji(kanjiArray[index]);

    if (!firstCard) {
      firstCard = { card, index };
    } else {
      if (kanjiArray[firstCard.index] === kanjiArray[index]) {
        matchedPairs++;
        firstCard = null;
        checkForWin();
      } else {
        lockBoard = true;
        setTimeout(() => {
          card.textContent = "？";
          card.style.backgroundColor = "blanchedalmond";
          card.style.color = "black";

          firstCard.card.textContent = "？";
          firstCard.card.style.backgroundColor = "blanchedalmond";
          firstCard.card.style.color = "black";

          firstCard = null;
          lockBoard = false;
        }, 1000);
      }
    }
  }

  function checkForWin() {
    if (matchedPairs === kanjiPairs.length) {
      message.classList.remove("hidden");
    }
  }

  function returnToStart() {
    gameScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    gameBoard.innerHTML = "";
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getColorForKanji(kanji) {
    const colors = {
      "簡": "red",
      "単": "blue",
      "結": "green",
      "若": "purple",
      "回": "orange",
      "番": "brown",
      "母": "cyan",
      "安": "deeppink"
    };
    return colors[kanji] || "white";
  }
});
