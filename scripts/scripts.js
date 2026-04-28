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
const radicals = document.querySelectorAll('.radical');
const btnReset = document.getElementById('btn-reset');

// 获取插槽盒子和里面的文本元素
const nodeLeftBox = document.getElementById('node-left');
const nodeRightBox = document.getElementById('node-right');
const nodeLeftText = document.querySelector('#node-left .node-content');
const nodeRightText = document.querySelector('#node-right .node-content');
const nodeResultBox = document.getElementById('node-result');
const nodeResultText = document.querySelector('#node-result .node-content');

// 分析面板元素
const analysisResult = document.getElementById('analysis-result');
const analysisType = document.getElementById('analysis-type');
const analysisLogic = document.getElementById('analysis-logic');
const compLeft = document.getElementById('comp-left');
const compRight = document.getElementById('comp-right');
const canvasStatus = document.getElementById('canvas-status');
const synthesesList = document.getElementById('known-syntheses-list');

// 数据字典
const cangjieDictionary = {
  '木木': { result: '林', type: 'Associate Compound', logic: 'Wood + Wood = Forest', en: 'Lin - Woods' },
  '水木': { result: '沐', type: 'Phono-semantic', logic: 'Water + Wood', en: 'Mu - To Wash' },
  '火木': { result: '焚', type: 'Associate Compound', logic: 'Fire above Wood = Burn', en: 'Fen - To Burn' },
  '日月': { result: '明', type: 'Associate Compound', logic: 'Sun + Moon = Clarity', en: 'Ming - Bright' },
  '人二': { result: '仁', type: 'Associate Compound', logic: 'Person + Two', en: 'Ren - Benevolence' }
};

let unlockedSyntheses = new Set();

// 初始化右下角列表
function initSynthesesList() {
  if (!synthesesList) return;
  synthesesList.innerHTML = '';
  for (const [key, data] of Object.entries(cangjieDictionary)) {
    const li = document.createElement('li');
    const formula = `${key.charAt(0)} + ${key.charAt(1)}`;
    li.innerText = `${formula} → ${data.result}`;
    li.id = `synth-${data.result}`;
    synthesesList.appendChild(li);
  }
}
initSynthesesList();

// ------------------------------------------------
// A. 赋予底层部首“可被拖拽”的能力
// ------------------------------------------------
radicals.forEach(btn => {
  btn.setAttribute('draggable', 'true'); // 开启原生拖拽
  
  btn.addEventListener('dragstart', (e) => {
    // 把当前部首的汉字“打包”进剪贴板一样的数据流里
    e.dataTransfer.setData('text/plain', e.target.innerText);
    e.target.classList.add('dragging');
  });
  
  btn.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
  });
});

// ------------------------------------------------
// B. 设置左右插槽为“接收区”
// ------------------------------------------------
const dropZones = [nodeLeftBox, nodeRightBox];

dropZones.forEach(zone => {
  // 必须阻止默认事件，否则无法触发 drop
  zone.addEventListener('dragover', (e) => {
    e.preventDefault(); 
    zone.classList.add('drag-over-active');
  });

  // 鼠标移出接收区
  zone.addEventListener('dragleave', () => {
    zone.classList.remove('drag-over-active');
  });

  // 松开鼠标，完成掉落！
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over-active');

    // 提取刚才打包的汉字
    const char = e.dataTransfer.getData('text/plain');
    const textElement = zone.querySelector('.node-content');

    // 更新插槽 UI
    textElement.innerText = char;
    textElement.classList.remove('placeholder');

    // 更新右侧监控面板
    if (zone.id === 'node-left') {
        compLeft.innerText = char;
        canvasStatus.innerText = 'ANALYZING.NODE.01';
    } else {
        compRight.innerText = char;
        canvasStatus.innerText = 'ANALYZING.NODE.02';
    }

    // 每次掉落后，检查是否可以合成
    checkSynthesis();
  });
});

// ------------------------------------------------
// C. 合成判定逻辑
// ------------------------------------------------
function checkSynthesis() {
  const leftVal = nodeLeftText.innerText;
  const rightVal = nodeRightText.innerText;

  // 只有当左右两边都不是 EMPTY 时才触发合成
  if (leftVal !== 'EMPTY' && rightVal !== 'EMPTY') {
    canvasStatus.innerText = 'SYNTHESIS.COMPLETE';
    const combination = leftVal + rightVal;
    const data = cangjieDictionary[combination];

    if (data) {
      // 合成成功
      nodeResultText.innerText = data.result;
      nodeResultText.classList.remove('placeholder');
      nodeResultBox.classList.add('synthesis-success'); // 触发 CSS 微光动画

      analysisResult.innerText = `${data.result} (${data.en})`;
      analysisType.innerText = data.type;
      analysisLogic.innerText = data.logic;

      // 点亮右侧配方
      unlockedSyntheses.add(data.result);
      const listItem = document.getElementById(`synth-${data.result}`);
      if (listItem) listItem.classList.add('unlocked');
    } else {
      // 合成失败 (配方不存在)
      nodeResultText.innerText = '?';
      nodeResultText.classList.remove('placeholder');
      nodeResultBox.classList.remove('synthesis-success');
      analysisResult.innerText = 'UNKNOWN ORIGIN';
      analysisType.innerText = 'ERR: UNDEFINED';
      analysisLogic.innerText = 'No matching protocol found.';
    }
  }
}

/* RESET*/

function resetLab() {
  nodeLeftText.innerHTML = 'EMPTY';
  nodeLeftText.classList.add('placeholder');
  nodeRightText.innerHTML = 'EMPTY';
  nodeRightText.classList.add('placeholder');
  nodeResultText.innerHTML = 'PENDING';
  nodeResultText.classList.add('placeholder');
  nodeResultBox.classList.remove('synthesis-success');

  analysisResult.innerText = '-- Awaiting input --';
  analysisType.innerText = '_ _ _ _ _';
  analysisLogic.innerText = '_ _ : _ _ : _ _';
  compLeft.innerText = '--';
  compRight.innerText = '--';
  canvasStatus.innerText = 'AWAITING.INPUT';
}

if (btnReset) btnReset.addEventListener('click', resetLab);