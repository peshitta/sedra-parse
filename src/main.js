/** @module sedraParse */
import { toCal } from 'sedra-cal';

/**
 * Regex to remove ids from root rows and extract relevant information
 * @const
 * @type { RegExp }
 */
const rootRegex = /0:\d+,("[A-Z;/*-]+")(,.+)\r\n/gm;
/**
 * Build roots javascript from root records e.g. 0:2,"AB","ab           |A",0
 * @static
 * @param { string } content Sedra root records
 * @returns { string } JavaScript root representation
 */
const getRoots = content => {
  const lines = content.replace(
    rootRegex,
    (match, root, line) => `,r(${toCal(root)}${line})`
  );
  return `Object.freeze([${lines}]);`;
};

/**
 * Regex to remove ids from lexeme records and extract relevant information
 * @const
 * @type { RegExp }
 */
const lexemeRegex = /1:\d+,(?:0:(\d+,)|(NULL,))("[A-Z;/ -]+")(,.+)\r\n/gm;
/**
 * Build lexemes javascript from lexeme records e.g. 1:2,0:2,"ABA",41960448,16
 * @static
 * @param { string } content Lexeme text records
 * @returns { string } Lexeme javascript records
 */
const getLexemes = content => {
  const lines = content.replace(
    lexemeRegex,
    (match, id, noId, lexeme, line) =>
      `,l(${noId ? 'null,' : id}${toCal(lexeme.replace(' "', '"'))}${line})`
  );
  return `Object.freeze([${lines}]);`;
};

/**
 * Regex to remove ids from word records and extract wanted information
 * @const
 * @type { RegExp }
 */
const wordRegex = /2:(\d+),(?:1:(\d+)|(NULL)),("[A-Z;/a' -]+"),(".+"),(.+)\r\n/gm;
/**
 * Regex to find vocalized words with i vowels without supporting y
 * @const
 * @type { RegExp }
 */
const noYRegex = /.*(([^;]+[i]+[^;]+)|([^;]+[i]+[;]+[aoeiu]+)).*/;
/**
 * Regex to find vocalized words with u vowels without supporting w
 * @const
 * @type { RegExp }
 */
const noWRegex = /.*(([^O]+[u]+[^O]+)|([^O]+[u]+[O]+[aoeiu]+)).*/;
/**
 * Remove id from word file as id will be given by the position in the array.
 * Word file has 432 gaps with largest ones being 45 (see sedrajs unit tests).
 * @const
 * @param { string } content Input word records
 * @returns { object } hash of parsed word records and no Y/W words
 */
const parseWords = content => {
  let pid = 0;
  const parse = Object.create(null, {
    words: { value: '', enumerable: true, writable: true },
    noY: { value: '', enumerable: true, writable: true },
    noW: { value: '', enumerable: true, writable: true }
  });
  parse.words = content.replace(
    wordRegex,
    (match, id, lexemeId, noLexemeId, word, vocalised, line) => {
      const cid = parseInt(id, 10);
      let sb = '';
      while (pid < cid) {
        sb += ',';
        ++pid;
      }
      if (noYRegex.test(vocalised)) {
        parse.noY += (parse.noY ? ',' : '') + cid;
      }
      if (noWRegex.test(vocalised)) {
        parse.noW += (parse.noW ? ',' : '') + cid;
      }
      return `${sb}w(${noLexemeId ? 'null' : lexemeId},${toCal(
        word.replace(' "', '"')
      )},${toCal(vocalised)},${line})`;
    }
  );
  parse.words = `Object.freeze([${parse.words}]);`;
  parse.noY = `Object.freeze([${parse.noY}]);`;
  parse.noW = `Object.freeze([${parse.noW}]);`;
  return parse;
};
/**
 * Build word JavaScript from word records
 * e.g. 2:31070,1:2055,"DMSBRNOTA","D'aMSaB'RoNuOT,oA",6915072,128
 * @static
 * @param { string } content Word text records
 * @returns { string } Word JavaScript records
 */
const getWords = content => parseWords(content);

/**
 * Regex to remove ids from english records and extract relevant information
 * only
 * @const
 * @type { RegExp }
 */
const englishRegex = /3:\d+,(?:1:(\d+)|(NULL))(,.+)\r\n/gm;
/**
 * Build english javascript from english records
 * e.g. 3:165,1:97,"cause","without","","",0,0
 * @static
 * @param { string } content English text content
 * @returns { string } English JavaScript content
 */
const getEnglish = content => {
  const lines = content.replace(
    englishRegex,
    (match, id, noId, line) => `,e(${noId ? 'null' : id}${line})`
  );
  return `Object.freeze([${lines}]);`;
};

/**
 * Regex to remove ids from etymology records and extract useful info only
 * @const
 * @type { RegExp }
 */
const etymologyRegex = /4:(\d+),(?:1:(\d+)|(NULL))(,.+)\r\n/gm;
/**
 * Remove id from etymology records as id will be given by the array position.
 * Etymology file has 3 gaps but difference is 1 only (see sedrajs unit tests).
 * @const
 * @param { string } content Input etymology text records
 * @returns { object } Parsed etymology content + reference
 */
