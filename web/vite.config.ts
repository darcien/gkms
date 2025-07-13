import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	test: {
		projects: [
			// Browser test blows ups with this error:
			// The following Vite config options will be overridden by SvelteKit:
			//   - base
			//  ✓  server  src/demo.spec.ts (1 test) 1ms
			// 7:09:01 PM [vite] (ssr) Error when evaluating SSR module /node_modules/@sveltejs/kit/src/runtime/server/index.js: Cannot read properties of undefined (reading 'wrapDynamicImport')
			// ...rest
			// Not interested in fixing this right now
			// https://github.com/sveltejs/kit/issues/10446
			// {
			// 	extends: './vite.config.ts',
			// 	test: {
			// 		name: 'client',
			// 		environment: 'browser',
			// 		browser: {
			// 			enabled: true,
			// 			provider: 'playwright',
			// 			instances: [{ browser: 'chromium' }]
			// 		},
			// 		include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
			// 		exclude: ['src/lib/server/**'],
			// 		setupFiles: ['./vitest-setup-client.ts']
			// 	}
			// },
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
