<script context="module">
	const api = import.meta.env.VITE_API_URL;
	export async function load({ page, fetch }) {
		// const urlParams =
		const part = page.query.get('part');
		const run = page.query.get('run').replace(/\D/g, '');
		const po = page.query.get('po');
		const line = page.query.get('line').replace(/\D/g, '');

		// console.log({part: part.trim(), run: run})

		const res = await fetch(`${api}/testing/part?po=${po}&line=${line}&run=${run}&part=${part}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.ok) {
			const data = await res.json();
			// console.log(res)

			return {
				props: { data }
			};
		}

		const { message } = await res.json();
		return {
			status: res.status,
			error: new Error(message)
		};
	}
</script>

<script>
	import UpdateForm from '$lib/components/UpdateForm.svelte';
	export let data;

	// console.log(data)

	let part = {
		part_number: data[0].Part_Num,
		run: data[0].Run,
		po_num: data[0].PO,
		item: data[0].Item,
		comments: data[0].Comments,
		expedite: 'N'
	};
</script>

<svelte:head>
	<meta />
</svelte:head>

<main>
	<div class="warning">
		<h1>WARNING!</h1>
		<h2>
			BEFORE ADDING/MODIFYING A COMMENT MAKE SURE THE RUN # AND ITEM DO NOT CONTAIN LETTERS.<br />
			IF THEY DO, REMOVE THE LETTER, (EXAMPLE 1A => 1).
		</h2>
	</div>
	<UpdateForm {part} />
</main>

<style>
	main {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		display: flex;
		flex-direction: column;
		height: 550px;
		justify-content: center;
		align-items: center;
	}

	.warning {
		color: red;
		text-align: center;
		margin-bottom: 25px;
	}
</style>
