// استيراد الأنظمة الفرعية
import { HabitsSystem } from './modules/habitsSystem.js';
import { PointsSystem } from './modules/pointsSystem.js';

// الفئة الرئيسية للتطبيق
class MojaniaApp {
  constructor() {
    this.initSystems();
    this.setupEventListeners();
    console.log('تم تحميل التطبيق بنجاح!');
  }

  initSystems() {
    // تهيئة أنظمة التطبيق
    this.habitsSystem = new HabitsSystem();
    this.pointsSystem = new PointsSystem();
    
    // تحديث واجهة المستخدم أول مرة
    this.updateUI();
  }

  setupEventListeners() {
    // الاستماع للنقر على زر إضافة عادة
    document.addEventListener('click', (e) => {
      if (e.target.id === 'add-habit-btn') {
        this.showAddHabitModal();
      }
    });
  }

  showAddHabitModal() {
    // إنشاء واجهة إضافة عادة جديدة
    const modalHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <h3>إضافة عادة جديدة</h3>
          <input type="text" id="new-habit-input" placeholder="اكتب العادة هنا...">
          <button id="save-habit-btn">حفظ</button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  updateUI() {
    // تحديث عرض النقاط
    this.pointsSystem.updatePointsDisplay();
  }
}

// تشغيل التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const app = new MojaniaApp();
});
