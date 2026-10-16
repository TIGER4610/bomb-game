const startButton = document.getElementById("startButton");
const message = document.getElementById("message");
const sequence = document.getElementById("sequence");
const buttons = document.getElementById("buttons");
const stageText = document.getElementById("stage");
const clearMessage = document.getElementById("clearMessage");

let gameCompleted = false;

// 色の情報
const colorList = [
    {
        name: "red",
        code: "#ff4d4d"
    },
    {
        name: "blue",
        code: "#4d79ff"
    },
    {
        name: "green",
        code: "#4dff88"
    },
    {
        name: "yellow",
        code: "#ffd84d"
    }
];


const shapeList = [
    "★",
    "▲",
    "●",
    "■",
    "◆"
];


// 現在のステージ
let currentStage = 1;

// 正解の順番
let correctOrder = [];

// 現在何個目まで押したか
let currentIndex = 0;

// 今回の問題
let currentItems = [];


// START
startButton.addEventListener("click", function() {

    // 完全クリア後なら最初の画面に戻す
    if (gameCompleted) {

        resetToTitle();

    }
    else {

        startGame();

    }

});


// ゲーム開始
function startGame() {
    gameCompleted = false;

    currentIndex = 0;

    clearMessage.innerHTML = "";

    document.getElementById("howToPlay").style.display = "none";

    sequence.innerHTML = "";
    buttons.innerHTML = "";

    startButton.style.display = "none";

    stageText.textContent =
    "STAGE " + currentStage + " / 5";

    message.textContent = "準備してください！";

    document.body.classList.remove("mission-failed", "mission-clear");

    let remaining = 3;
    const countdown = document.createElement("div");
    countdown.classList.add("start-countdown");
    countdown.setAttribute("role", "status");
    countdown.setAttribute("aria-live", "polite");
    countdown.textContent = remaining;
    sequence.appendChild(countdown);

    function advanceCountdown() {
        remaining--;
        if (remaining > 0) {
            countdown.textContent = remaining;
            setTimeout(advanceCountdown, 1000);
        } else {
            sequence.innerHTML = "";
            beginMemorizing();
        }
    }

    setTimeout(advanceCountdown, 1000);
}

function beginMemorizing() {
    message.textContent = "この順番を覚えてください！";


    // 問題を作る
    createQuestion();


    // 覚える順番を表示
    showSequence();


    // 記憶する時間は4秒
    setTimeout(function() {

        sequence.innerHTML = "";

        message.textContent =
            "覚えた順番にタップしてください！";

        showAnswerButtons();

    }, 4000);

}


// 問題を作る
function createQuestion() {

    currentItems = [];


    // STAGE 1
    if (currentStage === 1) {

        currentItems = [
            {
                color: "red",
                shape: ""
            },
            {
                color: "blue",
                shape: ""
            },
            {
                color: "green",
                shape: ""
            }
        ];

    }


    // STAGE 2
    else if (currentStage === 2) {

        currentItems = [
            {
                color: "red",
                shape: ""
            },
            {
                color: "blue",
                shape: ""
            },
            {
                color: "green",
                shape: ""
            },
            {
                color: "yellow",
                shape: ""
            }
        ];

    }


    // STAGE 3
    else if (currentStage === 3) {

        currentItems = [
            {
                color: "red",
                shape: "★"
            },
            {
                color: "blue",
                shape: "▲"
            },
            {
                color: "green",
                shape: "●"
            },
            {
                color: "yellow",
                shape: "■"
            }
        ];

    }

    // STAGE 4
else if (currentStage === 4) {

    currentItems = [
        {
            color: "red",
            shape: "★"
        },
        {
            color: "red",
            shape: "●"
        },
        {
            color: "blue",
            shape: "▲"
        },
        {
            color: "green",
            shape: "★"
        },
        {
            color: "yellow",
            shape: "■"
        }
    ];

}


// STAGE 5
else if (currentStage === 5) {

    currentItems = [
        {
            color: "blue",
            shape: "◆"
        },
        {
            color: "red",
            shape: "●"
        },
        {
            color: "yellow",
            shape: "▲"
        },
        {
            color: "blue",
            shape: "■"
        },
        {
            color: "green",
            shape: "★"
        },
        {
            color: "red",
            shape: "▲"
        }
    ];

}

    // 順番をランダムにする
    currentItems.sort(() => Math.random() - 0.5);


    // 正解順
    correctOrder = [];

    for (let i = 0; i < currentItems.length; i++) {

        correctOrder.push(i);

    }

}


