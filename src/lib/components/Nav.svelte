<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import logo from '/imaginetics_logo.png';

	let responsive = false;
</script>

<div class="header">
	<div class="nav-top">
		<h1>
			<a href="/" target="_parent"
				><img src={logo} alt="imaginetics logo" style="background-color: slategrey;" /></a
			>
		</h1>
		<div class="search">
			<SearchBar />
		</div>
		<div class="sm-dropdown">
			<button class="sm-dropBtn" on:click|preventDefault={() => (responsive = !responsive)}
				>&#9776;</button
			>
		</div>
	</div>

	<div class="nav-links" class:responsive>
		<!-- let's make a dropdown to de-clutter this clusterfuck -->
		<div>
			<a href="/burndown" style="color: darkred;" target="_parent">Burndown</a>
		</div>
		<!-- dropdowns -->
		<!-- Assembly -->
		<div class="dropdown">
			<a class="dropdown-btn" href="/">Assembly</a>
			<div class="dropdown-menu">
				<a href="/dept/0301" target="_parent">Stores ID & Issue</a>
				<a href="/dept/0302" target="_parent">Assembly ID & Issue</a>
				<a href="/dept/2200" target="_parent">Assembly</a>
				<a href="/dept/2650" target="_parent">Assembly Countersink</a>
				<a href="/dept/5075" target="_parent">Part Mark Overcoat</a>
			</div>
		</div>
		<!-- Sheet Metal -->
		<div class="dropdown">
			<a class="dropdown-btn" href="/">Sheet Metal</a>
			<div class="dropdown-menu">
				<!-- <a href="/dept/0300" target="_parent">Material ID & Issue</a> -->
				<a sveltekit:prefetch href="/dept/0300/0500" target="_parent">ID & Issue | Saw</a>
				<a sveltekit:prefetch href="/dept/0401/1400" target="_parent">Shear | Router</a>
				<!-- <a href="/dept/0500" target="_parent">Saw</a> -->
				<a sveltekit:prefetch href="/dept/0700/0750" target="_parent">CNC Punch | AMADA 2510NT</a>
				<a sveltekit:prefetch href="/dept/0900/1000" target="_parent">Punch Press | Hydroform</a>
				<!-- <a href="/dept/0700" target="_parent">CNC PUNCH</a> -->
				<!-- <a href="/dept/0750" target="_parent">AMADA 2510NT</a> -->
				<!-- <a href="/dept/0900" target="_parent">Punch Press</a> -->
				<a href="/dept/0950" target="_parent">Hot Joggle</a>
				<!-- <a href="/dept/1000" target="_parent">Hydroform</a> -->
				<a href="/dept/1100" target="_parent">Roll Form</a>
				<a href="/dept/1200" target="_parent">Notcher</a>
				<!-- <a href="/dept/1400" target="_parent">Router</a> -->
				<a href="/dept/1600" target="_parent">Deburr</a>
				<a href="/dept/1700" target="_parent">Brake Press</a>
				<a href="/dept/5600" target="_parent">Abrasive Blast</a>
				<a href="/dept/1800" target="_parent">Straightening</a>
			</div>
		</div>
		<!-- Inspection -->
		<div class="dropdown">
			<a class="dropdown-btn" href="/">Inspection</a>
			<div class="dropdown-menu">
				<a href="/dept/2000" target="_parent">Insp Sheet Metal</a>
				<a href="/dept/2005" target="_parent">Insp CNC</a>
				<a href="/dept/2020" target="_parent">Insp Heat Treat</a>
				<a href="/dept/2040" target="_parent">Insp Finish</a>
				<!-- <a href="/dept/5030" target="_parent">Insp Prime</a> -->
				<!-- <a href="/dept/5035" target="_parent">Insp Topcoat</a> -->
				<a sveltekit:prefetch href="/dept/5030/5035" target="_parent">Insp Prime | TC</a>
				<a href="/dept/5099" target="_parent">IMAG CERT</a>
				<a href="/dept/2050" target="_parent">Insp Assembly</a>
				<a href="/dept/2060" target="_parent">Insp Final</a>
			</div>
		</div>
		<!-- Machine Shop -->
		<div class="dropdown">
			<a class="dropdown-btn" href="/cnc" target="_parent">Machine Shop</a>
			<div class="dropdown-menu">
				<a href="/dept/0611" target="_parent">VF1 3-Axis</a>
				<a href="/dept/0600" target="_parent">VF2 3-Axis</a>
				<a href="/dept/0603" target="_parent">VF6 3-Axis</a>
				<a href="/dept/0640" target="_parent">VF6 5-Axis</a>
				<a href="/dept/0607" target="_parent">VF7 3-Axis</a>
				<a href="/dept/0605" target="_parent">VF10 3-Axis</a>
				<a href="/dept/0625" target="_parent">VF10 4-Axis</a>
				<a href="/dept/0604" target="_parent">VX-1000 3-Axis</a>
				<a href="/dept/0624" target="_parent">VX-1500 4-Axis</a>
				<a href="/dept/0630" target="_parent">EC 400 Horizontal</a>
				<a href="/dept/0631" target="_parent">EC 400 Pallet Pool</a>
				<a href="/dept/0602" target="_parent">Mori Seki 3-Axis</a>
				<a href="/dept/0632" target="_parent">Okuma MB 5000</a>
				<a href="/dept/0642" target="_parent">Okuma 5-Axis</a>
				<a sveltekit:prefetch href="/dept/0800">Manual Milling</a>
			</div>
		</div>
		<!-- Paint Shop -->
		<div class="dropdown">
			<a href="/dept/5045/5050" target="_parent" class="dropdown-btn">Building 2</a>
			<div class="dropdown-menu">
				<a sveltekit:prefetch href="/dept/5225/5010" target="_parent"
					>Penetrant Inspect | Chemline</a
				>
				<!-- <a href="/dept/5010" target="_parent">Chemline</a> -->
				<a href="/dept/5020" target="_parent">Masking</a>
				<a sveltekit:prefetch href="/dept/5045/5050">Primer | Topcoat</a>
				<!-- <a href="/dept/5045" target="_parent">Primer</a> -->
				<!-- <a href="/dept/5050" target="_parent">Topcoat</a> -->
				<a href="/dept/5080" target="_parent">Rework</a>
				<a href="/dept/5085" target="_parent">Minor Touch Up</a>
			</div>
		</div>
		<div class="dropdown">
			<a href="/dept/2400" target="_parent">Shipping</a>
			<div class="dropdown-menu">
				<a sveltekit:prefetch href="/dept/2300" target="_parent">Part Mark</a>
				<a sveltekit:prefetch href="/dept/2400">Shipping</a>
				<a sveltekit:prefetch href="/inv">Inventory Locations</a>
				<a sveltekit:prefetch href="/shipping/available-ship">Available Ship</a>
			</div>
		</div>
	</div>
