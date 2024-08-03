class Player {
	constructor(game) {
		this.game = game;
		this.width = 80;
		this.height = 80;
		this.x = this.game.width / 2 - this.width / 2;
		this.y = this.game.height - this.height - this.height * 0.2;
		this.speed = 7;
		this.gunActive = false;
	}

	draw(context) {
		context.fillRect(this.x, this.y, this.width, this.height);
	}

	update() {
		this.game.keys.forEach((key) => {
			if (key === "KeyA") {
				this.x -= this.speed;

				if (this.x < 0) {
					this.x = 0;
				}
			}

			if (key === "KeyD") {
				this.x += this.speed;

				if (this.x + this.width > this.game.width) {
					this.x = this.game.width - this.width;
				}
			}

			if (key === "Space") {
				this.shoot();
			}
		});
	}

	shoot() {
		if (this.gunActive) return;

		this.activateGun(true);

		const projectile = this.game.getProjectile();

		if (projectile) {
			projectile.startProjectile(this.x + this.width / 2, this.y + 30);
		}
	}

	activateGun(active) {
		this.gunActive = active;
	}
}

export default Player;
