<script>
	import { onMount } from 'svelte';

	export let dept;
	export let parts;

	// onMount(() => {
	// 	console.log(list);
	// });
</script>

<div class="container">
	<h2>{dept.toUpperCase()}</h2>
	<table>
		<thead>
			<th>Part Number</th>
			<th>Run</th>
			<th>Days In Queue</th>
			<th>Quantity</th>
			<th>Customer</th>
			<th>Priority</th>
			<th>Comments</th>
		</thead>

		<tbody>
			{#each parts as { PART_NUMBER, RUN, DAYS_IN_QUEUE, RUN_QTY, CUSTOMER, PRIORITY, COMMENTS, PO, ITEM }}
				<!-- {#if } -->
				<tr>
					<td
						><a href={`/part?po=${PO}&line=${ITEM}&run=${RUN}&part=${PART_NUMBER}`} target="_blank"
							>{PART_NUMBER}</a
						></td
					>
					<td>{RUN}</td>
					<td class:stagnant={DAYS_IN_QUEUE > 3}>{DAYS_IN_QUEUE}</td>
					<td>{RUN_QTY}</td>
					<td>{CUSTOMER}</td>
					<td>{PRIORITY}</td>
					{#if COMMENTS == null}
						<td>{''}</td>
					{:else}
						<td>{COMMENTS}</td>
					{/if}
				</tr>
				<!-- {/if} -->
			{/each}
		</tbody>
	</table>
</div>

<style>
	/*  */
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

	table tr:hover {
		background-color: yellow;
	}

	table {
		width: 95%;
		margin: 10px;
	}
	/*  */

	.stagnant {
		color: red;
	}

	a {
		text-decoration: none;
		color: black;
	}
</style>
