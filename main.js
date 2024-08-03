import Game from "./components/Game";

window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas1");
	const context = canvas.getContext("2d");
	canvas.width = 600;
	canvas.height = 800;
	context.fillStyle = "white";

	const game = new Game(canvas);

	function animate() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		game.render(context);
		requestAnimationFrame(animate);
	}

	animate();
});
