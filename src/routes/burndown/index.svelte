<script>
	import { onDestroy, onMount } from 'svelte';
	import { api } from '$lib/db'

	import Loader from '$lib/components/Loader.svelte';

	let data = [];
	let loading = true;
	let reloadInterval;

	let params = '';

	function convertTime(time) {
		let days = Math.floor(time / 1440);
		let hours = Math.floor(time / 60);
		let mins = time % 60;

		let difference = '';

		if (days > 0) {
			difference += days === 1 ? `${days} day` : `${days} days`;
			return difference;
		} else if (hours > 0) {
			difference = hours === 1 ? `${hours} hour` : `${hours} hours`;
			return difference;
		}
		return `${mins} minutes`;
	}

	const deptFilter = (dept) => data.filter((i) => i.WC_Name.includes(dept));

	//

	const getData = async () => {
		const res = await fetch(`${api}/burndown`, {
		// const res = await fetch('/api/burndown', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.ok) {
			data = await res.json()
			console.log(data)
			loading = false;
		}
	};

	onMount(() => {
		getData();
		reloadInterval = setInterval(() => {
			getData();
		}, 60000);
	});

	onDestroy(() => {
		clearInterval(reloadInterval);
	});
</script>

<main>
	<div class="container">
		{#if loading}
			<div class="loading">
				<Loader />
			</div>
		{:else if !data}
			<p>NO ETRAC JOBS</p>
		{:else}
			<div class="table">
				<h1 class="dept">BURNDOWN LIST</h1>
				<!-- <input
					type="text"
					bind:value={params}
					placeholder="Enter dept"
					on:change={() => (data = deptFilter(params))}
				/> -->
				<table>
					<thead>
						<th>Work Center</th>
						<th>Part Number</th>
						<th>Run</th>
						<!-- <th>PO#</th>
						<th>Item</th> -->
						<th>Quantity</th>
						<th>DiQ</th>
						<th>Comments</th>
					</thead>
					<tbody>
						{#each data as part}
							<tr>
								<td>{part.WC_Name}</td>
								<td>{part.Part_Num}</td>
								<td>{part.Run}</td>
								<!-- <td>{part.PO}</td>
								<td>{part.Item}</td> -->
								<td>{parseInt(part.Qty)}</td>
								{#if part.Queue_Diff == null}
									<td>0</td>
								{:else}
									<td>{convertTime(part.Queue_Diff)}</td>
								{/if}
								<td>{part.Comments}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</main>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 200;
	}

	.loading {
		width: 300;
		height: 300px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dept {
		text-transform: uppercase;
		font-weight: 100;
		text-align: center;
	}

	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
		padding: 5px;
	}

	thead,
	th {
		background-color: rgba(0, 128, 128, 1);
		position: sticky;
		top: 0;
	}

	tr:hover {
		background-color: yellow;
	}

	.table {
		margin: 10px;
		width: 90%;
	}

	table {
		margin-top: 10px;
		width: 100%;
	}
</style>
