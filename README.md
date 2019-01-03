
## Hashtags Parser [![CircleCI](https://circleci.com/gh/Naor-Tedgi/hashtags-parser/tree/master.svg?style=svg)](https://circleci.com/gh/Naor-Tedgi/hashtags-parser/tree/master) [![Coverage Status](https://coveralls.io/repos/github/Naor-Tedgi/hashtags-parser/badge.svg?branch=master)](https://coveralls.io/github/Naor-Tedgi/hashtags-parser?branch=master)


![alt text](https://github.com/Naor-Tedgi/hashtags-parser/blob/master/external/underconstruction.jpg)


usage:

```sh
let hashtagsParser = require('hashtags-parser');

this is the real deal
hashtagsParser("#freetibet")  // = > ["Free", "Tibet"]

hashtagsParser("#FREETIBET")  // = > ["Free", "Tibet"]
hashtagsParser("#freetibetorg")  // = > ["Free", "Tibet"]

this is the easy part 
hashtagsParser("#FreeTibet") // = > ["Free", "Tibet"]
hashtagsParser("#3Tibet")  // = > ["Free", "Tibet"]
hashtagsParser("#free_tibet")  // = > ["Free", "Tibet"]
hashtagsParser("#FREE_TIBET") // =>  ["Free", "Tibet"]
hashtagsParser("#freeTIBET") // =>  ["Free", "Tibet"]
hashtagsParser("#FreeTIBET") // =>  ["Free", "Tibet"]
hashtagsParser("#freeTibet") // =>  ["Free", "Tibet"]


```
