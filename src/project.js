import fs from 'fs';
import { exit } from 'process';
import dependencies from './dependencies.js';
import * as util from './util.js';

const eslintrc = {
    env: {
        browser: true, 
        es2021: true
    }, 
    extends: 'eslint:recommended', 
    parserOptions: {
        ecmaVersion: 'latest'
    }
};

const biomerc = {
    linter: {
        enabled: true, 
        rules: {
            recommended: true
        }
    }
};

// prettier configuration won't differ from the default
const prettierrc = {};

const prettierignore = `# Ignore environment-based files
.DS_Store
.vscode
.env
.env.*
!.env.example

# Ignore lock files
package-lock.json
yarn.lock
pnpm-lock.yaml
`;

/**
 * @param {{ project: string, linter: string, prettier: boolean }} responses 
 * @returns {{}}
 */
const getDevDependencies = (responses) => {
    // default dependencies
    const dev = {
        'live-server': dependencies.liveServer
    };

    switch (responses.linter) {
        case 'eslint': 
            dev.eslint = dependencies.eslint;
            
            if (responses.prettier) {
                dev.prettier = dependencies.prettier;
            }
            break;
        
        case 'biome':
            dev.biome = dependencies.biome;
            break;
        
        default:
            break;
    }

    return dev;
};

/**
 * Creates the project folder and configuration files, based on prompt responses
 * @param {{ project: string, linter: string, prettier: boolean }} responses 
 */
function create(responses) {
    if (fs.existsSync(`${responses.project}/package.json`)) {
        console.error(`Project "${responses.project}" already exists.`);
        exit(1);
    }

    fs.mkdir(responses.project, (err) => {
        // ignore if there is no error or if directory already exists
        if (err && err.code !== 'EEXIST') {
            console.error(err);
            exit(1);
        }
    });

    const packageJson = {
        name: responses.project, 
        version: '0.0.0', 
        scripts: {
            dev: 'live-server'
        }, 
        devDependencies: getDevDependencies(responses)
    };
    util.writeToJson(packageJson, `${responses.project}/package.json`);

    // create configuration files
    switch (responses.linter) {
        case 'eslint':
            util.writeToJson(eslintrc, `${responses.project}/.eslintrc.json`);

            if (responses.prettier) {
                util.writeToJson(prettierrc, `${responses.project}/.prettierrc`);
                util.writeToFile(prettierignore, `${responses.project}/.prettierignore`);
            }
            break;
        
        case 'biome':
            util.writeToJson(biomerc, `${responses.project}/biome.json`);
            break;
    
        default:
            break;
    }

    // copy the template to the project
    util.cpRecursive(`${util.getRootPath()}/template`, responses.project);
}
            
export default {
    create
};