const parseEtymology = content => {
  let pid = 0;
  return content.replace(
    etymologyRegex,
    (match, id, lexemeId, noLexemeId, line) => {
      let sb = `,t(${noLexemeId ? 'null' : lexemeId}${line.replace(
        /\\/g,
        '\\\\'
      )})`;
      const cid = parseInt(id, 10);
      if (pid + 1 !== cid) {
        sb = `,${sb}`;
      }
      pid = cid;
      return sb;
    }
  );
};
/**
 * Build etymology JavaScript from etymology records e.g. 4:10,1:75,"eu\310",5
 * @static
 * @param { string } content Etymology text file records
 * @returns { object } Etymology JavaScript records + reference
 */
const getEtymology = content => `Object.freeze([${parseEtymology(content)}]);`;

/**
 * Regex to remove ids from Ubs records and extract parsed information
 * book - Left 2 digits represent the book (52=Matt, 53=Mark, 54=Luke, etc.)
 * chapter - Next 2 digits = chapter
 * verse - Next 3 digits = verse
 * index - Next 2 digits = word
 * wordId - the two most significant bits are always 02 which represents the
 *    database file number
 * @const
 * @type { RegExp }
 */
const ubsRegex = /^0:-?\d+,(\d{2})(\d{2})(\d{3})(\d{2}),(\d+),.+$/;
/**
 * Build parsed Usb object from the ubsRegex match
 * @const
 * @param { Object } match regex match result
 * @returns { Object } object created from match result
 */
const buildUbs = match =>
  Object.freeze(
    Object.create(null, {
      book: { value: parseInt(match[1], 10), enumerable: true },
      chapter: { value: parseInt(match[2], 10), enumerable: true },
      verse: { value: parseInt(match[3], 10), enumerable: true },
      index: { value: parseInt(match[4], 10), enumerable: true },
      wordId: { value: parseInt(match[5], 10) & 0x00ffffff, enumerable: true }
    })
  );
/**
 * Remove id from Ubs records as it is not being used and it
 * is also messed up - it overflows and becomes negative a number of times.
 * To get verse only index -> reference, filter out entries with verse as 0.
 * @const
 * @param { string } content Input Ubs text records
 * @returns { Object } Parsed JavaScript Ubs/reference records
 */
const parseUbs = content => {
  const reference = [];
  const map = Object.create(null, {
    books: { value: 0, enumerable: true, writable: true },
    chapters: { value: 0, enumerable: true, writable: true },
    verses: { value: 0, enumerable: true, writable: true },
    words: { value: 0, enumerable: true, writable: true }
  });
  const lines = content.split(/\r\n/);
  for (let i = 0, len = lines.length - 1; i < len; i++) {
    const parse = buildUbs(ubsRegex.exec(lines[i]));
    let book = map[parse.book];
    if (!book) {
      book = Object.create(null, {
        chapters: { value: 0, enumerable: true, writable: true },
        verses: { value: 0, enumerable: true, writable: true },
        words: { value: 0, enumerable: true, writable: true },
        rollupBooks: { value: map.books, enumerable: true, writable: true },
        rollupChapters: {
          value: map.chapters,
          enumerable: true,
          writable: true
        },
        rollupVerses: { value: map.verses, enumerable: true, writable: true },
        rollupWords: { value: map.words, enumerable: true, writable: true }
      });
      map[parse.book] = book;
      map.books += 1;
    }
    let chapter = book[parse.chapter];
    if (!chapter) {
      chapter = Object.create(null, {
        verses: { value: 0, enumerable: true, writable: true },
        words: { value: 0, enumerable: true, writable: true },
        rollupChapters: {
          value: map.chapters,
          enumerable: true,
          writable: true
        },
        rollupVerses: { value: map.verses, enumerable: true, writable: true },
        rollupWords: { value: map.words, enumerable: true, writable: true }
      });
      book[parse.chapter] = chapter;
      book.chapters += 1;
      map.chapters += 1;

      reference.push([parse.book, parse.chapter, 0]);
    }
    let verse = chapter[parse.verse];
    if (!verse) {
      verse = [];
      chapter[parse.verse] = verse;
      chapter.verses += 1;
      book.verses += 1;
      map.verses += 1;
      reference.push([parse.book, parse.chapter, parse.verse]);
    }

    map.words += 1;
    book.words += 1;
    chapter.words += 1;
    verse[parse.index - 1] = parse.wordId;
  }

  return Object.freeze(
    Object.create(null, {
      ubs: {
        value: `${JSON.stringify(map).replace(/"/g, '')};`,
        enumerable: true
      },
      reference: {
        value: `${JSON.stringify(reference).replace(/"/g, '')};`,
        enumerable: true
      }
    })
  );
};
/**
 * Build Ubs JavaScript from ubs records e.g. 0:8,520100108,33554599,36 and
 * index to reference map. To get verse only index -> reference, filter out
 * entries where verse is 0.
 * @static
 * @param { string } content Ubs text database records
 * @returns { object }  { ubs, reference } JavaScript
 */
const getUbs = content => parseUbs(content);

export { getRoots, getLexemes, getWords, getEnglish, getEtymology, getUbs };
