export class TitlesSystem {
  constructor(pointsSystem) {
    this.pointsSystem = pointsSystem;
  }

  generateTitles(keyword) {
    const titles = [
      `أفضل 5 نصائح عن ${keyword}`,
      `كيف تتعلم ${keyword} بسرعة`,
      `الأسرار الخفية لـ ${keyword}`,
      `دليل المبتدئين إلى ${keyword}`,
      `${keyword}: من الصفر إلى الاحتراف`
    ];

    const container = document.getElementById('titles-result');
    container.innerHTML = titles.map(title => `
      <div class="title-item">
        <p>${title}</p>
        <button class="copy-btn" data-title="${title}">نسخ</button>
      </div>
    `).join('');

    // حدث النسخ
    container.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.target.dataset.title;
        navigator.clipboard.writeText(title)
          .then(() => {
            this.pointsSystem.addPoints(5, 'titles');
            e.target.textContent = 'تم النسخ!';
            setTimeout(() => {
              e.target.textContent = 'نسخ';
            }, 2000);
          });
      });
    });
  }
}
