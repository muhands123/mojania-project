// استيراد الأنظمة
import { HabitsSystem } from './modules/habitsSystem.js';
import { TitlesSystem } from './modules/titlesSystem.js';
import { PointsSystem } from './modules/pointsSystem.js';

class MojaniaApp {
    constructor() {
        // تهيئة الأنظمة
        this.pointsSystem = new PointsSystem();
        this.habitsSystem = new HabitsSystem(this.pointsSystem);
        this.titlesSystem = new TitlesSystem(this.pointsSystem);
        
        // إعداد الأحداث
        this.setupEventListeners();
    }

    setupEventListeners() {
        // زر إضافة عادة
        document.getElementById('add-habit-btn').addEventListener('click', () => {
            const habitText = prompt('ما العادة الجديدة التي تريد إضافتها؟');
            if (habitText) {
                this.habitsSystem.addHabit(habitText);
            }
        });

        // زر توليد العناوين
        document.getElementById('generate-btn').addEventListener('click', () => {
            const keyword = document.getElementById('title-input').value;
            if (keyword) {
                this.titlesSystem.generateTitles(keyword);
            }
        });
    }
}

// تشغيل التطبيق عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    const app = new MojaniaApp();
});
