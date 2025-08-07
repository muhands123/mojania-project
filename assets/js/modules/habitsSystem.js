export class HabitsSystem {
    constructor(pointsSystem) {
        this.pointsSystem = pointsSystem;
        this.habits = this.loadHabits();
        this.renderHabits();
    }

    // تحميل العادات من الذاكرة المحلية
    loadHabits() {
        const saved = localStorage.getItem('mojania-habits');
        return saved ? JSON.parse(saved) : [];
    }

    // حفظ العادات في الذاكرة المحلية
    saveHabits() {
        localStorage.setItem('mojania-habits', JSON.stringify(this.habits));
    }

    // عرض العادات في الواجهة
    renderHabits() {
        const container = document.getElementById('habits-list');
        container.innerHTML = this.habits.map((habit, index) => `
            <div class="habit-item" data-id="${index}">
                <input type="checkbox" ${habit.completed ? 'checked' : ''}>
                <span class="habit-text">${habit.text}</span>
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

    // إضافة عادة جديدة
    addHabit(text) {
        this.habits.push({
            text,
            completed: false,
            createdAt: new Date().toISOString()
        });
        this.saveHabits();
        this.renderHabits();
    }

    // حذف عادة
    deleteHabit(id) {
        this.habits.splice(id, 1);
        this.saveHabits();
        this.renderHabits();
    }

    // تغيير حالة العادة
    toggleHabit(id) {
        const habit = this.habits[id];
        habit.completed = !habit.completed;
        
        if (habit.completed) {
            this.pointsSystem.addPoints(10, 'habit');
        }
        
        this.saveHabits();
    }
}
