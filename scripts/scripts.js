/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

/* TIME MACHINE */

const slider = document.getElementById("timeline-slider");
const charDisplay = document.getElementById("character-display");
const stageIndicator = document.getElementById("stage-indicator");
const contextTitle = document.getElementById("context-title");
const contextSubtitle = document.getElementById("context-subtitle");
const contextDesc = document.getElementById("context-desc");

const chars = ["ri", "shang", "xiu", "he"];
const stages = [1, 2, 3, 4];
const preloadImages = [];

chars.forEach((char) => {
  stages.forEach((stage) => {
    const img = new Image();
    img.src = `images/${char}-stage-${stage}.svg`;
    preloadImages.push(img);
  });
});

console.log("Characters SVG Downloaded");

document.addEventListener("DOMContentLoaded", () => {});

const timelineData = {
  1: {
    char: "甲",
    title: "● STAGE 1: ORACLE BONE SCRIPT",
    sub: "甲骨文 — c. 1250 BCE",
    desc: "The earliest known form of Chinese writing, carved onto turtle shells and animal bones for divination purposes. These natural impressions formed the first systematic logic of Hanzi.",
  },
  2: {
    char: "金",
    title: "● STAGE 2: BRONZE INSCRIPTION",
    sub: "金文 — c. 1000 BCE",
    desc: "Characters cast or carved into ritual bronzes during the Shang and Zhou dynasties. The script became more uniform and pictorial elements began to abstract.",
  },
  3: {
    char: "篆",
    title: "● STAGE 3: SEAL SCRIPT",
    sub: "小篆 — c. 220 BCE",
    desc: "Standardized by the Qin Dynasty to unify the empire. Characterized by elongated, symmetric, and elegantly curved strokes.",
  },
  4: {
    char: "楷",
    title: "● STAGE 4: REGULAR SCRIPT",
    sub: "楷书 — c. 200 CE",
    desc: "The standard form of Hanzi still in use today. Brush strokes were optimized for legibility and structural balance.",
  },
};

