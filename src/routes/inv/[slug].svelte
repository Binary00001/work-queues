<script>
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	import Loader from '$lib/components/Loader.svelte';
	import DailyChart from '$lib/components/DailyChart.svelte';

	let partNum;
	let invList;
	// let deptGoal;
	// let burndownList;
	// let chartStats;
	// let goal;

	let myInterval;
	let loading = true;

	// let dates;
	// let dailyParts;

	async function getData() {
		partNum = $page.params.slug;

		const [lotLocData] = await Promise.all([fetch(`http://10.25.1.73:4004/api/inv/${partNum}`)], {
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (lotLocData.ok) {
			invList = await lotLocData.json();
			console.log(invList);
			// dates = chartStats.map((day) =>
			// 	new Date(day.DAY.replace(/-/g, '/').replace(/T.+/, '')).toLocaleDateString()
			// );
			// dailyParts = chartStats.map((parts) => parts.DAILY_JOBS);
			// goal = parseInt(deptGoal[0].daily_goal / 34);
			loading = false;
		}
	}

	onMount(() => {
		getData();
		myInterval = setInterval(() => {
			getData();
		}, 60000);
	});

	onDestroy(() => {
		clearInterval(myInterval);
	});
</script>

<main>
	{#if loading}
		<Loader />
	{:else}
		<!-- <a href={`/burndown/${dept}`}><p>Burndown list</p></a> -->
		{#if invList.length === 0}
			<h1 class="loading">Error: Not data</h1>
		{:else}
			<div class="table">
				<table class="parts">
					<thead>
						<th>Part</th>
						<th>Run</th>
						<th>Location</th>
						<th>Original Qty</th>
						<th>Remaining Qty</th>
					</thead>
					<tbody>
						{#each invList as { Lot_Part_Ref, Lot_MO_Run, Lot_Loc, Lot_Origin_Qty, Lot_Remain_Qty }}
							<tr>
								<td>{Lot_Part_Ref}</td>
								<td>{Lot_MO_Run}</td>
								<td>{Lot_Loc}</td>
								<td>{parseInt(Lot_Origin_Qty)}</td>
								<td>{parseInt(Lot_Remain_Qty)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
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

	.loading {
		font-weight: 300;
		margin: 50px;
	}

	.loading:after {
		content: '.';
		animation: dots 2s steps(4, end) infinite;
	}

	@keyframes dots {
		0%,
		20% {
			color: rgba(0, 0, 0, 0);
			text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
		}
		40% {
			color: black;
			text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
		}
		60% {
			text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
		}
		80%,
		100% {
			text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
		}
	}

	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
		padding: 5px;
	}

	td {
		text-align: center;
	}

	thead {
		background-color: skyblue;
	}

	.table tr:hover {
		background-color: yellow;
	}

	.table {
		width: 90%;
		margin-bottom: 15px;
	}

	table {
		margin-top: 10px;
		width: 100%;
	}
</style>
