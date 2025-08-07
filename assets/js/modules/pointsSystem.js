export class PointsSystem {
  constructor() {
    this.points = this.loadPoints();
  }

  loadPoints() {
    return parseInt(localStorage.getItem('mojania-points')) || 0;
  }

  addPoints(amount) {
    this.points += amount;
    this.savePoints();
    this.updatePointsDisplay();
  }

  savePoints() {
    localStorage.setItem('mojania-points', this.points);
  }

  updatePointsDisplay() {
    const pointsElement = document.getElementById('points-counter');
    if (pointsElement) {
      pointsElement.textContent = this.points;
    }
  }
}
