/**
 * Honestly this is better left to Japanese native.
 */
export function sortByJaLocale(a: string, b: string) {
	return a.localeCompare(b, ['ja', 'en']);
}
