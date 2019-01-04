# Under Construction



## Hashtags Parser [![Coverage Status](https://coveralls.io/repos/github/Naor-Tedgi/hashtags-parser/badge.svg?branch=master&service=github)](https://coveralls.io/github/Naor-Tedgi/hashtags-parser?branch=master&service=github) [![Build Status](https://travis-ci.org/Naor-Tedgi/hashtags-parser.svg?branch=master)](https://travis-ci.org/Naor-Tedgi/hashtags-parser)


[ cli example - test it yourself](http://ec2-34-209-9-65.us-west-2.compute.amazonaws.com:3001/)





```sh
let hashtagsParser = require('hashtags-parser');
```



###  this is the interesting part - 🚀🚀🚀
```sh
hashtagsParser("#freetibet")  // = > ["free", "tibet"]
hashtagsParser("#realdonaldtrump")  // = > ["real","donald","trump"]
hashtagsParser("#freetibetorg")  // = > ["free", "tibet"]
hashtagsParser("#photooftheday")  // = > ['photo','of','the','day']
hashtagsParser("#womenshistorymonth") // => ['womens','history','month']
hashtagsParser("#internationalwomensday") // => ['international','womens','day']
hashtagsParser("#happybirthday") // => ['happy','birthday']
```

### this is the easy part 
```sh
hashtagsParser("#FreeTibet") // = > ["free", "tibet"]
hashtagsParser("#3Tibet")  // = > ["free", "tibet"]
hashtagsParser("#free_tibet")  // = > ["free", "tibet"]
hashtagsParser("#FREE_TIBET") // =>  ["free", "tibet"]
hashtagsParser("#freeTIBET") // =>  ["free", "tibet"]
hashtagsParser("#FreeTIBET") // =>  ["free", "tibet"]
hashtagsParser("#freeTibet") // =>  ["free", "tibet"]


```
