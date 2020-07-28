const fs = require('fs')
const path = require('path')
const handle404 = require('./404')

module.exports = (req, res) => {
    let data = "";

    req.on("data", chunk => {
        data += chunk;
    });

    req.on("end", () => {

        const dataFilePath = path.join(__dirname, '..', 'data.txt')

        fs.readFile(dataFilePath, 'utf-8', (error, file) => {
            if (error) {
                console.log(error)
                handle404(req, res)
            }

            // check the data.txt file you would see that the names are seperated
            // by commas, and when i split here they become an array of names
            const names = file.split(',')
            const parsedData = JSON.parse(data).searchQuery.toLowerCase()

            const filtered = names.filter(name => name.includes(parsedData))

            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify(filtered));
        })

    });
}