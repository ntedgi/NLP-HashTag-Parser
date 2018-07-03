let Twitter = require("twitter");
let fs = require("fs");
let creds = JSON.parse(fs.readFileSync("creds.json"));
let queryTerm = "#FreePalastine";
i = Math.random() > 0.5 ? 1 : 0;
let credsSofix = i % 2 == 1 ? "_1" : "_2";

let twitter_client = new Twitter({
  consumer_key: creds["consumer_key" + credsSofix],
  consumer_secret: creds["consumer_secret" + credsSofix],
  access_token_key: creds["access_token_key" + credsSofix],
  access_token_secret: creds["access_token_secret" + credsSofix]
});

const filterTexts = (results, queryTerm) => {
  return results.filter(text =>
    text.toLowerCase().includes(queryTerm.toLowerCase())
  );
};

const countWords = texts => {
  let dict = {};
  texts.forEach(element => {
    element = element.split(" ");
    let arr = element.reduce((ac, cur) => {
      cur = cur.replace(/[^0-9a-z]/gi, "");
      if (ac[cur]) ac[cur] += 1;
      else ac[cur] = 1;
      return ac;
    }, dict);
  });
  let keys = Object.keys(dict);
  let qt = queryTerm.replace("#", "");
  qt = qt.toLowerCase();
  let res = {};
  keys.forEach(element => {
    let e = element.toLowerCase();
    if (e.includes(qt) || qt.includes(e)) {
      console.log(`${element}:${dict[element]}`);
    }
  });
};

twitter_client.get(
  "search/tweets",
  { q: queryTerm },
  (error, tweets, response) => {
    if (error) {
      console.log(error);
      closeConnection();
      cb();
    } else {
      let results = tweets["statuses"];
      let texts = results.map(x => x.text);
      console.log(`${texts.length} qureys returns on term : ${queryTerm}`);
      countWords(texts);
    }
  }
);