// 記憶画面
function showSequence() {
    const columns = currentItems.length > 4
        ? Math.ceil(currentItems.length / 2)
        : currentItems.length;
    sequence.style.setProperty("--item-count", columns);

    for (let i = 0; i < currentItems.length; i++) {

        const item = currentItems[i];

        const memoryItem = createMemoryItem(item);

        const step = document.createElement("div");
        step.classList.add("sequence-step");
        const row = Math.floor(i / columns);
        const column = row === 0 ? i + 1 : columns - (i % columns);
        step.style.gridRow = row + 1;
        step.style.gridColumn = column;
        step.appendChild(memoryItem);
        sequence.appendChild(step);


        // 矢印
        if (i < currentItems.length - 1) {

            const arrow = document.createElement("span");

            const nextRow = (i + 1) % columns === 0;
            arrow.textContent = nextRow ? "↓" : row === 0 ? "→" : "←";

            arrow.classList.add("sequence-arrow");
            if (nextRow) arrow.classList.add("sequence-arrow-down");
            else if (row > 0) arrow.classList.add("sequence-arrow-left");
            arrow.setAttribute("aria-hidden", "true");

            step.appendChild(arrow);

        }

    }

}


// 色付き丸を作る
function createMemoryItem(item) {

    const element = document.createElement("div");

    element.classList.add("memory-item");

    element.style.backgroundColor =
        getColorCode(item.color);

    // STAGE 1・2は形なし
    if (item.shape !== "") {

        const shapeImage = document.createElement("img");

        shapeImage.classList.add("memory-shape");

        if (item.shape === "★") {
            shapeImage.src = "images/star.png";
        }
        else if (item.shape === "▲") {
            shapeImage.src = "images/triangle.png";
        }
        else if (item.shape === "●") {
            shapeImage.src = "images/circle.png";
        }
        else if (item.shape === "■") {
            shapeImage.src = "images/square.png";
        }
        else if (item.shape === "◆") {
            shapeImage.src = "images/diamond.png";
        }

        shapeImage.alt = "";

        element.appendChild(shapeImage);

    }

    return element;

}


// 色コード
function getColorCode(colorName) {

    if (colorName === "red") {
        return "#ff4d4d";
    }

    if (colorName === "blue") {
        return "#4d79ff";
    }

    if (colorName === "green") {
        return "#4dff88";
    }

    if (colorName === "yellow") {
        return "#ffd84d";
    }

}


