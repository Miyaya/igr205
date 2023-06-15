<script>
	import { fabric } from 'fabric';
	import { onMount } from 'svelte';

	let canvas;

	onMount(() => {
		let canv = new fabric.Canvas(canvas);

		const rect = new fabric.Rect({
			left: 10,
			top: 10,
			width: 20,
			height: 15,
			fill: 'blue'
		});
		canv.add(rect);
	});
</script>

<canvas bind:this={canvas} width="500" height="300" />
