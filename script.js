let img_1,
  img_2,
  index1,
  index2,
  count = 0;

const instructions = document.querySelector("#instructions");
instructions.style.display = "none";

const first_page = document.querySelector(".bg-color");

const load_dynamic_content = document.querySelector("#load-dynamic-content");
load_dynamic_content.style.display = "none";

const dynamicDocument = document.querySelector(
  "#load-dynamic-content .front-background"
);

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
});

document.querySelector("#tips-next-btn").addEventListener("click", function () {
  tips.style.display = "none";
  loadDynamicContent(label_1);
  label_1.style.display = "block";
});

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
      }, 500);
    }
  });
});

function matchImage(img_1, img_2, index1, index2) {
  if (img_1 === img_2) {
    cardsBack[index1].style.display = "none";
    cardsBack[index2].style.display = "none";
  } else {
    cardsBack[index1].style.display = "none";
    cardsFront[index1].style.display = "block";

    cardsBack[index2].style.display = "none";
    cardsFront[index2].style.display = "block";
  }
}