// 回答ボタン
function showAnswerButtons() {

    const shuffledItems = [...currentItems];

    shuffledItems.sort(() => Math.random() - 0.5);


    for (let i = 0; i < shuffledItems.length; i++) {

        const item = shuffledItems[i];

        const button = document.createElement("button");

        button.classList.add("color-button");


        // 色付き丸を作る
        const memoryItem = createMemoryItem(item);

        button.appendChild(memoryItem);


        // 正解順の番号
        button.dataset.index =
            currentItems.indexOf(item);


        // タップ
        button.addEventListener("click", function() {

            const selectedIndex =
                Number(button.dataset.index);


            // 正解
            if (
                selectedIndex ===
                correctOrder[currentIndex]
            ) {

                currentIndex++;

                button.style.opacity = "0.5";

                button.disabled = true;


                // 全部正解
                if (
                    currentIndex ===
                    correctOrder.length
                ) {

                    buttons.innerHTML = "";


                    if (currentStage < 5) {

                        message.innerHTML = `
                            <img src="images/cracker.png" alt="" class="message-icon">
                            STAGE ${currentStage} CLEAR!
                        `;

                        currentStage++;

                        startButton.textContent =
                            "STAGE " +
                            currentStage +
                            "へ";

                        startButton.style.display =
                            "inline-block";

                    }

                    else {

    message.textContent =
        "BOMB DEFUSED!";

    clearMessage.innerHTML = `
        <h2>
            <img src="images/trophy.png" alt="" class="clear-trophy">
            完全クリア！
        </h2>
        <p>スタッフにこの画面を見せてください</p>
        <p>景品を受け取ってください！</p>
    `;

    clearMessage.style.display = "block";

    sequence.innerHTML = "";

    buttons.innerHTML = "";

    startButton.textContent =
        "最初に戻る";

    startButton.style.display =
        "inline-block";

    gameCompleted = true;

    currentStage = 1;

}

                }

            }


            // 不正解
            else {

                message.innerHTML = `
                    <span>BOOM！解除失敗！<img src="images/explosion.png" alt="" class="message-icon"></span>
                `;

                buttons.innerHTML = "";

                startButton.textContent =
                    "もう一度挑戦";

                startButton.style.display =
                    "inline-block";

                currentStage = 1;

            }

        });


        buttons.appendChild(button);

    }

}

function resetToTitle() {

    gameCompleted = false;

    currentStage = 1;

    currentIndex = 0;

    correctOrder = [];

    currentItems = [];


    // 表示を初期状態に戻す
    stageText.textContent = "STAGE 1";

    message.textContent =
        "爆弾を解除しよう！";

    sequence.innerHTML = "";

    buttons.innerHTML = "";

    clearMessage.innerHTML = "";
    clearMessage.style.display = "none";

    document.getElementById("howToPlay").style.display = "block";


    // STARTボタンに戻す
    startButton.textContent =
        "START";

    startButton.style.display =
        "inline-block";

}