if (slider) {
  slider.addEventListener("input", (event) => {
    const step = event.target.value;

    charDisplay.innerText = timelineData[step].char;
    stageIndicator.innerText = `STAGE ${step} / 4`;

    contextTitle.innerText = timelineData[step].title;
    contextSubtitle.innerText = timelineData[step].sub;
    contextDesc.innerText = timelineData[step].desc;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let currentChar = "ri";
  let currentStage = "1";

  const hanziData = {
    ri: {
      stages: {
        1: {
          title: "STAGE 1: ORACLE BONE",
          time: "甲骨文 — c. 1250 BCE",
          desc: "A circle with a dot in the center, depicting the sun.",
        },
        2: {
          title: "STAGE 2: BRONZE",
          time: "金文 — c. 1046 BCE",
          desc: "The circular shape becomes slightly more elongated due to casting.",
        },
        3: {
          title: "STAGE 3: SMALL SEAL",
          time: "小篆 — c. 221 BCE",
          desc: "Standardized by the Qin dynasty. Lines are perfectly even.",
        },
        4: {
          title: "STAGE 4: REGULAR",
          time: "楷书 — c. 200 CE",
          desc: "The modern rectangular form, optimized for brush writing.",
        },
      },
    },
    shang: {
      stages: {
        1: {
          title: "STAGE 1: ORACLE BONE",
          time: "甲骨文 — c. 1250 BCE",
          desc: "A short line above a longer baseline, indicating 'above'.",
        },
        2: {
          title: "STAGE 2: BRONZE",
          time: "金文 — c. 1046 BCE",
          desc: "Strokes become thicker but the abstract concept remains.",
        },
        3: {
          title: "STAGE 3: SMALL SEAL",
          time: "小篆 — c. 221 BCE",
          desc: "The short line turns vertical, formalizing the logic.",
        },
        4: {
          title: "STAGE 4: REGULAR",
          time: "楷书 — c. 200 CE",
          desc: "Distinct, sharp brush strokes forming the modern '上'.",
        },
      },
    },
    xiu: {
      stages: {
        1: {
          title: "STAGE 1: ORACLE BONE",
          time: "甲骨文 — c. 1250 BCE",
          desc: "A person (人) leaning against a tree (木) = 'rest'.",
        },
        2: {
          title: "STAGE 2: BRONZE",
          time: "金文 — c. 1046 BCE",
          desc: "Components are stylized but retain clear narrative.",
        },
        3: {
          title: "STAGE 3: SMALL SEAL",
          time: "小篆 — c. 221 BCE",
          desc: "The 'person' radical takes its modern left-side form (亻).",
        },
        4: {
          title: "STAGE 4: REGULAR",
          time: "楷书 — c. 200 CE",
          desc: "Perfectly balanced combining 亻 and 木.",
        },
      },
    },
    he: {
      stages: {
        1: {
          title: "STAGE 1: ORACLE BONE",
          time: "甲骨文 — c. 1250 BCE",
          desc: "Early combinations of water (水) and phonetic markers.",
        },
        2: {
          title: "STAGE 2: BRONZE",
          time: "金文 — c. 1046 BCE",
          desc: "Clear separation: 'Water' for meaning, '可' for sound.",
        },
        3: {
          title: "STAGE 3: SMALL SEAL",
          time: "小篆 — c. 221 BCE",
          desc: "The water radical flows smoothly.",
        },
        4: {
          title: "STAGE 4: REGULAR",
          time: "楷书 — c. 200 CE",
          desc: "The standard structure (Meaning + Sound) is finalized.",
        },
      },
    },
  };

  const charImage = document.getElementById("current-char-img");
  const slider = document.getElementById("timeline-slider");
  const titleLabel = document.getElementById("context-title");
  const timeLabel = document.getElementById("context-time");
  const descLabel = document.getElementById("context-desc");
  const specimenBtns = document.querySelectorAll(".specimen-btn");
  const listItems = document.querySelectorAll("#stage-tracker li");

  function updateUI() {
    charImage.style.opacity = 0;
    setTimeout(() => {
      charImage.src = `images/${currentChar}-stage-${currentStage}.svg`;
      charImage.style.opacity = 1;
    }, 200);

    const stageInfo = hanziData[currentChar].stages[currentStage];
    titleLabel.innerText = stageInfo.title;
    timeLabel.innerText = stageInfo.time;
    descLabel.innerText = stageInfo.desc;

    listItems.forEach((li) => {
      li.classList.remove("unlocked");
      if (li.getAttribute("data-indicator") === currentStage) {
        li.classList.add("unlocked");
      }
    });
  }

  slider.addEventListener("input", (e) => {
    currentStage = e.target.value;
    updateUI();
  });

  specimenBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      specimenBtns.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");

      currentChar = e.target.getAttribute("data-char");
      updateUI();
    });
  });

  updateUI();
});

/* LOGIC LAB*/

const radicals = document.querySelectorAll(".radical");
const btnReset = document.getElementById("btn-reset");

const nodeLeftBox = document.getElementById("node-left");
const nodeRightBox = document.getElementById("node-right");
const nodeLeftText = document.querySelector("#node-left .node-content");
const nodeRightText = document.querySelector("#node-right .node-content");
const nodeResultBox = document.getElementById("node-result");
const nodeResultText = document.querySelector("#node-result .node-content");

const analysisResult = document.getElementById("analysis-result");
const analysisType = document.getElementById("analysis-type");
const analysisLogic = document.getElementById("analysis-logic");
const compLeft = document.getElementById("comp-left");
const compRight = document.getElementById("comp-right");
const canvasStatus = document.getElementById("canvas-status");
const synthesesList = document.getElementById("known-syntheses-list");

const cangjieDictionary = {
  木木: {
    result: "林",
    type: "Associate Compound",
    logic: "Wood + Wood = Forest",
    en: "Lin - Woods",
  },
  水木: {
    result: "沐",
    type: "Phono-semantic",
    logic: "Water + Wood",
    en: "Mu - To Wash",
  },
  火木: {
    result: "焚",
    type: "Associate Compound",
    logic: "Fire above Wood = Burn",
    en: "Fen - To Burn",
  },
  日月: {
    result: "明",
    type: "Associate Compound",
    logic: "Sun + Moon = Clarity",
    en: "Ming - Bright",
  },
  人二: {
    result: "仁",
    type: "Associate Compound",
    logic: "Person + Two",
    en: "Ren - Benevolence",
  },
};

