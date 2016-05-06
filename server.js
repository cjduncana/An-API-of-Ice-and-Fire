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

function epubFunc(book) {
    var epub = new EPub(book.epubfile, book.imagewebroot, book.chapterwebroot);

    epub.on('end', function() {
        var chapterdir = book.jsonfolder + 'chapters/';
        mkdirp.sync(__dirname + '/' + chapterdir);
        fs.writeFile(book.jsonfolder + book.jsonfile, JSON.stringify(epub, null, 2), 'utf-8');
        epub.flow.forEach(function(chapter) {
            epub.getChapter(chapter.id, function(error, text) {
                fs.writeFile(chapterdir + chapter.id + '.html', text, 'utf-8');
            });
        });
        console.log(epub.metadata.title + ' Finished!');
    });
    epub.parse();
}

for (var i in books) {
    var book = books[i];
    epubFunc(book);
}
