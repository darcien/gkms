export async function readJsonFile<T = unknown>(filePath: string): Promise<T> {
  const data = await Deno.readTextFile(filePath);
  return JSON.parse(data) as T;
}

export function writeJsonFile<T = unknown>(filePath: string, data: T) {
  const json = JSON.stringify(data, null, 2);
  return Deno.writeTextFile(filePath, json);
}
