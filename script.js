const addBtn = document.getElementById("add-card-btn");
const popup = document.getElementById("popup");
const saveBtn = document.getElementById("save-btn");
const closeBtn = document.getElementById("close-btn");
const flashcardsDiv = document.getElementById("flashcards");

let cards = JSON.parse(localStorage.getItem("cards")) || [];

function displayCards() {
  flashcardsDiv.innerHTML = "";
  cards.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.innerHTML = `<div>${card.question}</div>`;
    cardEl.addEventListener("click", () => {
      cardEl.innerHTML = cardEl.innerHTML === `<div>${card.question}</div>` ?
                         `<div>${card.answer}</div>` :
                         `<div>${card.question}</div>`;
    });

    cardEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      cards.splice(index, 1);
      localStorage.setItem("cards", JSON.stringify(cards));
      displayCards();
    });

    flashcardsDiv.appendChild(cardEl);
  });
}

addBtn.addEventListener("click", () => popup.style.display = "block");
closeBtn.addEventListener("click", () => popup.style.display = "none");

saveBtn.addEventListener("click", () => {
  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer").value;
  if (question && answer) {
    cards.push({ question, answer });
    localStorage.setItem("cards", JSON.stringify(cards));
    displayCards();
    popup.style.display = "none";
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
  }
});

displayCards();
