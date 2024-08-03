import Player from "./Player";
import Projectile from "./Projectile";
import Enemy from "./Enemy";

class Game {
	constructor(canvas) {
		// Game properties
		this.canvas = canvas;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.level = 1;
		this.enemiesStarted = 0;

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

			// Enable gun on space key up
			if (event.code === "Space") {
				this.player.activateGun(false);
			}
		});

		// Projectiles properties and functionalities
		this.projectiles = [];
		this.numberOfProjectiles = 10;

		this.createProjectiles();

		// Enemy properties and functionalities
		this.enemies = [];
		this.numberOfEnemies = 20;

		this.createEnemies();
	}

	render(context) {
		// Create player
		this.player.draw(context);
		this.player.update();

		// Create projectiles
		this.projectiles.forEach((projectile) => {
			if (!projectile.free) {
				projectile.draw(context);
				projectile.update();
			}
		});

		// Create enemies
		this.enemies.forEach((enemy) => {
			if (!enemy.isFree) {
				enemy.draw(context);
				enemy.update();
			}
		});

		// Run enemies
		if (this.enemiesStarted < this.level) {
			this.enemiesStarted++;
			console.log(this.enemiesStarted, "enemies started");
			setTimeout(() => {
				this.startEnemies();
			}, 2000);
		}
	}

	// Projectiles functionalities
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

	// Enemies functionalities
	createEnemies() {
		for (let i = 0; i < this.numberOfEnemies; i++) {
			this.enemies.push(new Enemy(this));
		}
	}

	startEnemies() {
		for (let i = 0; i < this.level; i++) {
			this.enemies[i].isFree = false;
		}
	}
}

export default Game;
