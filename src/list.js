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
		//console.log(data);
		var index = 0;
		var i;
		var arrayKey = [];
		/*	var main = document.querySelector('main');
			var table = document.querySelector('table'); */
		var thead = document.querySelector('thead');
		var tbody = document.querySelector('tbody');
		var tr;
		var arrayTrTbody = [];
		var th = [];
		var td = [];
		arrayKey = Object.keys(data[0]);

		//--form HTML document--
		tr = document.createElement('tr');
		for (index; index < arrayKey.length - 1; index++) {
			th[index] = `<th class="${arrayKey[index]}">${arrayKey[index]}</th>`;
		}
		thead.innerHTML = `<tr>${th.join('')}</tr>`;
		index = 0;
		for (index; index < data.length; index++) {
			tr = document.createElement('tr');
			i = 0;
			for (i; i < arrayKey.length - 1; i++) {
				td[i] = `<td>${data[index][arrayKey[i]]}</td>`;
			}
			arrayTrTbody[index] = `<tr>${td.join('')}<td><a href="http://localhost:3000/pages/edit-page.html?${data[index]._id}" class="edit_button" role="button">edit</a></td><td><button id="${data[index]._id}" class="delete_button"  type="submit">delete</button></td></tr>`;
			//arrayTrTbody[index] = `<tr>${td.join('')}<td><input id="${data[index]._id}" class="edit_buttom" type="submit" value="edit" /></td><td><input id="${data[index]._id}" class="delete_buttom"  type="submit" value="delete" /></td></tr>`;
			//console.log(arrayTrTbody);
			tr.innerHTML = arrayTrTbody[index];
			tbody.appendChild(tr);
		}
		return;
	}


	function setupEventListeners(data) {
		var tbody = document.querySelector('tbody');
		var buttonDelete = document.querySelector('.delete_button');
		var buttonEdit = document.querySelector('.edit_button');
		var arrayKey = [];
		arrayKey = Object.keys(data[0]);
		//buttomDelete[0] = document.getElementById(data[0][arrayKey[0]]);
		//buttomDelete[0] = document.querySelector(data[0][arrayKey[0]]);
		console.log('tbody', tbody);
		console.log('buttonEdit', buttonEdit);
		console.log('buttonDelete', buttonDelete);


		tbody.addEventListener('click', function (event) {
			event.preventDefault();
			var targetEl = event.target;
			var classTargetEl = $(targetEl).attr('class');
			console.log('classTargetEl', classTargetEl);
			if (classTargetEl === 'delete_button') {
			var idTargetEl;
			idTargetEl = $(targetEl).attr('id');
			console.log('targetEl', targetEl);
			console.log('delete');
			console.log('id', idTargetEl);
			var myHeaders = new Headers(); // создаём объект заголовков
			myHeaders.append("Content-Type", "application/json");// добавляем заголовок Content-Type
			// чтоб сказать серверу в каком формате данные передаём
			var myInit = {
				method: 'DELETE', // указываем метод запроса
				headers: myHeaders,  // добавляем заголовки
				mode: 'cors',   // ставим режим кросс доменных запросов
				cache: 'default', // кеширование по умолчанию
			}
			var myRequest = new Request(`http://193.111.63.76:3000/api/v1/Users/${idTargetEl}`, myInit); // создаём запрос
			fetch(myRequest) //говорим запросу выполнится
				.then(function (response) {
					console.log(response);
					if (response.status >= 200 && response.status < 300) {
						//window.location = '/pages/list-page.html';
						return response.json();
					}
					else {

						return Promise.reject();
					}
				}) // парсим ответ от сервера в json
				.then(function (json) {
					// alert(JSON.stringify(json)); }); // здесь ответ json от сервера
					window.location = '/pages/list-page.html';
				})
				.catch(function (err) {
			console.log('Fetch Error :-S', err);
		});
			}
		/*	if (classTargetEl === 'edit_button') {
				console.log('idTargetEl', idTargetEl);
			window.location = `/pages/edit-page.html?${idTargetEl}`;	

			}*/
		});
	}
}

