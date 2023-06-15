<script>
	import NavMap from '../../components/nav-map.svelte';
	import Container from '../../components/container.svelte';
	import ViewMindMap from '../../components/view-mind-map.svelte';

	let activeMode = 'Geometry';
	const changeMode = (v) => (activeMode = v);
</script>

<NavMap {changeMode} />
<Container>
	<ViewMindMap {activeMode} />
</Container>
