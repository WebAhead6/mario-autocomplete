test("test if autocomplete feature works properly", (t) => {

	// this fakes the fetch request, the steps to read this are the following
	// 1. remember that fetch is a function so we start off with an arrow function
	// 2. to initiate the .then function in the fetch we do Promise.resolve (which
	// instantly runs the .then)
	// 3. once the first .then runs remember we get the response as an object
	// 4. in the object there is a key called json (response.json) which we call as a function
	// to parse our json data (response.json())
	// 4. so we add the key json which equals to an arrow function that returns
	// a promise
	// 5. then we have a second .then which we need run with Promise.resolve
	// 6. we pass that last Promise.resolve the fake suggestions
	fetch = () =>
		Promise.resolve({
			json: () => Promise.resolve(["mario"]),
		});

	autocomplete.value = "m";
	autocomplete.dispatchEvent(new KeyboardEvent("keyup", {
		key: "m"
	}));

	// try and comment out the the setTimeout see what happens to the test in the browser's console
	// weird right ? it failed, well that's because the t.equal ran before the dispatchEvent could finish
	// meanning it tried to see the children in alternativeList (alternativeList.firstChild.textContent)
	// before they were even built
	// so setTimeout 0 makes sure that the t.equal is the last piece of the code to run
	setTimeout(() => {

		t.equal(
			alternativeList.firstChild.textContent,
			"mario",
			"Make sure that the first suggestion is mario"
		)

		// once our test is done reset the fetch variable to the original fetch
		fetch = window.fetch;
		// and reset everything
		autocomplete.value = "";
		resetWebsite();

	}, 0)

});