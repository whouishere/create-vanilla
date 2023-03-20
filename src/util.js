import fs from 'fs';
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

// TODO: separate this module into its own folder
// TODO: create a panic function
