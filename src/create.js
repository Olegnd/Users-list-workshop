export class CreatePage {

}
export default function initPage() {
    //alert('create page')
    document.querySelector('#create-page').addEventListener('submit', function () {
        event.preventDefault();

        var id = document.querySelector('.id').value;
        var name = document.querySelector('.name').value;
        var password = document.querySelector('.password').value;
        var email = document.querySelector('.email').value;
        var comment = document.querySelector('.comment').value;
        var submit = document.querySelector('.submit').value;
        var payload = {
            id: id,
            name: name,
            password: password,
            email: email,
            comment: comment
        };

        var data = new FormData();
        data.append("json", JSON.stringify(payload));

        fetch("http://193.111.63.76:3000/api/v1/Users", {
            method: "POST",
            body: data
        }).then(function (res) { return res.json(); })
            .then(function (data) { alert(JSON.stringify(data)); })

    });

}