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
var dict = new Dictionary({
  // - configuration options. Leave blank for default.
});

dict('hello').then(function(result){
  console.log(result);
});

dict('世界').then(function(result){
  console.log(result);
});

```

#####Response
```javascript
//"hello"
[
  {
    kanji:
    hiragana:
    etc:
    etc:
    etc:
  }, 

  . . .

  {
    kanji:
    hiragana:
    etc:
    etc:
    etc:
  }
]

//"世界"
[
  {
    kanji:
    hiragana:
    etc:
    etc:
    etc:
  }, 

  . . .

  {
    kanji:
    hiragana:
    etc:
    etc:
    etc:
  }
]


```


##Configuration options

#####"dictionary" option

#####"method" option

#####"encode" option

#####"custom" option

  
#####"mirror" option

#####"timeout" option


#### Default configuration
When you initialize japaneasy without any options, the following settings are used:

```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary({
  dictionary: "edict",
  default_mirror: "USA",  
  timeout: 200    
});

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

```

#####Specialized dictionary search

```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary({
  dictionary: "life-science"
});

dict('chemolithotroph').then(function(result){
  console.log(result);
});

```

