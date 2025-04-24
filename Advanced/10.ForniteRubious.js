/*
 * EJERCICIO:
 * ¡Rubius tiene su propia skin en Fortnite!
 * Y va a organizar una competición para celebrarlo.
 * Esta es la lista de participantes:
 * https://x.com/Rubiu5/status/1840161450154692876
 *
 * Desarrolla un programa que obtenga el número de seguidores en
 * Twitch de cada participante, la fecha de creación de la cuenta 
 * y ordene los resultados en dos listados.
 * - Usa el API de Twitch: https://dev.twitch.tv/docs/api/reference
 *   (NO subas las credenciales de autenticación)
 * - Crea un ranking por número de seguidores y por antigüedad.
 * - Si algún participante no tiene usuario en Twitch, debe reflejarlo.
 */
/*
Obtener token de autenticación:
curl -X POST "https://id.twitch.tv/oauth2/token" \
-d "client_id=TU_CLIENT_ID" \
-d "client_secret=TU_CLIENT_SECRET" \
-d "grant_type=client_credentials"
*/
require('dotenv').config();
const axios = require('axios');

// Lista de usuarios de Twitch (extraída del tweet)
const participantes = [
    'ElRubius', 'xokas', 'auronplay', 'ibai', 'juansguarnizo', 'karchez',
    'llobeti4', 'axol_', 'elmariana', 'folagor03', 'zeling', 'elenacupcake'
];

let accessToken = '';
let headers = {};

async function obtenerToken() {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
            client_id: process.env.TWITCH_CLIENT_ID,
            client_secret: process.env.TWITCH_CLIENT_SECRET,
            grant_type: 'client_credentials'
        }
    });
    accessToken = response.data.access_token;
    headers = {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`
    };
}

async function obtenerDatosUsuario(username) {
    try {
        const res = await axios.get(`https://api.twitch.tv/helix/users`, {
            headers,
            params: { login: username }
        });

        if (res.data.data.length === 0) {
            return { username, existe: false };
        }

        const user = res.data.data[0];

        // Obtener seguidores
        const followersRes = await axios.get('https://api.twitch.tv/helix/users/follows', {
            headers,
            params: { to_id: user.id }
        });

        return {
            username,
            existe: true,
            id: user.id,
            created_at: user.created_at,
            followers: followersRes.data.total
        };
    } catch (error) {
        return { username, existe: false };
    }
}

async function main() {
    await obtenerToken();

    const resultados = await Promise.all(participantes.map(obtenerDatosUsuario));

    const existentes = resultados.filter(r => r.existe);
    const noExistentes = resultados.filter(r => !r.existe);

    const rankingSeguidores = [...existentes].sort((a, b) => b.followers - a.followers);
    const rankingAntiguedad = [...existentes].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    console.log('\n📊 RANKING POR SEGUIDORES:');
    rankingSeguidores.forEach((r, i) => {
        console.log(`${i + 1}. ${r.username}: ${r.followers} seguidores`);
    });

    console.log('\n📅 RANKING POR ANTIGÜEDAD:');
    rankingAntiguedad.forEach((r, i) => {
        console.log(`${i + 1}. ${r.username}: creada el ${new Date(r.created_at).toDateString()}`);
    });

    if (noExistentes.length > 0) {
        console.log('\n❌ USUARIOS NO ENCONTRADOS EN TWITCH:');
        noExistentes.forEach(r => console.log(`- ${r.username}`));
    }
}

main();
