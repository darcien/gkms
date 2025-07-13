<script lang="ts">
	import { page } from '$app/state';

	let { href, children }: { href: string; children: import('svelte').Snippet } = $props();

	const isActive = $derived(page.url.pathname === href);
</script>

<div class="relative flex h-full items-center">
	<a
		{href}
		class="font-medium transition-colors {isActive
			? 'text-primary'
			: 'hover:text-primary text-gray-700'}"
	>
		{@render children()}
	</a>
	<span
		class="bg-primary absolute right-0 bottom-0 left-0 h-0.5 transition-opacity duration-300 {isActive
			? 'opacity-100'
			: 'opacity-0'}"
	></span>
</div>
