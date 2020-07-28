const supertest = require('supertest')
const test = require('tape')
const router = require('../server/router')

// TODO: add more tests for other handlers and handle edge cases for the 
// autocomplete handler
test('Test if the fetch-suggestions route works properly', (t) => {
    supertest(router)
        .post('/fetch-suggestions')
        .send({ searchQuery: 'ma' })
        .expect(200)
        .expect("Content-Type", 'application/json')
        .end((err, res) => {
            t.error(err)

            const parsedResponse = JSON.parse(res.text)

            t.notEqual(parsedResponse.indexOf('mario'), -1, 'mario is in the suggestions array')
            t.end()
        })
})