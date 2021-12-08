<script>
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
			<th>Cust Date</th>
			<th>Priority</th>
			<th>Comments</th>
		</thead>

		<tbody>
			{#each parts as { RUNRTNUM, RUNNO, QUEUEDIFF, RUNQTY, SOCUST, ITCUSTREQ, RUNPRIORITY, COMMENTS, SOPO, ITNUMBER }}
				<!-- {#if } -->
				<tr>
					<td
						><a
							href={`/part?po=${SOPO}&line=${ITNUMBER}&run=${RUNNO}&part=${RUNRTNUM}`}
							target="_blank">{RUNRTNUM}</a
						></td
					>
					<td>{RUNNO}</td>
					<td class:stagnant={QUEUEDIFF > 3}>{QUEUEDIFF}</td>
					<td>{RUNQTY}</td>
					<td>{SOCUST}</td>
					<td>{new Date(ITCUSTREQ).toLocaleDateString()}</td>
					<td>{RUNPRIORITY}</td>
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
