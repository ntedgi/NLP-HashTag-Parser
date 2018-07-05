const hashTagParser = require("./lib/search")
const p = async () => {
    let y = await hashTagParser("#freeGaza");
    console.log(y);
}
p()