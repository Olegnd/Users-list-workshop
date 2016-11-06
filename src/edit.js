export class ListPage {

}

export default function initPage() {
	//alert('list page')
	fetch('http://193.111.63.76:3000/api/v1/Users')
		.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' + response.status);
				return;
			}

			// Examine the text in the response  
			response.json().then(function (data) {
				//console.log(data);
				var input = document.querySelector('input');
				//var id = document.querySelector('.id').value;
				//var name = document.querySelector('.name').value;
				//var password = document.querySelector('.password').value;
				//var email = document.querySelector('.email').value;
				//var comment = document.querySelector('.comment').value;
				//var button = document.querySelector('.button').value;
				//console.log(id, name, email, comment, button);
				var index = 0;
				var i;
				var arrayKey = [];
				var main = document.querySelector('main');
				var table = document.querySelector('table');
				var thead = document.querySelector('thead');
				var tbody = document.querySelector('tbody');
				var tr;
				var arrayTrTbody = [];
				var th = [];
				var td = [];
				arrayKey = Object.keys(data[0]);

				//--form HTML document--
				input = document.createElement('input');
				console.log(input);
				tr = document.createElement('tr');
				for (index; index < arrayKey.length - 1; index++) {
					th[index] = '<th class="' + arrayKey[index] + '">' + arrayKey[index] + '</th>';
				}
				thead.innerHTML = '<tr>' + th.join('') + '</tr>';

				index = 0;
				for (index; index < data.length; index++) {
					tr = document.createElement('tr');
					i = 0;
					for (i; i < arrayKey.length - 1; i++) {
						td[i] = '<td><input value="' + data[index][arrayKey[i]] +'" /></td>';
					}
					arrayTrTbody[index] = '<tr>' + td.join('') + 
					'<input class="button" type="submit" value="save" /><input class="button" type="submit" value="delete" /></tr>';
					tr.innerHTML = arrayTrTbody[index];
					tbody.appendChild(tr);
				}
			});
		}
		)
		.catch(function (err) {
			console.log('Fetch Error :-S', err);
		});

}