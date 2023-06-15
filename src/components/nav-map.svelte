<script>
	let divItems = [
		{ id: 0, mode: 'Select' },
		{ id: 1, mode: 'Geometry' },
		{ id: 2, mode: 'Link' },
		{ id: 3, mode: 'Move' }
	];
</script>

<div class="navbar">
	{#each divItems as item, index (item.id)}
		<span class="navbar-item">
			{item.mode}
		</span>
	{/each}
</div>

<style>
	.navbar {
		overflow-x: auto; /* Enable horizontal scrolling */
		white-space: nowrap; /* Prevent line breaks */
		display: flex; /* Use flexbox to layout navigation items */
		position: sticky;
		top: 0px;
		z-index: 10;
	}

	.navbar-item {
		/* border: 1px solid black; */
		text-align: center;
		min-width: 120px;
		margin-right: 10px;
		font-size: 13px;
		line-height: 60px;
		height: 60px;
	}
</style>
