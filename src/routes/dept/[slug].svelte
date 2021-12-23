<!-- <script context="module">
	export async function load({ page, fetch }) {
		const dept = page.params.slug;

		const res = await fetch(
			`http://imaginetics193.imagineticsinc.local:4004/api/testing/dept/num/${dept}`,
			{
				method: 'GET',
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				}
			}
		);

		if (res.ok) {
			const data = await res.json();
			return {
				props: { data, dept }
			};
		}

		const { message } = await res.json();
		return {
			status: res.status,
			error: new Error(message)
		};
	}
</script> -->
<script>
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import DeptTable from '$lib/components/DeptTable.svelte';

	const dept = $page.params.slug;
	let data;
	let loading = true;
	let reloadInterval;

	const loadData = async () => {
		const res = await fetch(
			`http://imaginetics193.imagineticsinc.local:4004/api/testing/dept/num/${dept}`,
			{
				method: 'GET',
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				}
			}
		);

		if (res.ok) {
			data = await res.json();
			loading = false;
		}
	};

	onMount(() => {
		loadData();
		reloadInterval = setInterval(() => {
			loadData();
			console.log('reloaded');
		}, 60000);
	});

	onDestroy(() => {
		clearInterval(reloadInterval);
	});
</script>

<svelte:head>
	{#if loading}
		<title>IMAGINETICS</title>
	{:else}
		<title>IMAGINETICS - {data[0].WC_Name.toUpperCase()}</title>
	{/if}
</svelte:head>

<main>
	{#if loading}
		<p>loading...</p>
	{:else}
		<h1 class="dept">
			{data[0].WC_Name}
		</h1>
		<div class="table">
			<DeptTable tableData={data} />
		</div>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 200;
	}

	.dept {
		text-transform: uppercase;
		font-weight: 100;
		margin-top: 10px;
	}

	a {
		text-decoration: none;
		color: black;
	}
</style>
