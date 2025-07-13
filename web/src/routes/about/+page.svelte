<script>
	import { assets } from '$app/paths';
	import { siteName } from '$lib/constants';
</script>

<svelte:head>
	<title>About - {siteName}</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-6 md:px-0">
	<h2 class="text-primary mb-6 text-3xl font-bold">About {siteName}</h2>

	<div class="prose prose-lg max-w-none leading-relaxed text-gray-700">
		<p>
			Honestly I'm still not sure what am I trying to create. It started when I have the dumb idea
			of trying to predict who is the next guests in the radio. I could try to come up with multiple
			prediction strategy, and compare/train the strategy progressively.
		</p>

		<p>
			Then I saw the produce report card in-game, it's kinda neat, I really like the design. And in
			one of the radio episode, I remember a conversation about how many time the guest has
			appeared. Wait, that kinda overlaps with the data I have for the prediction.
		</p>

		<p>
			So yeah, now the prediction pivoted into a report card, but for the radio instead. It's still
			pretty much in progress as I haven't figured out what are all the stats to display. Right now
			the amount of data is limited to the metadata of the radio itself. But ideally I want to show
			stats based on the radio content. That would require downloading the actual audio, and
			transcribing it, and running text analysis on it.
		</p>

		<h3>What is that weird image used in logo and background?</h3>

		<p>It's a Saki chibigurumi inside SSD tumbler.</p>

		<figure class="mx-auto">
			<img
				src="{assets}/sakinui_upright.jpg"
				alt="Sakinui on SSD tumbler"
				class="mx-auto h-128 w-auto"
			/>
			<figcaption class="mt-1 text-center">
				Original photo, before it's processed for outlining and recolor.
			</figcaption>
		</figure>

		<h3>The website name sucks!</h3>

		<p>Thanks. I still haven't figured out what to do with it, let alone naming it.</p>

		<h3>How to contact you?</h3>

		<p>
			You can find my contact details in
			<a href="https://darcien.dev" target="_blank" rel="noopener">my blog</a>.
		</p>
	</div>
</div>
