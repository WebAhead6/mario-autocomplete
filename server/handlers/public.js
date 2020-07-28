const fs = require("fs");
const path = require("path");
const handle404 = require('./404')

const types = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "image/jpeg",
    ico: "image/x-icon",
};

module.exports = (req, res) => {
    const url = req.url;
    const urlArray = url.split(".");
    const extension = urlArray[1];
    const type = types[extension];

    const filePath = path.join(__dirname, "../..", url);
    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error);
            res.writeHead(404, { "content-type": "text/html" });
            res.end("<h1>Not found</h1>");
        } else {
            res.writeHead(200, { "content-type": type });
            res.end(file);
        }
    });
}