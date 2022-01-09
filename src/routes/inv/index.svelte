<script>
	import { locationStore, locationRefStore } from '$lib/invStores';
</script>

<div class="container">
	{#if !$locationRefStore}
		<p>loading</p>
	{:else}
		<ul>
			{#each $locationRefStore as { Ref }}
				<li>
					<a href={`/inv/loc/${Ref}`} sveltekit:prefetch>{Ref}</a><br />
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.container ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	li {
		list-style: none;
		padding: 5px;
	}

	a {
		color: rgba(0, 0, 0, 1);
		text-decoration: none;
	}

	a:hover {
		color: rgba(0, 100, 255, 0.75);
	}
</style>
