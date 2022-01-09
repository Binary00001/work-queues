<script>
	export let data;
</script>

<div class="burndown-container" style="margin-top: 5px;">
	{#if data.length > 0}
		<h3 style="text-align: center;">Burndown Jobs</h3>
		<table>
			<thead>
				<tr>
					<th>PART NUMBER</th>
					<th>RUN</th>
					<th>QUANTITY</th>
				</tr>
			</thead>
			<tbody>
				{#each data as { Part_Num, Run, Qty }}
					<tr>
						<td>{Part_Num}</td>
						<td>{Run}</td>
						<td>{parseInt(Qty)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p />
	{/if}
</div>

<style>
	.burndown-container {
		font-weight: 400;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
	}

	/*  */
	table {
		width: 100%;
	}

	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
		padding: 5px;
	}

	th {
		font-weight: 500;
	}

	td {
		text-align: center;
	}

	thead {
		background-color: rgba(255, 99, 71, 1);
	}

	table tbody tr:hover {
		background-color: yellow;
	}

	/* */

	@media screen and (max-width: 640px) {
		.burndown-container {
			margin: 0;
		}
	}
</style>
