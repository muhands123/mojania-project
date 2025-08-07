export class HabitsSystem {
    constructor() {
        this.habits = this.loadHabits();
        this.renderHabits();
    }

    loadHabits() {
        return JSON.parse(localStorage.getItem('mojania-habits')) || [];
    }

    saveHabits() {
        localStorage.setItem('mojania-habits', JSON.stringify(this.habits));
    }

    renderHabits() {
        const habitsList = document.getElementById('habits-list');
        habitsList.innerHTML = this.habits.map((habit, index) => `
            <div class="habit-item" data-id="${index}">
                <input type="checkbox" ${habit.completed ? 'checked' : ''}>
                <span>${habit.text}</span>
                <button class="delete-btn">حذف</button>
            </div>
        `).join('');

        // إضافة مستمعي الأحداث
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const habitId = e.target.closest('.habit-item').dataset.id;
                this.deleteHabit(habitId);
            });
        });

        document.querySelectorAll('.habit-item input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const habitId = e.target.closest('.habit-item').dataset.id;
                this.toggleHabit(habitId);
            });
        });
    }

    addHabit(text, pointsSystem) {
        this.habits.push({
            text,
            completed: false,
            createdAt: new Date().toISOString()
        });
        this.saveHabits();
        this.renderHabits();
        pointsSystem.addPoints(5); // منح 5 نقاط عند إضافة عادة
    }

    deleteHabit(id) {
        this.habits.splice(id, 1);
        this.saveHabits();
        this.renderHabits();
    }

    toggleHabit(id) {
        this.habits[id].completed = !this.habits[id].completed;
        this.saveHabits();
        this.renderHabits();
    }
}
