<script lang="ts">
	export let color = '#FF3E00';
	export let unit = 'px';
	export let duration = '0.75s';
	export let size = '60';
</script>

<div class="loading-container">
	<div class="spinner" style="--size: {size}{unit}; --color: {color}; --duration: {duration}" />
</div>

<style>
	.loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300px;
		width: 300px;
	}
	.spinner {
		height: 60px;
		width: 60px;
		border-color: tomato transparent tomato tomato;
		border-width: calc(60 / 15);
		border-style: solid;
		border-image: initial;
		border-radius: 50%;
		animation: 0.75s linear 0s infinite normal none running spin;
	}
	@keyframes spin {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
