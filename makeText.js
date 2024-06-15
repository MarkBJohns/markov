/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const { log, error } = require('console');

const textGenerator = (text) => {
    let MM = new markov(text);
    log(MM.makeText());
}

const readFile = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            error(
                `ERROR - cannot read file: 
                
                "${path}"
                `
            );
            process.exit(1);
        } else {
            textGenerator(data);
        }
    });
}

const readURL = async (url) => {
    let response;
    try {
        response = await axios.get(url);
    } catch (err) {
        error(
            `ERROR - cannot read URL:
            
            "${url}"
            `
        );
        process.exit(1);
    }
    
    textGenerator(response.data);
}

let [method, path] = process.argv.slice(2);

if (method === 'file') {
    readFile(path);
} else if (method === 'url') {
    readURL(path);
} else {
    error(
        `ERROR - cannot read method:
        
        "${method}"
        `
    );
    process.exit(1);
}