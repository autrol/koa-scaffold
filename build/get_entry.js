var fs   = require('fs');
var glob = require('glob');
var path = require('path');

var entries = getEntry('./app/views/**/index.js', './app/views/');

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath),
        entries = {},
        entry,
        dirname,
        pathname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        pathname = dirname.replace(new RegExp('^' + pathDir), '');
        entries[pathname] = entry;
    }
    return entries;
}

module.exports = {
    entries
};
