document.addEventListener("click", function enableAudio() {
    document.removeEventListener("click", enableAudio); // 只需要點擊一次就啟動
    console.log("🔊 使用者已互動，音效可以播放！");
});

document.addEventListener("DOMContentLoaded", function () {
const logoTeamElements = document.querySelectorAll(".logo-team");
const staticNoise = document.querySelector(".static-noise");
const nmixxText = document.querySelector(".nmixx-text");
const video = document.getElementById("background-video");
const videoLayer = document.querySelector(".video-layer");

let totalDelay = 2; // 定義總延遲時間
let totalLogoTime = 2; // 計算總 logo-team 的動畫時間
let fadeOutDelay = totalLogoTime + totalDelay * 1000; // 設定 fade-out 時間
let nmixxTextDelay = 2000 + fadeOutDelay + 1000; // 設定 nmixx-text 出現時間

// 延遲讓雜訊動畫淡出
setTimeout(() => {
    staticNoise.classList.add("fade-out");
}, totalLogoTime);


document.getElementById("start-button").addEventListener("click", function () {
    const overlay = document.getElementById("click-overlay");
    overlay.style.display = "none";

    // 顯示並播放影片
    videoLayer.style.display = "flex";
    video.play().then(() => {
        const videoDuration = video.duration * 1000; // 轉換為毫秒
        const additionalDelay = 1000; // 額外延遲 1 秒
        const totalDelay = videoDuration + additionalDelay;
        
        // 雜訊動畫
        staticNoise.classList.remove("fade-out");
        setTimeout(() => {
            videoLayer.style.display = "none";
            document.querySelector(".contain").style.display = "flex";
            staticNoise.classList.add("fade-out");
        }, totalDelay);
        // NMIXX 文字
        setTimeout(() => {
            nmixxText.classList.add("textEffect");
        }, totalDelay + 1000);
    }).catch(error => {
        console.error("影片播放失敗:", error);
    });
});
});