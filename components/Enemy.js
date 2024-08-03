import { v4 as uuid } from "uuid";

class Enemy {
	constructor(game) {
		this.id = uuid();
		this.game = game;
		this.width = 40;
		this.height = 40;
		this.y = -this.height;
		this.x = Math.floor(Math.random() * this.game.width - this.width);
		this.health = 100;
		this.isFree = true;
		this.speed = this.setSpeed(this.game.level);
	}

	draw(context) {
		context.fillRect(this.x, this.y, this.width, this.height);
	}

	update() {
		if (!this.isFree) {
			console.log(this.y);
			this.y += this.speed;
		}
	}

	setSpeed(level) {
		if (level === 1 || level < 5) {
			return 2;
		} else if (level === 5 || level < 10) {
			return 3;
		} else if (level === 10 || level < 15) {
			return 4;
		}
	}
}

export default Enemy;
