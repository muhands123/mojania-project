export class HabitsSystem {
  constructor(pointsSystem) {
    this.pointsSystem = pointsSystem;
    this.habits = this.loadHabits();
    this.render();
  }

  loadHabits() {
    return JSON.parse(localStorage.getItem('mojania-habits')) || [];
  }

  saveHabits() {
    localStorage.setItem('mojania-habits', JSON.stringify(this.habits));
  }

  render() {
    const container = document.getElementById('habits-list');
    container.innerHTML = this.habits.map((habit, index) => `
      <div class="habit-item" data-id="${index}">
        <input type="checkbox" ${habit.completed ? 'checked' : ''}>
        <span>${habit.text}</span>
        <button class="delete-btn">حذف</button>
      </div>
    `).join('');

    // إضافة الأحداث
    container.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.closest('.habit-item').dataset.id;
        this.deleteHabit(id);
      });
    });

    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const id = e.target.closest('.habit-item').dataset.id;
        this.toggleHabit(id);
      });
    });
  }

  addHabit(text) {
    this.habits.push({ text, completed: false });
    this.saveHabits();
    this.render();
  }

  deleteHabit(id) {
    this.habits.splice(id, 1);
    this.saveHabits();
    this.render();
  }

  toggleHabit(id) {
    const habit = this.habits[id];
    habit.completed = !habit.completed;
    
    if (habit.completed) {
      this.pointsSystem.addPoints(10, 'habits');
    }
    
    this.saveHabits();
    this.render();
  }
}
