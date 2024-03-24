const http = require("http");
const fs = require("fs");
var requests = require("requests");
const data = fs.readFileSync("home.html");
const homefile = data.toString();
const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%temp%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.main.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    return temperature;
}
const server = http.createServer((req, res) => {
    if (req.url = "/"){
        requests("https://api.openweathermap.org/data/2.5/weather?lat=13.0827&lon=80.2707&appid=a0eb0f5c9bfd5e704a8f8671bba0279c")
        .on("data", (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            const realTimedata = arrData.map((val) => replaceVal(homefile, val)).join("");
        })
        .on("end", (err) => {
            if (err) return console.log("error", err);
            console.log("end");
        });
    }
})
server.listen(8000, "127.0.0.1");
