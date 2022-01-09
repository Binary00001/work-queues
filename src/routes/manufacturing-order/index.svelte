<script>
	import { page } from '$app/stores';

	import Allocations from '$lib/components/Allocations.svelte';
	const part = $page.query.get('part');
	const run = $page.query.get('run');
	console.log(part);
</script>

<div class="mo-container">
	<Allocations {part} {run} />
</div>
