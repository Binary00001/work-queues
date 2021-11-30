<script>
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

	export let parts;
</script>

<div class="parts-table">
	<table>
		<thead>
			<th>Part Number</th>
			<th>Run</th>
			<th>Priority</th>
			<th>Quantity</th>
			<th>Time In Queue</th>
			<th>Comments</th>
			<!-- <th>Due Date</th> -->
			<!-- <th>Testing</th> -->
			<!-- <th>Comments</th> -->
		</thead>
		<tbody>
			{#each parts as { Part_Num, Run, Queue_Diff, Qty, Priority, Comments }}
				<tr class:p5={Priority == 5} class:p2={Priority == 2}>
					<td>{Part_Num}</td>
					<td>{Run}</td>
					<td>{Priority}</td>
					<td>{parseInt(Qty)}</td>
					<td>{convertTime(Queue_Diff)}</td>
					<td>{Comments}</td>
					<!-- <td class:stagnant={Date_DiffNow > 3}>{Date_DiffNow}</td> -->
					<!-- <td>{new Date(OP_SchedDate).toLocaleDateString()}</td> -->
					<!-- {#if COMMENTS == null}
                        <td>{''}</td>    
                    {:else}
                        <td>{COMMENTS}</td>
                    {/if} -->
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.parts-table {
		display: grid;
	}

	table {
		background-color: white;
	}

	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
	}

	thead {
		background-color: dodgerblue;
	}

	a {
		color: black;
		text-decoration: none;
	}

	.stagnant {
		color: red;
	}

	.p5 {
		background-color: yellow;
	}

	.p2 {
		background-color: lightgreen;
	}
</style>
