<script>
	import { onDestroy, onMount } from 'svelte';
	import Loader from '$lib/components/Loader.svelte';

	let data = [];
	let loading = true;
	let reloadInterval;

	function convertMins(mins) {
		const days = Math.floor(mins/1440)
		const hours = Math.floor((mins - (days * 1440)) / 60)
		const minutes = Math.round(mins%60)

		let diff = ''

		if (days > 0) {
			diff += days === 1 ? `${days} day, ` : `${days} days,`
		}
		if (hours > 0) {
			diff += hours ===1 ? `${hours} hour,` : `${hours} hours,`
		}

		diff += minutes === 0 || 1 ? `${minutes} min` : `${minutes} minutes`

		return `${days} days, ${hours} hours, ${minutes} minutes`
	}



	//

	const getData = async () => {
		const res = await fetch('http://imaginetics193.imagineticsinc.local:4004/api/burndown', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.ok) {
			data = await res.json();
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
		{:else}
			<div class="table">
				<h1 class="dept">BURNDOWN LIST</h1>
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
								<td>{part.Part_Number}</td>
								<td>{part.Run}</td>
								<!-- <td>{part.PO}</td>
								<td>{part.Item}</td> -->
								<td>{parseInt(part.Qty)}</td>
								{#if part.Queue_Time == null}
									<td>0</td>
								{:else}
									<td>{convertMins(part.Queue_Time)}</td>
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

	thead {
		background-color: skyblue;
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
