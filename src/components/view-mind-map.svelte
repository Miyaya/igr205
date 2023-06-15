<script>
	import { fabric } from 'fabric';
	import { onMount } from 'svelte';

	let canvas;
	let initPos = { x: 0, y: 0 },
		finalPos = { x: 0, y: 0 };

	export let activeMode;

	onMount(() => {
		let canv = new fabric.Canvas(canvas);
		function getMouseCoords(event) {
			var pointer = canv.getPointer(event.e);
			var posX = pointer.x;
			var posY = pointer.y;
			return { x: posX, y: posY };
		}

		canv.on('mouse:down', function (options) {
			initPos = getMouseCoords(options);
		});

		canv.on('mouse:up', function (options) {
			finalPos = getMouseCoords(options);

			// TODO: group text in the middle of the rectangle
			// TODO: add border-radius to rectangle
			let newRect = new fabric.Rect({
				left: initPos.x,
				top: initPos.y,
				width: finalPos.x - initPos.x,
				height: finalPos.y - initPos.y,
				fill: 'red'
			});
			if (activeMode === 'Geometry') canv.add(newRect);

			// TODO: add line mode
			// TODO: attach the line with the rectangle
		});
	});
</script>

<canvas bind:this={canvas} width="500" height="300" style="border: 1px solid black;" />
<p>{activeMode}</p>
