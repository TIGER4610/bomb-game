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

    message.textContent = "この順番を覚えてください！";


    // 問題を作る
    createQuestion();


    // 覚える順番を表示
    showSequence();


    // 3秒後
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

    for (let i = 0; i < currentItems.length; i++) {

        const item = currentItems[i];

        const memoryItem = createMemoryItem(item);

        sequence.appendChild(memoryItem);


        // 矢印
        if (i < currentItems.length - 1) {

            const arrow = document.createElement("span");

            arrow.textContent = "→";

            arrow.style.fontSize = "35px";

            sequence.appendChild(arrow);

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
                    <img src="images/explosion.png" alt="" class="message-icon">
                    BOOM! 解除失敗！
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