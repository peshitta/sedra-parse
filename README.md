# sedra-parse

[![npm version](https://badge.fury.io/js/sedra-parse.svg)](https://badge.fury.io/js/sedra-parse)
[![npm module downloads](http://img.shields.io/npm/dt/sedra-parse.svg)](https://www.npmjs.org/package/sedra-parse)
[![Build Status](https://travis-ci.org/peshitta/sedra-parse.svg?branch=master)](https://travis-ci.org/peshitta/sedra-parse)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/peshitta/sedra-parse/blob/master/LICENSE)
[![Dependency Status](https://david-dm.org/peshitta/sedra-parse.svg)](https://david-dm.org/peshitta/sedra-parse)
[![devDependencies Status](https://david-dm.org/peshitta/sedra-parse/dev-status.svg)](https://david-dm.org/peshitta/sedra-parse?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/peshitta/sedra-parse/badge.svg?branch=master)](https://coveralls.io/github/peshitta/sedra-parse?branch=master)

Parse Sedra 3 text database records and return their JavaScript representation

## Installation

In order to use this library, [Node.js](https://nodejs.org) should be installed. 
Then run:
```
npm install sedra-parse --save
```

Following bundles are available:
* `sedra-parse.js` - UMD ES5 version for use in browser, node, etc.
* `sedra-parse.min.js` - minified version of `sedra-parse.js`
* `sedra-parse.esm.js` - ES6 module version, suitable for bundling with other 
libraries and applications

The package could also be downloaded directly from:
[https://registry.npmjs.org/sedra-parse/-/sedra-parse-1.0.3.tgz](https://registry.npmjs.org/sedra-parse/-/sedra-parse-1.0.3.tgz)

## More information

[Peshitta App](https://peshitta.github.io)

[Beth Mardutho](https://sedra.bethmardutho.org/about/fonts)

[CAL](http://cal1.cn.huc.edu/searching/fullbrowser.html)

## License

[MIT](https://github.com/peshitta/sedra-parse/blob/master/LICENSE)

## Contributing

The final goal for this work is to learn the Word of God as recorded by
[Peshitta](https://en.wikipedia.org/wiki/Peshitta).
You are welcomed to improve this implementation or provide feedback. Please
feel free to [Fork](https://help.github.com/articles/fork-a-repo/), create a
[Pull Request](https://help.github.com/articles/about-pull-requests/) or
submit [Issues](https://github.com/peshitta/sedra-parse/issues).
Thank you!

## Development

```
npm install
```
```
npm run build
```

## API Reference

* [sedraParse](#module_sedraParse)
    * _static_
        * [.getRoots(content)](#module_sedraParse.getRoots) ⇒ <code>string</code>
        * [.getLexemes(content)](#module_sedraParse.getLexemes) ⇒ <code>string</code>
        * [.getWords(content)](#module_sedraParse.getWords) ⇒ <code>string</code>
        * [.getEnglish(content)](#module_sedraParse.getEnglish) ⇒ <code>string</code>
        * [.getEtymology(content)](#module_sedraParse.getEtymology) ⇒ <code>string</code>
        * [.getUbs(content)](#module_sedraParse.getUbs) ⇒ <code>string</code>
    * _inner_
        * [~rootRegex](#module_sedraParse..rootRegex) : <code>RegExp</code>
        * [~lexemeRegex](#module_sedraParse..lexemeRegex) : <code>RegExp</code>
        * [~wordRegex](#module_sedraParse..wordRegex) : <code>RegExp</code>
        * [~parseWords](#module_sedraParse..parseWords) ⇒ <code>string</code>
        * [~englishRegex](#module_sedraParse..englishRegex) : <code>RegExp</code>
        * [~etymologyRegex](#module_sedraParse..etymologyRegex) : <code>RegExp</code>
        * [~parseEtymology](#module_sedraParse..parseEtymology) ⇒ <code>string</code>
        * [~ubsRegex](#module_sedraParse..ubsRegex) : <code>RegExp</code>
        * [~buildUbs](#module_sedraParse..buildUbs) ⇒ <code>Object</code>
        * [~parseUbs](#module_sedraParse..parseUbs) ⇒ <code>Object</code>

<a name="module_sedraParse.getRoots"></a>

### sedraParse.getRoots(content) ⇒ <code>string</code>
Build roots javascript from root records e.g. 0:2,"AB","ab           |A",0

**Kind**: static method of [<code>sedraParse</code>](#module_sedraParse)  
**Returns**: <code>string</code> - JavaScript root representation  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Sedra root records |

<a name="module_sedraParse.getLexemes"></a>

### sedraParse.getLexemes(content) ⇒ <code>string</code>
Build lexemes javascript from lexeme records e.g. 1:2,0:2,"ABA",41960448,16

**Kind**: static method of [<code>sedraParse</code>](#module_sedraParse)  
**Returns**: <code>string</code> - Lexeme javascript records  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Lexeme text records |

<a name="module_sedraParse.getWords"></a>

### sedraParse.getWords(content) ⇒ <code>string</code>
Build word JavaScript from word records
e.g. 2:31070,1:2055,"DMSBRNOTA","D'aMSaB'RoNuOT,oA",6915072,128

**Kind**: static method of [<code>sedraParse</code>](#module_sedraParse)  
**Returns**: <code>string</code> - Word JavaScript records  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Word text records |

<a name="module_sedraParse.getEnglish"></a>

### sedraParse.getEnglish(content) ⇒ <code>string</code>
Build english javascript from english records
e.g. 3:165,1:97,"cause","without","","",0,0

**Kind**: static method of [<code>sedraParse</code>](#module_sedraParse)  
**Returns**: <code>string</code> - English JavaScript content  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | English text content |

<a name="module_sedraParse.getEtymology"></a>

### sedraParse.getEtymology(content) ⇒ <code>string</code>
Build etymology JavaScript from etymology records e.g. 4:10,1:75,"eu\310",5

**Kind**: static method of [<code>sedraParse</code>](#module_sedraParse)  
**Returns**: <code>string</code> - Etymology JavaScript records  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Etymology text file records |

<a name="module_sedraParse.getUbs"></a>

### sedraParse.getUbs(content) ⇒ <code>string</code>
Build Ubs JavaScript from ubs records e.g. 0:8,520100108,33554599,36

**Kind**: static method of [<code>sedraParse</code>](#module_sedraParse)  
**Returns**: <code>string</code> - Ubs JavaScript  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Ubs text database records |

<a name="module_sedraParse..rootRegex"></a>

### sedraParse~rootRegex : <code>RegExp</code>
Regex to remove ids from root rows and extract relevant information

**Kind**: inner constant of [<code>sedraParse</code>](#module_sedraParse)  
<a name="module_sedraParse..lexemeRegex"></a>

### sedraParse~lexemeRegex : <code>RegExp</code>
Regex to remove ids from lexeme records and extract relevant information

**Kind**: inner constant of [<code>sedraParse</code>](#module_sedraParse)  
<a name="module_sedraParse..wordRegex"></a>

### sedraParse~wordRegex : <code>RegExp</code>
Regex to remove ids from word records and extract wanted information

**Kind**: inner constant of [<code>sedraParse</code>](#module_sedraParse)  
<a name="module_sedraParse..parseWords"></a>

### sedraParse~parseWords ⇒ <code>string</code>
Remove id from word file as id will be given by the position in the array.
Word file has 432 gaps with largest ones being 45 (see sedrajs unit tests).

**Kind**: inner constant of [<code>sedraParse</code>](#module_sedraParse)  
**Returns**: <code>string</code> - Parsed word records  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Input word records |

<a name="module_sedraParse..englishRegex"></a>

### sedraParse~englishRegex : <code>RegExp</code>
Regex to remove ids from english records and extract relevant information
only

**Kind**: inner constant of [<code>sedraParse</code>](#module_sedraParse)  
<a name="module_sedraParse..etymologyRegex"></a>

### sedraParse~etymologyRegex : <code>RegExp</code>
Regex to remove ids from etymology records and extract useful info only

**Kind**: inner constant of [<code>sedraParse</code>](#module_sedraParse)  
<a name="module_sedraParse..parseEtymology"></a>

### sedraParse~parseEtymology ⇒ <code>string</code>
Remove id from etymology records as id will be given by the array position.
Etymology file has 3 gaps but difference is 1 only (see sedrajs unit tests).

**Kind**: inner constant of [<code>sedraParse</code>](#module_sedraParse)  
**Returns**: <code>string</code> - Parsed etymology content  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Input etymology text records |

<a name="module_sedraParse..ubsRegex"></a>

### sedraParse~ubsRegex : <code>RegExp</code>
Regex to remove ids from Ubs records and extract parsed information
book - Left 2 digits represent the book (52=Matt, 53=Mark, 54=Luke, etc.)
chapter - Next 2 digits = chapter
verse - Next 3 digits = verse
index - Next 2 digits = word
wordId - the two most significant bits are always 02 which represents the
   database file number

**Kind**: inner constant of [<code>sedraParse</code>](#module_sedraParse)  
<a name="module_sedraParse..buildUbs"></a>

### sedraParse~buildUbs ⇒ <code>Object</code>
Build parsed Usb object from the ubsRegex match

**Kind**: inner constant of [<code>sedraParse</code>](#module_sedraParse)  
**Returns**: <code>Object</code> - object created from match result  

| Param | Type | Description |
| --- | --- | --- |
| match | <code>Object</code> | regex match result |

<a name="module_sedraParse..parseUbs"></a>

### sedraParse~parseUbs ⇒ <code>Object</code>
Remove id from Ubs records as it is not being used and it
is also messed up - it overflows and becomes negative a number of times.

**Kind**: inner constant of [<code>sedraParse</code>](#module_sedraParse)  
**Returns**: <code>Object</code> - Parsed JavaScript Ubs records  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Input Ubs text records |

