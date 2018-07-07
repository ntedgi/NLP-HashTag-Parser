module.exports = (queryTerm) => {
  let Twitter = require("twitter");
  let fs = require("fs");
  let creds = JSON.parse(fs.readFileSync("creds.json"));
  i = Math.random() > 0.5 ? 1 : 0;
  let credsSofix = i % 2 == 1 ? "_1" : "_2";

  let twitter_client = new Twitter({
    consumer_key: creds["consumer_key" + credsSofix],
    consumer_secret: creds["consumer_secret" + credsSofix],
    access_token_key: creds["access_token_key" + credsSofix],
    access_token_secret: creds["access_token_secret" + credsSofix]
  });




  const buildStringFromSet = (set, query, index, res) => {
    if (index == query.length) return res;
    if (index > query.length) return [];
    let ch = query.charAt(index);
    let current = Array.from(set).map(x => x.toLowerCase()).filter((x) => x.charAt(0) === ch)
    let ans;
    for (let i = 0; i < current.length; i++) {
        ans = buildStringFromSet(set, query, index + current[i].length, res.concat([current[i]]), i);
        if (arrayConcatIsTheString(ans, query)) return ans;
    }
    return []
}


const arrayConcatIsTheString = (res, str) => {
    return (res === undefined) ? false : res.join("") === str
}

  
  const splitByAns = (res) => {
    let result = [];
    let dict = new Set();
    res = res.filter(e => e.length > 0)
    res.forEach((phrase) => {
      const split = phrase.replace(/([a-z](?=[A-Z]))/g, '$1 ').split(" ")
      split.forEach(e => dict.add(e))
    })
    return buildStringFromSet(dict, queryTerm.replace("#", "").toLowerCase(), 0, []);
  }

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
    let res = [];
    keys.forEach(element => {
      let e = element.toLowerCase();
      if (e.includes(qt) || qt.includes(e)) {
        res.push(element);
      }
    });
    return splitByAns(res)
  };

  const run = () => {
    return new Promise((resolve, reject) => {
      twitter_client.get(
        "search/tweets", {
          q: queryTerm
        },
        (error, tweets, response) => {
          if (error) {
            reject(error);
            console.log(error);
          } else {
            let results = tweets["statuses"];
            let texts = results.map(x => x.text);
            console.log(`${texts.length} qureys returns on term : ${queryTerm}`);
            resolve(countWords(texts));
          }
        }
      );
    });
  }

  return run().then(result => {
    return result
  }).catch(err => console.log(err));
}