// 演出はゲームの判定から独立させる。
(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = document.createElement("canvas");
    canvas.id = "effects";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const hud = document.createElement("div");
    hud.className = "effects-hud";
    hud.innerHTML = '<span class="mission-label">BOMB DEFUSAL // MEMORY MISSION</span><button class="sound-toggle" type="button" aria-pressed="false">SOUND OFF</button><div class="memory-clock" hidden><span>MEMORIZE</span><strong>4.0</strong><div class="clock-track"><i></i></div></div>';
    document.querySelector(".game").prepend(hud);
    const clock = hud.querySelector(".memory-clock");
    const clockNumber = clock.querySelector("strong");
    const clockBar = clock.querySelector("i");
    const soundButton = hud.querySelector("button");
    let sound = false, audio, particles = [], frame = 0, countdownFrame = 0;
    let width = 0, height = 0, previousTime = 0;
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();
    function tone(frequency, duration = 0.12, type = "sine", delay = 0) {
        if (!sound || !audio) return;
        const oscillator = audio.createOscillator(), gain = audio.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        const time = audio.currentTime + delay;
        gain.gain.setValueAtTime(0.045, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        oscillator.connect(gain); gain.connect(audio.destination);
        oscillator.start(time); oscillator.stop(time + duration);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    }
    soundButton.addEventListener("click", () => {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioClass) { soundButton.textContent = "SOUND UNAVAILABLE"; return; }
        try {
            audio ||= new AudioClass();
            audio.resume().catch(() => {});
            sound = !sound;
            soundButton.textContent = sound ? "SOUND ON" : "SOUND OFF";
            soundButton.setAttribute("aria-pressed", String(sound));
            tone(660);
        } catch { soundButton.textContent = "SOUND UNAVAILABLE"; }
    });
    function animate(time) {
        const step = Math.min((time - previousTime) / 16.67 || 1, 2);
        previousTime = time;
        ctx.clearRect(0, 0, width, height);
        particles = particles.filter(p => p.life > 0);
        for (const p of particles) {
            p.x += p.vx * step; p.y += p.vy * step;
            p.vy += (p.fire ? 0.035 : 0.10) * step; p.life -= step;
            ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 30));
            ctx.fillStyle = p.color;
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.life * 0.09);
            if (p.fire) {
                ctx.shadowBlur = 18;
                ctx.shadowColor = p.color;
                ctx.beginPath();
                ctx.arc(0, 0, p.size * Math.max(0.2, p.life / p.maxLife), 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            }
            ctx.restore();
        }
        ctx.globalAlpha = 1;
        if (particles.length) frame = requestAnimationFrame(animate);
        else { frame = 0; ctx.clearRect(0, 0, width, height); }
    }
    function burst(x, y, colors, count = 70, power = 8) {
        if (reducedMotion.matches || document.hidden) return;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2, speed = 2 + Math.random() * power;
            particles.push({x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 3,
                life: 40 + Math.random() * 45, size: 3 + Math.random() * 6, color: colors[i % colors.length]});
        }
        particles = particles.slice(-350);
        if (!frame) { previousTime = performance.now(); frame = requestAnimationFrame(animate); }
    }
    function stopClock() {
        cancelAnimationFrame(countdownFrame); countdownFrame = 0;
        clock.hidden = true;
        document.body.classList.remove("memorizing");
    }
    function explode() {
        if (!reducedMotion.matches && !document.hidden) {
            const colors = ["#fff2b0", "#ffd34d", "#ff8a24", "#ff3c18", "#842b24"];
            for (let i = 0; i < 160; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 3 + Math.random() * 22;
                const life = 35 + Math.random() * 55;
                particles.push({x: width / 2, y: height * 0.45,
                    vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 2,
                    life, maxLife: life, size: 5 + Math.random() * 16,
                    color: colors[i % colors.length], fire: true});
            }
            burst(width / 2, height * 0.45, ["#ffb52e", "#ffe9a3", "#ff5224"], 150, 27);
        }
        tone(95, 0.85, "sawtooth");
        tone(42, 1.2, "triangle");
        tone(55, 0.65, "sawtooth", 0.12);
    }
    function startClock() {
        stopClock(); clock.hidden = false;
        document.body.classList.remove("mission-failed", "mission-clear");
        document.body.classList.add("memorizing");
        const start = performance.now();
        let lastTick = 5;
        function tick(now) {
            const remaining = Math.max(0, 4 - (now - start) / 1000);
            clockNumber.textContent = remaining.toFixed(1);
            clockBar.style.transform = `scaleX(${remaining / 4})`;
            const second = Math.ceil(remaining);
            if (second !== lastTick) { tone(remaining < 1 ? 880 : 440, 0.07); lastTick = second; }
            if (remaining > 0) countdownFrame = requestAnimationFrame(tick);
        }
        countdownFrame = requestAnimationFrame(tick);
    }
    new MutationObserver(() => {
        const text = message.textContent;
        if (text.includes("この順番")) startClock();
        else {
            stopClock();
            if (text.includes("CLEAR") || text.includes("DEFUSED")) {
                const final = text.includes("DEFUSED");
                document.body.classList.add("mission-clear");
                burst(width / 2, height * 0.4, ["#72ffb2", "#ffe47c", "#6ce8ff", "#f8a2ff"], final ? 200 : 95, final ? 13 : 8);
                [523, 659, 784, 1047].forEach((n, i) => tone(n, 0.22, "sine", i * 0.12));
            } else if (text.includes("BOOM")) {
                document.body.classList.add("mission-failed");
                explode();
            } else if (text.includes("爆弾を解除")) {
                document.body.classList.remove("mission-clear", "mission-failed");
            }
        }
    }).observe(message, {childList: true, subtree: true, characterData: true});
    buttons.addEventListener("click", event => {
        const button = event.target.closest(".color-button");
        if (!button) return;
        if (button.disabled) {
            const rect = button.getBoundingClientRect();
            burst(rect.x + rect.width / 2, rect.y + rect.height / 2, ["#72ffb2", "#6ce8ff"], 18, 3);
            tone(700 + currentIndex * 100, 0.08);
        }
    });
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(frame); frame = 0; particles = [];
            ctx.clearRect(0, 0, width, height);
        }
    });
})();
