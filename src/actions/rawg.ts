const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = process.env.RAWG_API_URL;

export async function getAllVideojuegos(query = "", maxPages = 5) {
  let allGames: any[] = [];
  for (let page = 1; page <= maxPages; page++) {
    const url = `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=40&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) break;
    const data = await res.json();
    allGames = allGames.concat(data.results);
    if (!data.next) break; // No hay más páginas
  }
  return allGames;
}
