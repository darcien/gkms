<script lang="ts">
	import '../app.css';
	import NavLink from '$lib/NavLink.svelte';
	import { siteName } from '$lib/constants';
	import { assets, base } from '$app/paths';

	let { children } = $props();
</script>

<header>
	<nav
		class="flex h-16 items-center justify-between gap-2 border-b border-gray-200 bg-white/80 pr-4"
	>
		<h1 class="text-primary flex min-w-0 flex-shrink items-center text-xl font-bold">
			<img src="{assets}/sakinui_ssd_160_32gap.png" alt="Logo" class="h-12 w-auto rotate-45" />
			<a href="{base}/" class="block truncate hover:opacity-80">
				{siteName}
			</a>
		</h1>

		<div class="flex h-full items-center space-x-6">
			<NavLink href="{base}/">Home</NavLink>
			<NavLink href="{base}/about">About</NavLink>
		</div>
	</nav>
</header>

<main>
	{@render children()}
</main>
