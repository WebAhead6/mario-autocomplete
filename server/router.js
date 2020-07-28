const homeHandler = require('./handlers/home')
const publicHandler = require('./handlers/public')
const handle404 = require('./handlers/404')
const autocompleteHandler = require('./handlers/autocomplete')

function router(req, res) {
    const url = req.url
    const method = req.method

    if (url === '/') {
        homeHandler(req, res)

    } else if (url.indexOf('public') !== -1) {
        publicHandler(req, res)

    } else if (url === '/fetch-suggestions' && method === 'POST') {
        autocompleteHandler(req, res)

    } else {
        handle404(req, res)
    }

}

module.exports = router