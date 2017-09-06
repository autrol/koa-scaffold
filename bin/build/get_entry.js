import fs from 'fs';
import glob from 'glob';
import path from 'path';

var entries = getEntry('./app/views/**/index.js', './app/views/');

function getEntry(globPath, pathDir) {
    let files = glob.sync(globPath),
        entries = {},
        entry,
        dirname,
        pathname;
    for (let i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        pathname = dirname.replace(new RegExp('^' + pathDir), '');
        entries[pathname] = entry;
    }
    return entries;
}

export default {
    entries
};
