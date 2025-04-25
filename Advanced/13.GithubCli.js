/*
 * EJERCICIO:
 * ¡Me voy de viaje al GitHub Universe 2024 de San Francisco!
 *
 * Desarrolla un CLI (Command Line Interface) que permita 
 * interactuar con Git y GitHub de manera real desde terminal.
 * 
 * El programa debe permitir las siguientes opciones:
 * 1. Establecer el directorio de trabajo
 * 2. Crear un nuevo repositorio
 * 3. Crear una nueva rama
 * 4. Cambiar de rama
 * 5. Mostrar ficheros pendientes de hacer commit
 * 6. Hacer commit (junto con un add de todos los ficheros)
 * 7. Mostrar el historial de commits
 * 8. Eliminar rama
 * 9. Establecer repositorio remoto
 * 10. Hacer pull
 * 11. Hacer push
 * 12. Salir
 *
 * Puedes intentar controlar los diferentes errores.
 */
#!/usr/bin / env node

const inquirer = require('inquirer');
const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

let currentDir = process.cwd();
let git = simpleGit(currentDir);

async function setWorkDir() {
    const { dir } = await inquirer.prompt({
        type: 'input',
        name: 'dir',
        message: '📁 Ingresa la ruta del nuevo directorio de trabajo:',
        default: currentDir
    });

    if (fs.existsSync(dir)) {
        currentDir = path.resolve(dir);
        git = simpleGit(currentDir);
        console.log(chalk.green(`✅ Directorio cambiado a: ${currentDir}`));
    } else {
        console.log(chalk.red('❌ El directorio no existe.'));
    }
}

async function createRepo() {
    await git.init();
    console.log(chalk.green('✅ Repositorio Git inicializado.'));
}

async function createBranch() {
    const { branch } = await inquirer.prompt({
        type: 'input',
        name: 'branch',
        message: '🌿 Nombre de la nueva rama:'
    });
    await git.checkoutLocalBranch(branch);
    console.log(chalk.green(`✅ Rama ${branch} creada y seleccionada.`));
}

async function changeBranch() {
    const branches = await git.branchLocal();
    const { branch } = await inquirer.prompt({
        type: 'list',
        name: 'branch',
        message: '🔁 Elige una rama para cambiar:',
        choices: branches.all
    });
    await git.checkout(branch);
    console.log(chalk.green(`✅ Cambiado a rama: ${branch}`));
}

async function showStatus() {
    const status = await git.status();
    if (status.files.length === 0) {
        console.log(chalk.yellow('😎 No hay cambios pendientes.'));
    } else {
        console.log(chalk.cyan('📄 Archivos modificados:'));
        status.files.forEach(file => console.log(` - ${file.path}`));
    }
}

async function makeCommit() {
    const { message } = await inquirer.prompt({
        type: 'input',
        name: 'message',
        message: '💬 Mensaje del commit:'
    });

    await git.add('.');
    await git.commit(message);
    console.log(chalk.green(`✅ Commit realizado: "${message}"`));
}

async function showLog() {
    const log = await git.log();
    console.log(chalk.magenta('\n📜 Historial de commits:'));
    log.all.slice(0, 10).forEach(commit => {
        console.log(`🔹 ${commit.date} - ${commit.message} (${commit.hash})`);
    });
}

async function deleteBranch() {
    const branches = await git.branchLocal();
    const { branch } = await inquirer.prompt({
        type: 'list',
        name: 'branch',
        message: '🗑️ Elige una rama para eliminar:',
        choices: branches.all.filter(b => b !== branches.current)
    });
    await git.deleteLocalBranch(branch);
    console.log(chalk.green(`🧹 Rama ${branch} eliminada.`));
}

async function setRemote() {
    const { url } = await inquirer.prompt({
        type: 'input',
        name: 'url',
        message: '🌐 URL del repositorio remoto:'
    });
    try {
        await git.addRemote('origin', url);
        console.log(chalk.green('✅ Remoto origin agregado.'));
    } catch (error) {
        await git.remote(['set-url', 'origin', url]);
        console.log(chalk.yellow('🔁 URL de origin actualizado.'));
    }
}

async function pull() {
    try {
        await git.pull('origin');
        console.log(chalk.green('📥 Pull realizado.'));
    } catch {
        console.log(chalk.red('❌ Error al hacer pull.'));
    }
}

async function push() {
    try {
        await git.push('origin');
        console.log(chalk.green('📤 Push realizado.'));
    } catch {
        console.log(chalk.red('❌ Error al hacer push.'));
    }
}

async function main() {
    while (true) {
        const { option } = await inquirer.prompt({
            type: 'list',
            name: 'option',
            message: `📦 CLI GitHub Universe (Dir actual: ${chalk.blue(currentDir)})`,
            choices: [
                '1. Establecer directorio de trabajo',
                '2. Crear nuevo repositorio',
                '3. Crear nueva rama',
                '4. Cambiar de rama',
                '5. Mostrar archivos pendientes',
                '6. Hacer commit',
                '7. Ver historial de commits',
                '8. Eliminar rama',
                '9. Establecer remoto',
                '10. Hacer pull',
                '11. Hacer push',
                '12. Salir'
            ]
        });

        switch (option[0]) {
            case '1': await setWorkDir(); break;
            case '2': await createRepo(); break;
            case '3': await createBranch(); break;
            case '4': await changeBranch(); break;
            case '5': await showStatus(); break;
            case '6': await makeCommit(); break;
            case '7': await showLog(); break;
            case '8': await deleteBranch(); break;
            case '9': await setRemote(); break;
            case '1': if (option === '10. Hacer pull') await pull(); break;
            case '1': if (option === '11. Hacer push') await push(); break;
            case '1': if (option === '12. Salir') process.exit();
        }
    }
}

main();
