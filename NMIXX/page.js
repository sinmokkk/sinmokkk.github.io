const screen = document.querySelector(".screen");
const pages = document.querySelectorAll(".page");
const radioInputs = document.querySelectorAll(".pagination input");
const pacman = document.querySelector(".pacman");
const labels = document.querySelectorAll(".pagination label");

let isScrolling = false;
let currentPageIndex = 0; // 追踪當前頁面索引

function scrollToPage(index) {
    // 確保索引在有效範圍內
    if (index < 0) {
        index = 0;
    } else if (index >= pages.length) {
        index = pages.length - 1;
    }

    isScrolling = true;
    currentPageIndex = index; // 更新當前頁面索引
    const scrollLeft = pages[index].offsetLeft;
    
    screen.scrollTo({
        left: scrollLeft,
        behavior: "smooth"
    });
    
    updatePacmanPosition(index);
    
    setTimeout(() => {
        isScrolling = false;
    }, 600);
}

function updatePacmanPosition(index) {
    const label = labels[index];
    const offsetLeft = label.offsetLeft;
    pacman.style.transform = `translateX(${offsetLeft}px)`;
    pacman.classList.add("waka");
    
    setTimeout(() => {
        pacman.classList.remove("waka");
    }, 1000);
}

// 添加鍵盤事件監聽器
document.addEventListener('keydown', (event) => {
    if (isScrolling) return; // 如果正在滾動中，不處理按鍵事件

    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault(); // 防止頁面默認滾動
            scrollToPage(currentPageIndex - 1);
            break;
        case 'ArrowRight':
            event.preventDefault();
            scrollToPage(currentPageIndex + 1);
            break;
    }
});

// 使用 IntersectionObserver 監聽當前頁面
const observer = new IntersectionObserver(
    (entries) => {
        if (isScrolling) return;
        
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(pages).indexOf(entry.target);
                if (index !== -1) {
                    currentPageIndex = index; // 更新當前頁面索引
                    radioInputs[index].checked = true;
                    updatePacmanPosition(index);
                }
            }
        });
    },
    { root: screen, threshold: 0.8 }
);

// 監聽所有 .page
pages.forEach((page) => observer.observe(page));