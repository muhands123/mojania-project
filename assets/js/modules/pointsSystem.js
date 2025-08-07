export class PointsSystem {
  constructor() {
    this.loadData();
    this.updateDisplay();
  }

  loadData() {
    // تحميل النقاط
    this.points = parseInt(localStorage.getItem('mojania-points')) || 0;
    
    // تحميل الحدود اليومية
    const savedLimits = JSON.parse(localStorage.getItem('mojania-limits')) || {};
    const today = new Date().toDateString();
    
    this.dailyLimits = {
      date: today,
      titles: (savedLimits.date === today) ? savedLimits.titles : 0,
      habits: (savedLimits.date === today) ? savedLimits.habits : 0
    };
  }

  saveData() {
    localStorage.setItem('mojania-points', this.points);
    localStorage.setItem('mojania-limits', JSON.stringify(this.dailyLimits));
  }

  addPoints(amount, type) {
    // التحقق من الحد اليومي
    if (this.dailyLimits[type] >= 5) {
      this.showNotification(`وصلت الحد اليومي (5/5) لـ ${type === 'titles' ? 'العناوين' : 'العادات'}`);
      return false;
    }

    // إضافة النقاط
    this.points += amount;
    this.dailyLimits[type] += 1;
    this.saveData();
    
    // التأثيرات
    this.showEffect(`+${amount} نقاط!`, 'points');
    if (this.points === 100) this.showEffect('🎉 إنجاز!', 'special');
    if (this.points === 500) this.showEffect('💖 مذهل!', 'special');
    
    this.updateDisplay();
    return true;
  }

  showEffect(text, type) {
    const effect = document.createElement('div');
    effect.className = `${type}-effect`;
    effect.textContent = text;
    document.getElementById('effects-container').appendChild(effect);
    
    setTimeout(() => effect.remove(), type === 'points' ? 2000 : 3000);
  }

  updateDisplay() {
    document.getElementById('points-counter').textContent = this.points;
  }

  showNotification(message) {
    alert(message); // يمكنك استبدال هذا بتنبيه أجمل لاحقاً
  }
}
