<script lang="ts">
	export let updatedAt: string;
	const date = new Date(updatedAt);
</script>

<div class="absolute right-2 bottom-2 text-xs text-neutral-500" title={date.toISOString()}>
	Data updated at {date.toLocaleString()}
</div>
