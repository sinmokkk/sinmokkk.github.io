const jiwoo = document.getElementById("jiwoo");
const page = document.querySelector(".page");

document.addEventListener("mousemove", (event) => {
    const pageRect = page.getBoundingClientRect();
    const jiwooWidth = jiwoo.offsetWidth;
    const jiwooHeight = jiwoo.offsetHeight;

    // 取得滑鼠座標
    let x = event.clientX;
    let y = event.clientY;

    // 確保滑鼠在 page 內
    if (x >= pageRect.left && x <= pageRect.right &&
        y >= pageRect.top && y <= pageRect.bottom) {

        // 讓 jiwoo 的**中心點**對齊滑鼠
        const newX = x - pageRect.left - (jiwooWidth + page.offsetWidth ) / 2;
        const newY = y - pageRect.top - (jiwooHeight + page.offsetHeight) / 2;

        jiwoo.style.transform = `translate(${newX}px, ${newY}px)`;
    }
});