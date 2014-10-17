#Japaneasy

[![Build Status](https://travis-ci.org/rewonc/japaneasy.svg?branch=master)](https://travis-ci.org/rewonc/japaneasy)

This package wraps the APIs of the wonderful online Japanese dictionary WWWJDIC (http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1C). It includes:
- Common word search (takes both Japanese and English text as input and returns matches in the common word EDICT subset)
- Japanese word search (takes Japanese words as input and searches the whole EDICT)
- English word search (takes English words as input and searches the whole EDICT)
- Text glossing (takes chunks of Japanese text and returns probable matches
- Specialized dictionary search (Search the Names, legal, scientific, engineering, linguistics databases and more)
- Alternate language dictionaries (Japanese-German, Japanese-French, Japanese-Russian, Japanese-Sweden, Japanese-Hungarian, Japanese-Spanish, Japanese-Dutch, Japanese-Slovenian, Japanese-Italian)

It also includes automatic switching between WWWJDIC mirrors in the case that the primary one is down. 

##Installation

`npm install japaneasy`

##Usage

#####Common dictionary
```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary();

// search for hello, or 世界
dict('hello').then(function(result){
  console.log(result);
});

dict('世界').then(function(result){
  console.log(result);
});

```

#####Japanese EDICT search
```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary({
  dictionary: "Japanese"
});

dict('世界').then(function(result){
  console.log(result);
});

```

#####English EDICT search

```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary({
  dictionary: "English"
});

dict('hello').then( function(result){
  console.log(result);
});

```

#####Japanese text glossing

```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary({
  dictionary: "Glossing"
});

dict('飛べねぇ豚はただのブタだ').then(function(result){
  console.log(result);
});

```

#####Specialized dictionary search

```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary({
  dictionary: "Life Sciences"
});

dict('chemolithotroph').then(function(result){
  console.log(result);
});

```

##Default configuration options

```javascript
var Dictionary = require('japaneasy');
var dict = new Dictionary({
  dictionary: "Common",
  closest_mirror: "USA",  
  timeout: "200"    //refers to the amount of time japaneasy will wait for a promise to be fulfilled before querying the next mirror
});


```

##Custom configuration options

#####Dictionary

#####Mirrors

