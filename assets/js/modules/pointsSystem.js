export class PointsSystem {
    constructor() {
        this.points = this.loadPoints();
        this.today = new Date().toDateString();
        this.dailyLimits = this.loadDailyLimits();
        this.updateDisplay();
    }

    // تحميل النقاط
    loadPoints() {
        return parseInt(localStorage.getItem('mojania-points')) || 0;
    }

    // تحميل الحدود اليومية
    loadDailyLimits() {
        const saved = JSON.parse(localStorage.getItem('mojania-daily-limits')) || { 
            date: '', 
            titles: 0, 
            habits: 0 
        };
        
        // إعادة التعيين إذا كان يوم جديد
        if (saved.date !== this.today) {
            return { date: this.today, titles: 0, habits: 0 };
        }
        
        return saved;
    }

    // إضافة النقاط
    addPoints(amount, type) {
        // التحقق من الحد اليومي
        if (this.dailyLimits[type + 's'] >= 5) {
            this.showNotification(`وصلت للحد اليومي (5/5) لـ ${type === 'title' ? 'العناوين' : 'العادات'}`);
            return;
        }

        // إضافة النقاط
        this.points += amount;
        this.dailyLimits[type + 's']++;
        this.dailyLimits.date = this.today;
        
        // الحفظ والتحديث
        this.saveData();
        this.showPointsEffect(amount);
        this.checkMilestones();
    }

    // حفظ البيانات
    saveData() {
        localStorage.setItem('mojania-points', this.points);
        localStorage.setItem('mojania-daily-limits', JSON.stringify(this.dailyLimits));
        this.updateDisplay();
    }

    // عرض تأثير النقاط
    showPointsEffect(amount) {
        const effect = document.createElement('div');
        effect.className = 'points-effect';
        effect.textContent = `+${amount} نقاط!`;
        document.getElementById('effects-container').appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 2000);
    }

    // التحقق من الإنجازات
    checkMilestones() {
        if (this.points >= 100 && this.points < 105) {
            this.showSpecialEffect('🎉', 'واو');
        } else if (this.points >= 500 && this.points < 505) {
            this.showSpecialEffect('💖', 'نايس');
        }
    }

    // عرض تأثير خاص
    showSpecialEffect(emoji, soundText) {
        const effect = document.createElement('div');
        effect.className = 'special-effect';
        effect.textContent = emoji;
        document.getElementById('effects-container').appendChild(effect);
        
        // يمكنك إضافة ملفات صوتية لاحقًا
        console.log(soundText); // سيظهر في الكونسول
        
        setTimeout(() => {
            effect.remove();
        }, 3000);
    }

    // تحديث عرض النقاط
    updateDisplay() {
        document.getElementById('points-counter').textContent = this.points;
    }
}
