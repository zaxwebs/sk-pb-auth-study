<script>
	let { data } = $props();
</script>

{#each data.items as item}
	<li>
		{item.name}
	</li>
{/each}
