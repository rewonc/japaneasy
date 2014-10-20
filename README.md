#Japaneasy

[![Build Status](https://travis-ci.org/rewonc/japaneasy.svg?branch=master)](https://travis-ci.org/rewonc/japaneasy)

This package wraps the API of the online Japanese dictionary WWWJDIC (http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1C). It includes:
- Dictionary search in Japanese and English 
- Kanji lookup
- Text glossing in Japanese (take a chunk of text and list all the words it contains)
- Specialized dictionary search (including names, legal, scientific, engineering, linguistics, and more)
- Alternate language dictionaries (Japanese-German, Japanese-French, Japanese-Russian, Japanese-Sweden, Japanese-Hungarian, Japanese-Spanish, Japanese-Dutch, Japanese-Slovenian, Japanese-Italian)

It also includes automatic switching between WWWJDIC mirrors in the case that the primary one is down. 

##Installation

`npm install japaneasy`

##Usage

#####Request

```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary();

dict('辞書').then(function(result){
  console.log(result);
});

```

#####Response
```javascript
[ 
  { 
    japanese: '辞書',                     //the japanese entry for the word
    pos: 'n',                            //the part of speech identifier
    pronunciation: 'じしょ',              //pronunciation (for words with kanji)
    english:                             //an array of english translations (usually more than 1)
      [ 
        'dictionary/lexicon',
        '(arch) (See 辞表) letter of resignation' 
      ]
  }
]

```

##Examples

#####Japanese text glossing

```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary({
  dictionary: "glossing"
});

dict('飛べねぇ豚はただのブタだ').then(function(result){
  console.log(result);
});

/****** Response:
[ 
  { 
    japanese: '飛ぶ',
    pronunciation: 'とぶ',
    english: 
     [ '(esp. 飛ぶ) to fly; to soar;',
       '(esp. 跳ぶ) to jump; to leap; to spring; to bound; to hop; (P); ED ' ] 
  },
  { 
    japanese: '豚',
    pronunciation: 'ぶた(P); ブタ',
    english: 
     [ 'pig (Sus scrofa domesticus);',
       '(derog) fat person; (P);  【とん】 ; (n-pref,n) pig; pork' ] 
  },
  { 
    japanese: 'ブタ',
    pronunciation: 'ぶた(P); ブタ',
    english: [ 'pig (Sus scrofa domesticus);', '(derog) fat person; (P)' ]
  } 
]
*/

```

#####Specialized dictionary search

```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary({
  dictionary: "life-science",
  input: "english"              //important: Put in your input language for all of the specialized dictionaries
});

dict('chemolithotroph').then(function(result){
  console.log(result);
});

/****** Response:
[ 
  { 
    japanese: '化学合成無機栄養生物',
    pos: 'n',
    pronunciation: 'かがくごうせいむきえいようせいぶつ',
    english: 
      [ 'chemolithotroph' ] 
  },
  { 
    japanese: '無機栄養細菌',
    pos: 'n',
    pronunciation: 'むきえいようさいきん',
    english: [ 'chemolithotroph' ] 
  },
  { 
    japanese: '化学合成無機栄養グラム陰性細菌',
    pos: 'np',
    pronunciation: 'かがくごうせいむきえいようぐらむいんせいさいきん',
    english: [ 'Gram-negative chemolithotrophic bacteria' ] 
  }
]
*/

```

##Configuration options

All options are entered as one object and input as the first parameter of the initial constructor function.

```javascript

var Dictionary = require('japaneasy');
//this is the default configuration used when no object is passed to the constructor
var dict = new Dictionary({
  dictionary: "edict",
  language: null,
  method: "word",
  encode: "UTF-8",
  mirror: "usa",
  timeout: 500
});
```

#####"dictionary" option

Select which dictionary to search in. `edict` works for most common words, but there are a variety of specialized dictionaries available as well. The valid values for this field are:
```
"edict"
"enamdict"
"computing"
"life-science"
"legal"
"finance"
"buddhism"
"misc"
"glossing"
"sci-eng"
"linguistics"
"river-water"
"auto"
"jap-word-net"
"wip"
"german"
"french"
"russian"
"swedish"
"hungarian"
"spanish"
"dutch"
"slovenian"
"italian"
"untranslated"
"combined-jap-eng"
"expanded-glossing"
```
Note that you can get other language translations by selecting that dictionary here. More details of these dictionaries are available on the WWWJDIC site: http://www.edrdg.org/wwwjdic/wwwjdicinf.html#dicfil_tag

NOTE: Be sure to select an "input" language below if you select a language other than edict.

#####"input" option
Valid values are `"japanese"`, `"english"`, or `null` / `undefined`.  This refers to the language of the text you are querying.
If you leave it undefined, Japaneasy will default to a "common word" search, which searches both Japanese and English keys and only queries the most common words in EDICT. This often shows the most pertinent words for a search. 

######NOTE! If you're looking in a specialized dictionary or want to see the full results for a specific term, you should input either `"japanese"` or `"english"` here. 

#####"method" option
Valid values: `"kanji"`, `"word"`, or `"glossing"`. 
Word is the default setting and just does a word search, meaning you should only input items you think are words.
Kanji is for kanji lookup, if you input one kanji.
Glossing is for large passages of text. Note that choosing the glossing dictionary will automatically select this method, and using this method automatically selects the glossing dictionary.


#####"encode" option
This is your character encoding. Default value is `"UTF-8"`.  You can also select `"Shift-JIS"`, `"EUC"`, `"ISO-2022-JP"`, `"ASCII"`, or `"UCS"`. 


#####"mirror" option
Select the default mirror to which japaneasy sends requests. The default value is `"usa"`. Other values include:
`"sweden"`
`"japan"`
`"germany"`
`"canada"`
`"austrailia"`

#####"timeout" option
If a request to a certain has not resolved the promise object within the time specified here, japaneasy will query a different mirror.  WWWJDIC mirrors occasionally go down (at the time of this writing, the Austrailia mirror is down), but it's very infrequent that all five are down at the same time. 
Default value is `500` (milliseconds), which is long enough to not query multiple mirrors and short enough to not notice the delay if you switch over. If you're consistently seeing long load times, try changing the default mirror. 

#####"custom" option

You can also pass in a `custom` option followed by the a custom configuration code you've designed yourself. Example: `custom: "9ZIP"`.  See http://www.edrdg.org/wwwjdic/wwwjdicinf.html#backdoor_tag for details of how to craft this code. Note that this will override all other configuration options besides the mirror and timeout. 

#####Glossing no-repeat
If you select the glossing dictionary, you can pass in `noRepeat: true` to remove duplicate entries.




##Additional notes
For assistance in interpreting the part of speech code, see http://www.edrdg.org/wwwjdic/wwwjdicinf.html#code_tag
(That site is nice for understanding the API in general);

##Contributors
Any contributors are very welcome!  Just write in your tests in test/test.js.  Please send bug reports my way too.  Thanks! =)

