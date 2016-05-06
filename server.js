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
        createBookChapterFolder(book, epub);
        console.log(epub.metadata.title + ' Finished!');
    });
    epub.parse();
}

function createBookMetadata(book, epub) {
    // Create book folder
    var bookFolder = __dirname + '/' + book.jsonfolder;
    mkdirp.sync(bookFolder);
    // TODO: Turn the JSON coming from the epub into a finished product
    // Create the metadata file
    var epubMetadata = extractMetadata(epub);
    var epubMetadataFileLocation = bookFolder + 'metadata.json';
    fs.writeFile(epubMetadataFileLocation, epubMetadata);
    // TODO: Remove this second writeFile when we have a finished JSON
    // metadata file
    fs.writeFile(bookFolder + book.jsonfile, JSON.stringify(epub, null, 2));
}

function createBookChapterFolder(book, epub) {
    var chapterdir = book.jsonfolder + 'chapters/';
    mkdirp.sync(__dirname + '/' + chapterdir);
    epub.flow.forEach(function(chapter) {
        epub.getChapter(chapter.id, function(error, text) {
            var chapterfile = chapterdir;
            chapterfile += cleanString(chapter.href, '/', true);
            fs.writeFile(chapterfile, text, 'utf-8');
        });
    });
}

function extractMetadata(epub) {
    // Extract the metadata from the epub file
    var epubMetadata = epub.metadata;
    // Create a new JSON object to store the book metadata
    var json = {};
    // Add the metadata extracted to the JSON object
    json.title = cleanString(epubMetadata.title, ':');
    json.isbn = epubMetadata.ISBN;
    json.author = epubMetadata.creator;
    json.publisher = epubMetadata.publisher;
    // Turn json into a string to be stored
    var result = JSON.stringify(json, null, 2);
    return result;
}

/**
 * Strips a string from content before or after a chosen substring.
 * @arg {string} string - The original string to be stripped.
 * @arg {string} substring - The string that will separate the part of the
    original string that you want to keep from the rest of the original
    string.
 * @arg {boolean} fromTheEnd - Start the search for the substring at the end of
    the original string. The default value is false.
 * @return {string} A string without the content before or after a chosen
    substring. If the original string did not contain said substring, a copy
    of the original string is returned instead.
 */
function cleanString(string, substring, fromTheEnd) {
    var newString = string;
    var pos;
    if (fromTheEnd) {
        pos = string.lastIndexOf(substring);
        if (pos != -1) {
            newString = string.slice(pos);
        }
    } else {
        pos = string.indexOf(substring);
        if (pos != -1) {
            newString = string.slice(0, pos);
        }
    }
    return newString;
}
