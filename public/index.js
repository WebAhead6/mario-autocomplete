const autocomplete = document.getElementById('autocomplete')
const suggestionsList = document.getElementById('suggestions-list')
const errorBox = document.getElementById('error-box')
const alternativeList = document.getElementById('alternative-list')

autocomplete.addEventListener('keyup', event => {
    const searchQuery = event.target.value

    resetWebsite()

    if (!searchQuery.trim()) {
        // if it's empty then stop the function
        return
    }

    fetch('/fetch-suggestions', {
        method: 'post',
        body: JSON.stringify({
            searchQuery: searchQuery
        })
    })
        .then((res) => res.json())
        .then(data => {
            // uncomment this to see the datalist
            // data.forEach(text => {
            //     const suggestion = document.createElement('option')
            //     suggestion.textContent = text
            //     suggestionsList.appendChild(suggestion)
            // });
        }).catch(error => {
            console.log(error)
            const errorMessage = document.createElement('h2')
            errorMessage.style.color = 'red'
            errorMessage.textContent = 'An error has occurred, please try again'

            errorBox.appendChild(errorMessage)
        })
})


function resetWebsite() {
    // reset the datalist
    while (suggestionsList.firstChild) {
        suggestionsList.removeChild(suggestionsList.firstChild)
    }

    // reset the error box
    while (errorBox.firstChild) {
        errorBox.removeChild(errorBox.firstChild)
    }

    // reset the alternative list
    while (alternativeList.firstChild) {
        alternativeList.removeChild(alternativeList.firstChild)
    }
}

function buildList(data) {
    data.forEach(text => {
        const suggestion = document.createElement('span')
        suggestion.textContent = text

        suggestion.style.cursor = 'pointer'

        // this is just an idea of someone wanted to add more functionality
        // to the suggestions list
        suggestion.addEventListener('click', () => {
            console.log(suggestion)
        })

        alternativeList.appendChild(suggestion)
    })
}