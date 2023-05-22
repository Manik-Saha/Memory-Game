//defining variables
let img_1,
  img_2,
  index1,
  index2,
  count = 0,
  stepCount = 0,
  matchCount = 0;

const instructions = document.querySelector("#instructions");
instructions.style.display = "none";

const first_page = document.querySelector(".bg-color");

const load_dynamic_content = document.querySelector("#load-dynamic-content");
load_dynamic_content.style.display = "none";

const dynamicDocument = document.querySelector(
  "#load-dynamic-content .front-background"
);

const thumbs_up = document.querySelector("#level-1-complete");
loadDynamicContent(thumbs_up);
thumbs_up.style.display = "none";

const tips = document.querySelector("#tips");
tips.style.display = "none";

const label_1 = document.querySelector("#label-1");
label_1.style.display = "none";

const play = document.querySelector("#play");
play.addEventListener("click", function () {
  loadInstructions();
});

document
  .querySelector("#tips-previous-btn")
  .addEventListener("click", function () {
    loadInstructions();
    tips.style.display = "none";
  });

document.querySelector(".skip").addEventListener("click", function () {
  tips.style.display = "none";
  instructions.style.display = "none";
  loadDynamicContent(label_1);
  label_1.style.display = "block";
  stepCount = 0;
  stepCounter.style.display = "block";
});

document.querySelector("#tips-next-btn").addEventListener("click", function () {
  stepCount = 0;
  tips.style.display = "none";
  loadDynamicContent(label_1);
  label_1.style.display = "block";
  stepCounter.style.display = "block";
});

const stepCounter = document.createElement("div");
stepCounter.setAttribute("id", "step-counter");
stepCounter.style.display = "none";

loadDynamicContent(stepCounter);

document
  .querySelector("#instruction-previous-btn")
  .addEventListener("click", function () {
    instructions.style.display = "none";
    first_page.style.display = "block";
  });

const instruction_next_btn = document.querySelector("#instruction-next-btn");
instruction_next_btn.addEventListener("click", function () {
  loadTips();
});

function loadInstructions() {
  loadDynamicContent(instructions);
  first_page.style.display = "none";
  load_dynamic_content.style.display = "block";
  instructions.style.display = "block";
}

function loadDynamicContent(addContent) {
  dynamicDocument.appendChild(addContent);
}

function loadTips() {
  dynamicDocument.appendChild(tips);
  tips.style.display = "block";
  instructions.style.display = "none";
}

const cardsFront = document.querySelectorAll("#label-1 ul li .front-view");
const cardsBack = document.querySelectorAll("#label-1 ul li .back-view");

cardsFront.forEach(function (card, index) {
  card.addEventListener("click", function () {
    stepCount++;
    stepCountFunc(stepCount);

    card.style.display = "none";
    cardsBack[index].style.display = "block";
    count++;
    
    if (count === 1) {
      img_1 = cardsBack[index].innerHTML;
      index1 = index;
    } else if (count === 2) {
      img_2 = cardsBack[index].innerHTML;
      count = 0;
      index2 = index;
      setTimeout(() => {
        matchImage(img_1, img_2, index1, index2);
      }, 1000);
    }
  });
});

function matchImage(img_1, img_2, index1, index2) {
  if (img_1 === img_2) {
    matchCount++;
    if (matchCount == 6) {
      label_1.style.display = "none";
      thumbs_up.style.display = "block";
    }

    cardsBack[index1].style.display = "none";
    cardsBack[index2].style.display = "none";
  } else {
    setTimeout(() => {
      cardsBack[index1].classList.add("shake-shake");
      cardsBack[index2].classList.add("shake-shake");
    }, 40);

    setTimeout(() => {
      cardsBack[index1].classList.remove("shake-shake");
      cardsBack[index2].classList.remove("shake-shake");
    }, 1200);

    cardsBack[index1].style.display = "none";
    cardsFront[index1].style.display = "block";

    cardsBack[index2].style.display = "none";
    cardsFront[index2].style.display = "block";
  }
}

const stepCountFunc = (step) => {
  stepCounter.textContent = `Step: ${step}`;
};

function shuffleCard() {
  const cardArr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  cardArr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cardsBack.forEach((card, i) => {
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/image-${cardArr[i]}.png`;
  });
}

shuffleCard();
