const fs = require("fs");
const path = require("path");
const handle404 = require('./404')

module.exports = (req, res) => {
    const filePath = path.join(__dirname, "../..", "public", "index.html");

    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error);
            handle404(req, res)
            return
        }

        res.writeHead(200, { "content-type": "text/html" });
        res.end(file);
    });
}