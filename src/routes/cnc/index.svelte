<script>
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	import { api } from '$lib/db';

	import Loader from '$lib/components/Loader.svelte';
	// import DailyChart from '$lib/components/DailyChart.svelte';
	import CNCTable from '$lib/components/CNCTable.svelte';
	import SmallTable from '$lib/components/SmallTable.svelte';

	let dept;
	let width;

	let myInterval;
	let loading = true;

	async function getData() {
		// dept = $page.params.slug;
		try {
			let [deptData] = await Promise.all([fetch(`/cnc/cnc.json`)], {
				method: 'GET',
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				}
			});

			if (deptData.ok) {
				dept = await deptData.json();
				console.log(dept);
			}
		} catch (err) {
			throw new Error(err.message);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		getData();
		myInterval = setInterval(() => {
			// location.reload();
			getData();
		}, 60000);
	});

	onDestroy(() => {
		clearInterval(myInterval);
	});
</script>

<svelte:window bind:innerWidth={width} />

<main>
	{#if loading}
		<Loader />
	{:else if dept === null || dept === 0}
		<h1>No Jobs In Queue</h1>
	{:else}
		<h1 class="dept">
			{'Machine Shop'}
		</h1>
		{#if width < 740}
			<div class="table">
				<SmallTable data={dept} />
			</div>
		{:else}
			<div class="table">
				<CNCTable parts={dept} />
			</div>
		{/if}
	{/if}
</main>

<style>
	main {
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 200;
		width: 100%;
	}

	.dept {
		text-transform: uppercase;
		font-weight: 100;
		margin-top: 10px;
	}

	.table {
		width: 95vw;
		/* margin: auto 15px; */
		margin: 15px auto;
	}

	@media screen and (max-width: 640px) {
		.table {
			width: 100%;
		}
	}

	@media print {
		.no-print {
			display: none;
		}
		main {
			width: 100vw;
			font-size: 0.75em;
		}
	}
</style>
