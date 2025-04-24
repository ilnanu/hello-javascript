/*
 * EJERCICIO:
 * ¡Dos de las bandas más grandes de la historia están de vuelta!
 * Oasis y Linkin Park han anunciado nueva gira, pero, ¿quién es más popular?
 * Desarrolla un programa que se conecte al API de Spotify y los compare.
 * Requisitos:
 * 1. Crea una cuenta de desarrollo en https://developer.spotify.com.
 * 2. Conéctate al API utilizando tu lenguaje de programación.
 * 3. Recupera datos de los endpoint que tú quieras.
 * Acciones:
 * 1. Accede a las estadísticas de las dos bandas.
 *    Por ejemplo: número total de seguidores, escuchas mensuales,
 *    canción con más reproducciones...
 * 2. Compara los resultados de, por lo menos, 3 endpoint.
 * 3. Muestra todos los resultados por consola para notificar al usuario.
 * 4. Desarrolla un criterio para seleccionar qué banda es más popular.
 */

require('dotenv').config();
const axios = require('axios');

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
    const res = await axios.post('https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    return res.data.access_token;
}

async function searchArtist(token, name) {
    const res = await axios.get('https://api.spotify.com/v1/search', {
        headers: { 'Authorization': `Bearer ${token}` },
        params: {
            q: name,
            type: 'artist',
            limit: 1
        }
    });
    return res.data.artists.items[0];
}

async function getTopTracks(token, artistId) {
    const res = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { market: 'US' }
    });
    return res.data.tracks;
}

function mostrarResultados(banda) {
    console.log(`\n🎸 Resultados de ${banda.nombre}`);
    console.log(`📣 Seguidores: ${banda.followers.toLocaleString()}`);
    console.log(`🎧 Oyentes mensuales: ${banda.monthlyListeners.toLocaleString()}`);
    console.log(`🔥 Canción más popular: "${banda.topTrack.name}" con ${banda.topTrack.popularity}/100 de popularidad`);
}

function compararBandas(b1, b2) {
    let score1 = 0, score2 = 0;

    if (b1.followers > b2.followers) score1++; else score2++;
    if (b1.monthlyListeners > b2.monthlyListeners) score1++; else score2++;
    if (b1.topTrack.popularity > b2.topTrack.popularity) score1++; else score2++;

    console.log(`\n🥇 Resultado final:`);
    if (score1 > score2) console.log(`${b1.nombre} es más popular que ${b2.nombre} 🎉`);
    else if (score2 > score1) console.log(`${b2.nombre} es más popular que ${b1.nombre} 🎉`);
    else console.log(`¡Empate técnico entre ${b1.nombre} y ${b2.nombre}! 🤝`);
}

async function main() {
    const token = await getAccessToken();

    const bandas = ['Oasis', 'Linkin Park'];
    const resultados = [];

    for (let nombre of bandas) {
        const artista = await searchArtist(token, nombre);
        const topTracks = await getTopTracks(token, artista.id);

        resultados.push({
            nombre: artista.name,
            followers: artista.followers.total,
            monthlyListeners: artista.popularity * 10000, // aproximación
            topTrack: {
                name: topTracks[0].name,
                popularity: topTracks[0].popularity
            }
        });
    }

    resultados.forEach(mostrarResultados);
    compararBandas(resultados[0], resultados[1]);
}

main();
