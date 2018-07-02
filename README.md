
# hashtags-parser

![alt text](https://github.com/Naor-Tedgi/hashtags-parser/blob/master/external/underconstruction.jpg)


usage:

```sh
let hashtagsParser = require('hashtags-parser');
hashtagsParser("#FreeTibet") // = > 'Free Tibet'
hashtagsParser("#3Tibet")  // = > ['Free Tibet','Tibet']
hashtagsParser("#FREETIBET")  // = > 'Free Tibet'
hashtagsParser("#freetibetorg")  // = > 'Free Tibet'
hashtagsParser("#free_tibet")  // = > 'Free Tibet'
hashtagsParser("#FREE_TIBET") // =>  'Free Tibet'`
```
