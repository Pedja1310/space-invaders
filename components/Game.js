import Player from "./Player";
import Projectile from "./Projectile";
import Enemy from "./Enemy";

class Game {
	constructor(canvas) {
		// Game properties
		this.canvas = canvas;
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		// Player and movement properties and functionalities
		this.keys = [];
		this.player = new Player(this);

		window.addEventListener("keydown", (event) => {
			const acceptedKeys = ["KeyA", "KeyD", "Space"];

			if (acceptedKeys.includes(event.code) && this.keys.indexOf(event.code) === -1) {
				this.keys.push(event.code);
			}
		});

		window.addEventListener("keyup", (event) => {
			this.keys = this.keys.filter((key) => key !== event.code);

			// Disable gun on space key up
			if (event.code === "Space") {
				this.player.activateGun(false);
			}
		});

		// Projectiles properties and functionalities
		this.projectiles = [];
		this.numberOfProjectiles = 10;

		this.createProjectiles();
	}

	render(context) {
		this.player.draw(context);
		this.player.update();
		this.projectiles.forEach((projectile) => {
			if (!projectile.free) {
				projectile.draw(context);
				projectile.update();
			}
		});
	}

	createProjectiles() {
		for (let i = 0; i < this.numberOfProjectiles; i++) {
			this.projectiles.push(new Projectile());
		}
	}

	getProjectile() {
		for (let i = 0; i < this.projectiles.length; i++) {
			if (this.projectiles[i].free) {
				return this.projectiles[i];
			}
		}
	}
}

export default Game;
