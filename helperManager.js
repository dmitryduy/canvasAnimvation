export default class HelperManager {
  static computeDistance(point1, point2) {
    if (Array.isArray(point1) && Array.isArray(point2)) {
      return Math.sqrt((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2);
    }

    if (typeof point1 === "number" && typeof point2 === "number") {
      return Math.sqrt(point1 ** 2 + point2 ** 2);
    }

    throw Error('Невозможно посчитать дистанцию');
  }

  static getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static getCoordsInWindow(radius) {
    return [
      Math.floor((window.innerWidth - radius * 2) * Math.random() + radius),
      Math.floor((window.innerHeight - radius * 2) * Math.random() + radius)
    ];
  }

  static isAvailableCoordsInWindow(radius, coords) {
    return [
      !(coords[0] >= window.innerWidth - radius || coords[0] <= radius),
      !(coords[1] >= window.innerHeight - radius || coords[1] <= radius)
    ];
  }

  static getQuadrant(pointCoords, centerCoords) {
    const [pointX, pointY] = pointCoords;
    const [centerX, centerY] = centerCoords;

    if (pointX >= centerX && pointY <= centerY) {
      return 1;
    }
    if (pointX <= centerX && pointY <= centerY) {
      return 2;
    }
    if (pointX <= centerX && pointY >= centerY) {
      return 3;
    }
    return 4;
  }

  static isCoordsEquals(point1, point2, epsilon) {
    return Math.abs(point1[0] - point2[0]) < epsilon && Math.abs(point1[1] - point2[1]) < epsilon;
  }

  static getRandomNumberInRang(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
  }
}