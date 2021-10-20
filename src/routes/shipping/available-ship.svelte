<!-- <script context="module">
    export async function load({fetch}) {
        const data = await fetch('/api/lots',
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (data.ok) {
            let availableLots = await data.json()

            return {
                props: { availableLots }
            }
        }
    }
</script> -->
<script>
	import { onMount, onDestroy } from 'svelte';

	let loading = true;
	let reloadInterval;
	let availableLots = [];
	let time;

	async function getData() {
		const data = await fetch('/api/lots', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (data.ok) {
			availableLots = await data.json();
			loading = false;
			time = new Date(Date.now()).toLocaleString();
		}
	}

	onMount(() => {
		getData();
		reloadInterval = setInterval(() => {
			getData();
		}, 60000);
	});

	onDestroy(() => clearInterval(reloadInterval));
</script>

<div class="container">
	{#if loading}
		<h1>Loading</h1>
	{:else}
		<h2>{time}</h2>
		<table>
			<thead>
				<th>Location</th>
				<th>Part Number</th>
				<th>Lot</th>
				<th>Customer</th>
				<th>Sales Order</th>
				<th>Quantity</th>
				<th>QOH</th>
				<th>Ship Date</th>
			</thead>
			<tbody>
				{#each availableLots as { LOC, PART, LOT, CUST, SO, ITEM, SCHED, QTY, QOH }}
					<tr>
						<td>{LOC}</td>
						<td>{PART}</td>
						<td>{LOT}</td>
						<td>{CUST}</td>
						<td>{SO}-{ITEM}</td>
						<td>{QTY}</td>
						<td>{QOH}</td>
						<td>{new Date(SCHED).toLocaleDateString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style>
	.container {
		text-align: center;
	}
</style>
