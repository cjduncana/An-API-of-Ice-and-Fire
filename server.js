var fs = require('fs');
var EPub = require('epub');
var mkdirp = require('mkdirp');

// epub json
var books = [
    {
        'epubfile': './epub/A Game Of Thrones.epub',
        'imagewebroot': '',
        'chapterwebroot': '',
        'jsonfile': './a-game-of-thrones.json',
        'jsonfolder': 'books/a-game-of-thrones/'
    }, {
        'epubfile': './epub/A Clash of Kings.epub',
        'imagewebroot': '',
        'chapterwebroot': '',
        'jsonfile': './a-clash-of-kings.json',
        'jsonfolder': 'books/a-clash-of-kings/'
    }, {
        'epubfile': './epub/A Storm of Swords.epub',
        'imagewebroot': '',
        'chapterwebroot': '',
        'jsonfile': './a-storm-of-swords.json',
        'jsonfolder': 'books/a-storm-of-swords/'
    }, {
        'epubfile': './epub/A Feast for Crows.epub',
        'imagewebroot': '',
        'chapterwebroot': '',
        'jsonfile': './a-feast-for-crows.json',
        'jsonfolder': 'books/a-feast-for-crows/'
    }, {
        'epubfile': './epub/A Dance With Dragons.epub',
        'imagewebroot': '/OEBPS/Images/',
        'chapterwebroot': '/OEBPS/Text/',
        'jsonfile': './a-dance-with-dragons.json',
        'jsonfolder': 'books/a-dance-with-dragons/'
    }
];

// Apply the function epubFunc to each book in the books array
books.map(epubFunc);

function epubFunc(book) {
    var epub = new EPub(book.epubfile, book.imagewebroot, book.chapterwebroot);

    epub.on('end', function() {
        createBookMetadata(book, epub);
        var chapterdir = book.jsonfolder + 'chapters/';
        mkdirp.sync(__dirname + '/' + chapterdir);
        epub.flow.forEach(function(chapter) {
            epub.getChapter(chapter.id, function(error, text) {
                var chapterfile = chapterdir;
                chapterfile += stripFilename(chapter.href);
                fs.writeFile(chapterfile, text, 'utf-8');
            });
        });
        console.log(epub.metadata.title + ' Finished!');
    });
    epub.parse();
}

function createBookMetadata(book, epub) {
    // Create book folder
    mkdirp.sync(__dirname + '/' + book.jsonfolder);
    // TODO: Turn the JSON coming from the epub into a finished product
    // Create the metadata file
    var epubMetadata = extractMetadata(epub);
    var epubMetadataFileLocation = book.jsonfolder + 'metadata.json';
    fs.writeFile(epubMetadataFileLocation, epubMetadata);
    // TODO: Remove this second writeFile when we have a finished JSON
    // metadata file
    fs.writeFile(book.jsonfolder + book.jsonfile, JSON.stringify(epub, null, 2));
}

function extractMetadata(epub) {
    return JSON.stringify(epub, null, 2);
}

function stripFilename(file) {
    var newFilename = '';
    var pos = file.lastIndexOf('/');
    if (pos == -1) {
        newFilename += file;
    } else {
        newFilename += file.slice(pos);
    }
    return newFilename;
}
