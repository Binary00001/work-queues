<script>
	import { onDestroy, onMount } from 'svelte';
	import Loader from '$lib/components/Loader.svelte';

	let data = [];
	let loading = true;
	let reloadInterval;

	//
	function timeDiffCalc(dateFuture, dateNow) {
		let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

		// calculate days
		const days = Math.floor(diffInMilliSeconds / 86400);
		diffInMilliSeconds -= days * 86400;
		console.log('calculated days', days);

		// calculate hours
		const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
		diffInMilliSeconds -= hours * 3600;
		console.log('calculated hours', hours);

		// calculate minutes
		const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
		diffInMilliSeconds -= minutes * 60;
		console.log('minutes', minutes);

		let difference = '';
		if (days > 0) {
			difference += days === 1 ? `${days} day, ` : `${days} days, `;
		}

		difference += hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

		difference += minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`;

		return difference;
	}

	//

	const getData = async () => {
		const res = await fetch('http://10.25.1.73:4004/api/burndown', {
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
						<th>PO#</th>
						<th>Item</th>
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
								<td>{part.PO}</td>
								<td>{part.Item}</td>
								<td>{part.Run_Qty}</td>
								{#if part.Queue_Days == null}
									<td>0</td>
								{:else}
									<td>{part.Queue_Days}</td>
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
