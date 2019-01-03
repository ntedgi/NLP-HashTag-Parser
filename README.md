
## Hashtags Parser [![Coverage Status](https://coveralls.io/repos/github/Naor-Tedgi/hashtags-parser/badge.svg?branch=master)](https://coveralls.io/github/Naor-Tedgi/hashtags-parser?branch=master) [![Build Status](https://travis-ci.org/Naor-Tedgi/hashtags-parser.svg?branch=master)](https://travis-ci.org/Naor-Tedgi/hashtags-parser)


[ cli example - test it yourself](http://ec2-34-209-9-65.us-west-2.compute.amazonaws.com:3001/)





```sh
let hashtagsParser = require('hashtags-parser');
```



###  this is the interesting part - 🚀🚀🚀
```sh
hashtagsParser("#freetibet")  // = > ["Free", "Tibet"]
hashtagsParser("#FREETIBET")  // = > ["Free", "Tibet"]
hashtagsParser("#freetibetorg")  // = > ["Free", "Tibet"]
```

### this is the easy part 
```sh
hashtagsParser("#FreeTibet") // = > ["Free", "Tibet"]
hashtagsParser("#3Tibet")  // = > ["Free", "Tibet"]
hashtagsParser("#free_tibet")  // = > ["Free", "Tibet"]
hashtagsParser("#FREE_TIBET") // =>  ["Free", "Tibet"]
hashtagsParser("#freeTIBET") // =>  ["Free", "Tibet"]
hashtagsParser("#FreeTIBET") // =>  ["Free", "Tibet"]
hashtagsParser("#freeTibet") // =>  ["Free", "Tibet"]


```
