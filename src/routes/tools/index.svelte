<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/tools.json', {
			method: 'GET',
			mode: 'cors'
		});

		if (res.ok) {
			let data = await res.json();
			console.log(data);

			return {
				props: {
					name: data
				}
			};
		}
	}
</script>

<script>
	export let partsUsedOn;
	let detailNumber = '';

	async function handleSubmit() {
		const res = await fetch('/tools.json', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ detail: detailNumber })
		});

		if (res.ok) {
			detailNumber = '';
			const data = await res.json();
			console.log(data);
			partsUsedOn = data.partsUsedOn;
		}
	}
</script>

<div class="container">
	<div>
		<form on:submit|preventDefault={handleSubmit} method="post">
			<label for="detail"
				>Detail:
				<input type="text" id="detail" name="detail" bind:value={detailNumber} />
			</label>
			<button type="submit">Search</button>
		</form>
		<div class="results">
			{#if partsUsedOn && partsUsedOn.length > 0}
				<p>Used On:</p>
				{#each partsUsedOn as part}
					<ul>
						<li>{part.PARTNUM}</li>
					</ul>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.container,
	.results {
		margin: 10px;
	}
</style>
