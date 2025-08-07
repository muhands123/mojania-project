export class PointsSystem {
    constructor() {
        this.points = this.loadPoints();
        this.resetDailyLimitsIfNewDay();
        this.updateDisplay();
    }

    loadPoints() {
        return parseInt(localStorage.getItem('mojania-points')) || 0;
    }

    loadDailyLimits() {
        return JSON.parse(localStorage.getItem('mojania-daily-limits')) || 
            { date: new Date().toDateString(), titles: 0, habits: 0 };
    }

    resetDailyLimitsIfNewDay() {
        const saved = this.loadDailyLimits();
        const today = new Date().toDateString();
        
        if (saved.date !== today) {
            this.dailyLimits = { date: today, titles: 0, habits: 0 };
        } else {
            this.dailyLimits = saved;
        }
        this.saveDailyLimits();
    }

    canEarnPoints(type) {
        return this.dailyLimits[type] < 5;
    }

    addPoints(amount, type) {
        if (!this.canEarnPoints(type)) {
            this.showNotification(`لقد وصلت للحد اليومي (5/5) لـ ${type === 'title' ? 'العناوين' : 'العادات'}`);
            return false;
        }

        this.points += amount;
        this.dailyLimits[type] += 1;
        
        this.saveAllData();
        this.showPointsEffect(amount);
        this.checkMilestones();
        return true;
    }

    saveAllData() {
        localStorage.setItem('mojania-points', this.points);
        this.saveDailyLimits();
        this.updateDisplay();
    }

    saveDailyLimits() {
        localStorage.setItem('mojania-daily-limits', JSON.stringify(this.dailyLimits));
    }

    showPointsEffect(amount) {
        const effect = document.createElement('div');
        effect.className = 'points-effect';
        effect.textContent = `+${amount} نقاط!`;
        document.getElementById('effects-container').appendChild(effect);
        
        setTimeout(() => effect.remove(), 2000);
    }

    checkMilestones() {
        if (this.points === 100) {
            this.showSpecialEffect('🎉', 'واو');
        } else if (this.points === 500) {
            this.showSpecialEffect('💖', 'نايس');
        }
    }

    showSpecialEffect(emoji, soundText) {
        const effect = document.createElement('div');
        effect.className = 'special-effect';
        effect.innerHTML = emoji;
        document.getElementById('effects-container').appendChild(effect);
        
        console.log(soundText); // يمكن استبدالها بتشغيل صوت لاحقًا
        setTimeout(() => effect.remove(), 3000);
    }

    updateDisplay() {
        const pointsElement = document.getElementById('points-counter');
        if (pointsElement) {
            pointsElement.textContent = this.points;
        }
    }
}
