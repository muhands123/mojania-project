export class HabitsSystem {
  constructor() {
    this.habits = this.loadHabits();
    this.initUI();
  }

  loadHabits() {
    // جلب العادات من الذاكرة المحلية
    return JSON.parse(localStorage.getItem('mojania-habits')) || [];
  }

  initUI() {
    const habitsContainer = document.getElementById('habits-list');
    
    if (this.habits.length === 0) {
      habitsContainer.innerHTML = `
        <div class="empty-state">
          <p>لا توجد عادات مسجلة</p>
          <button id="add-habit-btn">+ أضف عادة جديدة</button>
        </div>
      `;
    } else {
      habitsContainer.innerHTML = this.habits.map(habit => `
        <div class="habit-item ${habit.completed ? 'completed' : ''}">
          <input type="checkbox" ${habit.completed ? 'checked' : ''}>
          <span>${habit.text}</span>
          <button class="delete-btn">حذف</button>
        </div>
      `).join('');
    }
  }

  addHabit(text) {
    this.habits.push({ text, completed: false });
    this.saveHabits();
    this.initUI();
  }

  saveHabits() {
    localStorage.setItem('mojania-habits', JSON.stringify(this.habits));
  }
}
