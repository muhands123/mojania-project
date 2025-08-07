export class PointsSystem {
    constructor() {
        this.points = this.loadPoints();
        this.updateDisplay();
    }

    loadPoints() {
        return parseInt(localStorage.getItem('mojania-points')) || 0;
    }

    savePoints() {
        localStorage.setItem('mojania-points', this.points);
    }

    addPoints(amount) {
        this.points += amount;
        this.savePoints();
        this.updateDisplay();
        this.showPointsNotification(amount);
    }

    updateDisplay() {
        const pointsElement = document.getElementById('points-counter');
        if (pointsElement) {
            pointsElement.textContent = this.points;
        }
    }

    showPointsNotification(amount) {
        const notification = document.createElement('div');
        notification.className = 'points-notification';
        notification.textContent = `+${amount} نقاط!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}
