/*
 * EJERCICIO:
 * GitHub ha publicado el Octoverse 2024, el informe
 * anual del estado de la plataforma:
 * https://octoverse.github.com
 *
 * Utilizando el API de GitHub, crea un informe asociado
 * a un usuario concreto.
 * 
 * - Se debe poder definir el nombre del usuario
 *   sobre el que se va a generar el informe.
 *   
 * - Crea un informe de usuario basándote en las 5 métricas
 *   que tú quieras, utilizando la información que te
 *   proporciona GitHub. Por ejemplo:
 *   - Lenguaje más utilizado
 *   - Cantidad de repositorios
 *   - Seguidores/Seguidos
 *   - Stars/forks
 *   - Contribuciones
 *   (lo que se te ocurra)
 */
const axios = require("axios");

const username = process.argv[2]; // Puedes pasar el nombre como argumento

if (!username) {
    console.error("❗️Debes pasar un nombre de usuario de GitHub como argumento.");
    console.error("Ejemplo: node githubInforme.js mouredev");
    process.exit(1);
}

const githubApi = axios.create({
    baseURL: "https://api.github.com/",
    headers: {
        "User-Agent": "github-user-report",
        Accept: "application/vnd.github.v3+json"
        // Si te ratea por límite de peticiones, puedes usar un token:
        // Authorization: `Bearer TU_TOKEN`
    },
});

const obtenerInformeUsuario = async (user) => {
    try {
        // Datos básicos
        const { data: usuario } = await githubApi.get(`/users/${user}`);

        // Repositorios públicos (paginado)
        let page = 1;
        let todosRepos = [];

        while (true) {
            const { data: repos } = await githubApi.get(`/users/${user}/repos`, {
                params: {
                    per_page: 100,
                    page,
                },
            });

            todosRepos = todosRepos.concat(repos);
            if (repos.length < 100) break;
            page++;
        }

        const totalRepos = todosRepos.length;
        const totalStars = todosRepos.reduce((acc, r) => acc + r.stargazers_count, 0);

        // Lenguajes más usados
        const lenguajes = {};
        todosRepos.forEach((repo) => {
            if (repo.language) {
                lenguajes[repo.language] = (lenguajes[repo.language] || 0) + 1;
            }
        });

        const lenguajePopular = Object.entries(lenguajes)
            .sort((a, b) => b[1] - a[1])[0]?.[0] || "Desconocido";

        // Repos más forkeados
        const reposMasForks = todosRepos
            .sort((a, b) => b.forks_count - a.forks_count)
            .slice(0, 3)
            .map((r) => `- ${r.name} (${r.forks_count} forks)`);

        // Mostrar informe
        console.log("\n📊 INFORME GITHUB: @" + user);
        console.log(`👤 Nombre: ${usuario.name || "No especificado"}`);
        console.log(`🌐 Ubicación: ${usuario.location || "Desconocida"}`);
        console.log(`📦 Total repos públicos: ${totalRepos}`);
        console.log(`⭐ Total estrellas recibidas: ${totalStars}`);
        console.log(`💬 Lenguaje más usado: ${lenguajePopular}`);
        console.log(`👥 Seguidores: ${usuario.followers}`);
        console.log(`➡️ Siguiendo: ${usuario.following}`);
        console.log("🔁 Top 3 repositorios más forkeados:");
        reposMasForks.forEach((linea) => console.log(linea));
        console.log();
    } catch (error) {
        console.error("❌ Error al obtener los datos:", error.response?.data?.message || error.message);
    }
};

obtenerInformeUsuario(username);
