"use strict";
export class ListPage {

}

export default function initPage() {
	//alert('list page')
		fetch('http://193.111.63.76:3000/api/v1/Users')
		.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}

			// Examine the text in the response  
			response.json().then(function (data) {
				drawTable(data);
				setupEventListeners(data);

			});
		}
		)
		.catch(function (err) {
			console.log('Fetch Error :-S', err);
		});

		function drawTable(data) {
			console.log(data);
		}

		function setupEventListeners() {
			var form = document.querySelector('#create-page');
			form.addEventListener('submit', function (event) {
        event.preventDefault();
		console.log('save');
			});


		}

}