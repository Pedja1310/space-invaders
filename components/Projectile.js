class Projectile {
	constructor() {
		this.width = 4;
		this.height = 10;
		this.x = 0;
		this.y = 0;
		this.speed = 4;
		this.free = true;
	}

	draw(context) {
		if (!this.free) {
			context.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	update() {
		if (!this.free) {
			this.y -= this.speed;
			if (this.y < -this.height) {
				this.reset();
			}
		}
	}

	startProjectile(x, y) {
		this.free = false;
		this.x = x - this.width / 2;
		this.y = y;
	}

	reset() {
		this.free = true;
	}
}

export default Projectile;
