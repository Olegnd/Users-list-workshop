export class CreatePage {

}
export default function initPage() {
    //alert('create page')
    document.querySelector('#create-page').addEventListener('submit', function (event) {
        event.preventDefault();
    
    var input = document.querySelector('input');
    var id = document.querySelector('.id').value;
    var name = document.querySelector('.name').value;
    var password = document.querySelector('.password').value;
    var email = document.querySelector('.email').value;
    var comment = document.querySelector('.comment').value;
    var button = document.querySelector('.button').value;
    //console.log(id, name, email, comment, button);
    var myHeaders = new Headers(); // создаём объект заголовков
        myHeaders.append("Content-Type", "application/json");// добавляем заголовок Content-Type
       // чтоб сказать серверу в каком формате данные передаём
    var myInit = {
        method: 'POST', // указываем метод запроса
        headers: myHeaders,  // добавляем заголовки
        mode: 'cors',   // ставим режим кросс доменных запросов
        cache: 'default', // кеширование по умолчанию
        body: JSON.stringify({   /// добавляем данные к запросу
            id: id,
            name: name,
            password: password,
            email: email,
            comment: comment
        })
    };
//console.log(myInit);

    var myRequest = new Request('http://193.111.63.76:3000/api/v1/Users', myInit); // создаём запрос
    fetch(myRequest) //говорим запросу выполнится
       .then(function (response) { 
       console.log(response);
       if (response.status >= 200 && response.status < 300){
        return response.json();
        } 
        else {
            
            return Promise.reject();
        }
        }) // парсим ответ от сервера в json
       .then(function (json) { 
          // alert(JSON.stringify(json)); }); // здесь ответ json от сервера
          window.location = '/pages/list-page.html'
       }).catch(function() {
           alert('err');
       })
    });
}
