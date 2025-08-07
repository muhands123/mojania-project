// الفئة الرئيسية لنظام العادات
export class HabitsSystem {
  constructor() {
    // تحميل العادات عند البدء
    this.habits = this.loadHabits();
    
    // تهيئة الواجهة
    this.initUI();
    
    // إعداد مستمعين الأحداث
    this.setupEventListeners();
  }

  // دالة لتحميل العادات من الذاكرة المحلية
  loadHabits() {
    const savedHabits = localStorage.getItem('mojania-habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  }

  // دالة لحفظ العادات في الذاكرة المحلية
  saveHabits() {
    localStorage.setItem('mojania-habits', JSON.stringify(this.habits));
  }

  // دالة لتهيئة واجهة المستخدم
  initUI() {
    const habitsList = document.getElementById('habits-list');
    
    if (this.habits.length === 0) {
      habitsList.innerHTML = `
        <div class="empty-state">
          <img src="assets/images/no-habits.svg" alt="لا توجد عادات">
          <p>لا توجد عادات مسجلة بعد</p>
        </div>
      `;
    } else {
      habitsList.innerHTML = this.habits.map((habit, index) => `
        <div class="habit-item ${habit.completed ? 'completed' : ''}" data-id="${index}">
          <div class="habit-checkbox">
            <input type="checkbox" ${habit.completed ? 'checked' : ''}>
            <span class="checkmark"></span>
          </div>
          <span class="habit-text">${habit.text}</span>
          <button class="delete-btn" aria-label="حذف العادة">
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>
          </button>
        </div>
      `).join('');
    }
  }

  // دالة لإضافة عادة جديدة
  addHabit(habitText) {
    if (habitText.trim() === '') return;
    
    this.habits.push({
      text: habitText,
      completed: false,
      createdAt: new Date().toISOString()
    });
    
    this.saveHabits();
    this.initUI();
  }

  // دالة لحذف عادة
  deleteHabit(index) {
    this.habits.splice(index, 1);
    this.saveHabits();
    this.initUI();
  }

  // دالة لتحديث حالة العادة (مكتملة/غير مكتملة)
  toggleHabit(index) {
    this.habits[index].completed = !this.habits[index].completed;
    this.saveHabits();
    this.updatePoints();
  }

  // دالة لتحديث النقاط عند إكمال العادة
  updatePoints() {
    // سنربط هذا بنظام النقاط لاحقًا
    console.log('تم تحديث النقاط!');
  }

  // دالة لإعداد مستمعين الأحداث
  setupEventListeners() {
    document.addEventListener('click', (e) => {
      // عند النقر على زر الحذف
      if (e.target.closest('.delete-btn')) {
        const habitItem = e.target.closest('.habit-item');
        const habitId = parseInt(habitItem.dataset.id);
        this.deleteHabit(habitId);
      }
      
      // عند النقر على زر التأشير
      if (e.target.closest('.habit-checkbox')) {
        const habitItem = e.target.closest('.habit-item');
        const habitId = parseInt(habitItem.dataset.id);
        this.toggleHabit(habitId);
      }
    });
  }
}
