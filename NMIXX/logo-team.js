    // 選取所有 .logo-team
    const logoTeamElements = document.querySelectorAll('.logo-team');

    let totalDelay = 2;
    // 設定每個 .logo-team 的動畫延遲
    logoTeamElements.forEach((logoTeam, index) => {
      const delay = 1 + index * 0.5; // 每個 .logo-team 增加 0.5 秒的延遲
      totalDelay += 1 + 0.5;

      logoTeam.style.animationDelay = `${delay}s`;

      setTimeout(() => {
        logoTeam.classList.add('play-text'); // 添加啟用文字動畫的類
      }, delay * 1000); // 計算實際的動畫時間
    });