let unlockedSyntheses = new Set();

function initSynthesesList() {
  if (!synthesesList) return;
  synthesesList.innerHTML = "";
  for (const [key, data] of Object.entries(cangjieDictionary)) {
    const li = document.createElement("li");
    const formula = `${key.charAt(0)} + ${key.charAt(1)}`;
    li.innerText = `${formula} → ${data.result}`;
    li.id = `synth-${data.result}`;
    synthesesList.appendChild(li);
  }
}
initSynthesesList();

radicals.forEach((btn) => {
  btn.setAttribute("draggable", "true");

  btn.addEventListener("dragstart", (e) => {
    const targetBtn = e.target.closest(".radical");

    const pureChar = targetBtn.getAttribute("data-value");

    e.dataTransfer.setData("text/plain", pureChar);
    targetBtn.classList.add("dragging");
  });

  btn.addEventListener("dragend", (e) => {
    e.target.closest(".radical").classList.remove("dragging");
  });
});

const dropZones = [nodeLeftBox, nodeRightBox];

dropZones.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("drag-over-active");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("drag-over-active");
  });

  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("drag-over-active");

    const char = e.dataTransfer.getData("text/plain");

    if (char) {
      const textElement = zone.querySelector(".node-content");

      textElement.innerText = char;
      textElement.classList.remove("placeholder");

      if (zone.id === "node-left") {
        compLeft.innerText = char;
        canvasStatus.innerText = "ANALYZING.NODE.01";
      } else {
        compRight.innerText = char;
        canvasStatus.innerText = "ANALYZING.NODE.02";
      }

      checkSynthesis();
    }
  });
});

function checkSynthesis() {
  const leftVal = nodeLeftText.innerText;
  const rightVal = nodeRightText.innerText;

  if (leftVal !== "EMPTY" && rightVal !== "EMPTY") {
    canvasStatus.innerText = "SYNTHESIS.COMPLETE";
    const combination = leftVal + rightVal;
    const data = cangjieDictionary[combination];

    if (data) {
      nodeResultText.innerText = data.result;
      nodeResultText.classList.remove("placeholder");
      nodeResultBox.classList.add("synthesis-success");

      analysisResult.innerText = `${data.result} (${data.en})`;
      analysisType.innerText = data.type;
      analysisLogic.innerText = data.logic;

      unlockedSyntheses.add(data.result);
      const listItem = document.getElementById(`synth-${data.result}`);
      if (listItem) listItem.classList.add("unlocked");
    } else {
      nodeResultText.innerText = "?";
      nodeResultText.classList.remove("placeholder");
      nodeResultBox.classList.remove("synthesis-success");
      analysisResult.innerText = "UNKNOWN ORIGIN";
      analysisType.innerText = "ERR: UNDEFINED";
      analysisLogic.innerText = "No matching protocol found.";
    }
  }
}

/* RESET*/

function resetLab() {
  nodeLeftText.innerHTML = "EMPTY";
  nodeLeftText.classList.add("placeholder");
  nodeRightText.innerHTML = "EMPTY";
  nodeRightText.classList.add("placeholder");
  nodeResultText.innerHTML = "PENDING";
  nodeResultText.classList.add("placeholder");
  nodeResultBox.classList.remove("synthesis-success");

  analysisResult.innerText = "-- Awaiting input --";
  analysisType.innerText = "_ _ _ _ _";
  analysisLogic.innerText = "_ _ : _ _ : _ _";
  compLeft.innerText = "--";
  compRight.innerText = "--";
  canvasStatus.innerText = "AWAITING.INPUT";
}

if (btnReset) btnReset.addEventListener("click", resetLab);

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("onboarding-modal");
  const closeBtn = document.getElementById("close-modal");

  if (!localStorage.getItem("hasSeenLogicLab")) {
    modal.style.display = "flex";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      localStorage.setItem("hasSeenLogicLab", "true");
    });
  }
});

function handleDragStart(e) {
  let val = e.target.getAttribute("data-value");
  e.dataTransfer.setData("text/plain", val);
}