</div>

<style>
	* {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	h1 {
		font-weight: 100;
		flex: 1;
	}

	.header {
		display: flex;
		flex-direction: column;
		border-bottom: 0.5px solid black;
		background: slategray;
		padding: 10px;
	}

	.nav-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* justify-content: space-around; */
	}

	.nav-links {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin: 0 10px;
	}

	.nav-links a {
		list-style-type: none;
		flex-wrap: wrap;
		padding: 5px;
	}

	a {
		text-decoration: none;
		color: #e1e1e1;
	}

	a:hover {
		color: #ffffff;
	}

	a:active {
		color: white;
	}

	.dropdown:hover .dropdown-menu {
		display: flex;
		flex-direction: column;
		position: absolute;
		background-color: rgba(112, 128, 144, 1);
		padding: 1em;
		border-bottom-right-radius: 15px;
		box-shadow: 2px 2px rgba(0, 0, 0, 0.7);
	}

	.dropdown-menu {
		display: none;
		z-index: 2;
	}

	@media screen and (max-width: 640px) {
		.nav-links {
			display: none;
		}

		.responsive {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: flex-start;
		}

		.responsive:hover .dropdown-menu {
			position: absolute;
			left: 90px;
			top: 50px;
		}

		.search {
			display: none;
		}

		img {
			width: 360px;
		}

		.sm-dropBtn {
			display: block;
			text-align: center;
			background-color: transparent;
			color: rgba(255, 255, 255, 1);
			border: none;
			font-size: 1.3em;
		}

		.sm-dropBtn:hover {
			background-color: lightslategray;
		}
	}

	@media screen and (min-width: 640px) {
		.sm-dropBtn {
			display: none;
		}
	}
</style>
