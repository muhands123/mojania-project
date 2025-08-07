import { HabitsSystem } from './modules/habitsSystem.js';
import { PointsSystem } from './modules/pointsSystem.js';

class MojaniaApp {
    constructor() {
        this.habitsSystem = new HabitsSystem();
        this.pointsSystem = new PointsSystem();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // زر إضافة عادة
        document.getElementById('add-habit-btn').addEventListener('click', () => {
            const habitText = prompt('ما العادة الجديدة التي تريد إضافتها؟');
            if (habitText) {
                this.habitsSystem.addHabit(habitText, this.pointsSystem);
            }
        });
    }
}

// تشغيل التطبيق عند تحميل الصفحة
new MojaniaApp();
