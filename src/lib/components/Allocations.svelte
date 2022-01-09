<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/db';

	export let part, run;
	let allocations;
	let display = false;
	let loading = true;

	async function getRunAllocations() {
		const allocationData = await fetch(`${api}/testing/allocations?part=${part}&run=${run}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			}
		});
		if (allocationData.ok) {
			allocations = await allocationData.json();
			loading = false;
		}
	}

	onMount(() => {
		getRunAllocations();
	});
</script>

{#if loading}
	<p>test loading</p>
{:else}
	<div class="allocations-table">
		<h5>Allocations:</h5>
		<table>
			<thead>
				<tr>
					<th>Sales Order</th>
					<th>Item</th>
					<th>Customer</th>
					<th>Purchase Order</th>
					<th>Part</th>
					<th>So Delivery Date</th>
					<th>Allocated Qty</th>
				</tr>
			</thead>
			<tbody>
				{#each allocations as allocation}
					<tr>
						<td>{allocation.Type}{allocation.SO}</td>
						<td>{allocation.Item}</td>
						<td>{allocation.Customer}</td>
						<td>{allocation.PO}</td>
						<td>{part}</td>
						<td>{new Date(allocation.Cust_Date).toLocaleDateString()}</td>
						<td>{allocation.Qty}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	th {
		border-bottom: 1px solid black;
	}

	th,
	td {
		text-align: center;
	}
</style>
