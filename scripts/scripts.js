/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

/* TIME MACHINE */

const slider = document.getElementById("timeline-slider");
const charDisplay = document.getElementById("character-display");
const stageIndicator = document.getElementById("stage-indicator");
const contextTitle = document.getElementById("context-title");
const contextSubtitle = document.getElementById("context-subtitle");
const contextDesc = document.getElementById("context-desc");

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

/* LOGIC LAB*/
