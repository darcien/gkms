<script lang="ts">
	import { colorBySlug, stats, radioLastFetchedAt, getNameBySlug } from '$lib/radio';
	import { siteName } from '$lib/constants';
	import DataUpdatedAt from '$lib/DataUpdatedAt.svelte';
	import { sortByJaLocale } from '$lib/sortUtils';

	const {
		groupedSlugFreq,
		firsRadioAiredAt,
		totalEpisodesCount,
		totalGuestsCount,
		castOldestVisit,
		mostCommonGuestCombi
	} = stats;

	const cast = groupedSlugFreq.cast as Array<[string, number]>;

	const maxFreq = Math.max(...cast.map(([, freq]) => freq));
	const guests = cast.map(([slug, freq]) => {
		return { slug, freq };
	});

	const now = new Date();

	const calculateDaysSince = (dateString: string) => {
		const date = new Date(dateString);
		const diffTime = Math.abs(now.getTime() - date.getTime());
		return Math.floor(diffTime / (1000 * 60 * 60 * 24));
	};

	const daysSinceFirstAir = calculateDaysSince(firsRadioAiredAt);
	const daysSinceOldestVisit = calculateDaysSince(castOldestVisit.visitedAt);

	const formattedMostCommonGuestCombi = mostCommonGuestCombi.combinations
		.map((slugs) =>
			slugs
				.map((slug) => getNameBySlug(slug))
				.toSorted(sortByJaLocale)
				.join(' & ')
		)
		.toSorted(sortByJaLocale);
</script>

<svelte:head>
	<title>{siteName}</title>
	<meta
		name="description"
		content="A fansite for Gakuen Idolmaster Hatsuboshi Gakuen Broadcasting Club"
	/>
</svelte:head>

<div class="flex flex-col items-center px-4 pt-6 pb-12">
	<h2 class=" text-xl font-medium text-neutral-600">Broadcast Report Card</h2>
	<div
		class="mb-6 flex w-full max-w-3xl items-center justify-center gap-2 px-6 text-[0.5rem] text-neutral-600"
	>
		<span>✦</span>
		<span class="h-0.5 w-full bg-neutral-600"></span>
		<span>✦</span>
	</div>

	<div
		class="border-border grid w-full max-w-3xl min-w-80 grid-cols-1 border-2 bg-white text-lg text-neutral-500 md:grid-cols-2"
	>
		<!-- Top stats section -->
		<div class="border-border border-b-2 px-6 py-4 md:border-r-2">
			<div class="flex items-center justify-between">
				<div>Days since first air</div>
				<div class="text-4xl font-bold text-neutral-800">
					{daysSinceFirstAir}<span class="text-2xl font-semibold text-neutral-800">日</span>
				</div>
			</div>
		</div>
		<div class="border-border border-b-2 px-6 py-4">
			<div class="flex items-center justify-between">
				<div>Total episode aired</div>
				<div class="text-4xl font-bold text-neutral-800">{totalEpisodesCount}</div>
			</div>
		</div>

		<!-- Total guests section - spans 2 columns -->
		<div class="border-border col-span-1 border-b-2 px-6 py-4 md:col-span-2">
			<div class="flex items-center justify-between">
				<div>Total number of guests visited</div>
				<div class="text-3xl font-medium text-neutral-800">{totalGuestsCount}人</div>
			</div>
		</div>

		<!-- Guests bars section -->
		<div class="border-border border-b-2 px-6 py-4 md:border-r-2">
			<div class="flex flex-col gap-4">
				{#each guests as { slug, freq } (slug)}
					<div class="flex items-center">
						<div class="mr-2 w-16 text-xs">{getNameBySlug(slug)}</div>
						<div class="flex-1">
							<div
								class="h-8"
								style="width: {Math.round((freq / maxFreq) * 100)}%; background-color: {colorBySlug[
									slug as keyof typeof colorBySlug
								] || '#666'}"
							></div>
							<span class=" text-neutral-400">{freq}回</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right panel stats -->
		<div class="border-border border-b-2">
			<div class="flex flex-col">
				<div class="border-border border-b-2 px-6 py-2">
					<div class="flex flex-col items-center justify-between gap-2">
						<div>Most common cast combination ({mostCommonGuestCombi.frequency}回)</div>
						{#each formattedMostCommonGuestCombi as combi (combi)}
							<div class="text-3xl font-medium text-neutral-800">
								{combi}
							</div>
						{/each}
					</div>
				</div>
				<div class="border-border border-b-2 px-6 py-2">
					<div class="flex flex-col items-center justify-between">
						<div>Cast least recent visit</div>
						<div class="text-3xl font-medium text-neutral-800">
							{getNameBySlug(castOldestVisit.slug)} ({daysSinceOldestVisit}日)
						</div>
					</div>
				</div>
				<div class="border-border border-b-2 px-6 py-2">
					<div class="flex items-center justify-between">
						<div>Test row</div>
						<div>{now.toISOString()}</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Test row, remove this later -->
		<div class="h-4 bg-red-200 p-4"></div>
		<div class="h-4 bg-green-200 p-4"></div>
	</div>

	<DataUpdatedAt updatedAt={radioLastFetchedAt} />
</div>
