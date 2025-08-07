import { HabitsSystem } from './modules/habitsSystem.js';
import { PointsSystem } from './modules/pointsSystem.js';

class MojaniaApp {
  constructor() {
    this.habitsSystem = new HabitsSystem();
    this.pointsSystem = new PointsSystem();
    this.setupAddHabitModal();
  }

  setupAddHabitModal() {
    document.getElementById('add-habit-btn').addEventListener('click', () => {
      const habitText = prompt('أدخل العادة الجديدة:');
      if (habitText) {
        this.habitsSystem.addHabit(habitText);
      }
    });
  }
}

// تشغيل التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const app = new MojaniaApp();
});
