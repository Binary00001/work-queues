<script>
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

	export let parts;
</script>

<div class="parts-table">
	<table>
		<thead>
			<th>Part Number</th>
			<th>Run</th>
			<th>Days In Queue</th>
			<th>Quantity</th>
			<!-- <th>Due Date</th> -->
			<th>Priority</th>
			<th>Testing</th>
			<!-- <th>Comments</th> -->
		</thead>
		<tbody>
			{#each parts as { Run_Num, Run, Date_DiffNow, Run_Qty, OP_SchedDate, Prev_CompDate, Run_Priority, OP_SchedDate }}
				<tr class:p5={Run_Priority == 5} class:p2={Run_Priority == 2}>
					<td>{Run_Num}</td>
					<td>{Run}</td>
					<td class:stagnant={Date_DiffNow > 3}>{Date_DiffNow}</td>
					<td>{parseInt(Run_Qty)}</td>
					<!-- <td>{new Date(OP_SchedDate).toLocaleDateString()}</td> -->
					<td>{Run_Priority}</td>
					<td>{timeDiffCalc(new Date(Date.now()), new Date(Prev_CompDate))}</td>
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
