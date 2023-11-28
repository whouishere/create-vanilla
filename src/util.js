import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { exit } from 'process';

/**
 * Writes a data string to a file
 * @param {string} data Data to write to the file
 * @param {string} path To be writter file path
 */
export function writeToFile(data, path) {
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.error(err);
            exit(1);
        }
    });
}

/**
 * Writes an Object to a JSON file.
 * @param {{}} object JavaScript Object
 * @param {string} path File path where the JSON will be written
 */
export function writeToJson(object, path) {
    writeToFile(JSON.stringify(object, null, 2), path);
}

/**
 * Returns the current project's root path
 * @returns string
 */
export function getRootPath() {
    // get the absolute path of the current module
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // get the relative root path and correct it to an absolute path
    // kinda disgusting
    return fileURLToPath(pathToFileURL(`${__dirname}/..`));
}

/**
 * Copies source directory's contents to target recursively
 * @param {string} source Source directory
 * @param {string} target Target directory
 */
export function cpRecursive(source, target) {
    const files = fs.readdirSync(source, null);

    for (const file of files) {
        fs.cp(`${source}/${file}`, `${target}/${file}`, { recursive: true }, (err) => {
            if (err) {
                console.error(err);
                exit(1);
            }
        });
    }
}

// TODO: create a panic function
