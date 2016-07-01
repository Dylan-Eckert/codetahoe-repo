function getUsers(success, error) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                success(this.responseText);
            } else {
                error(this.status);
            }
        }
    };

    req.open('GET', 'http://jsonplaceholder.typicode.com/users');
    req.send();
};
var User = function(user) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.phone = user.phone;
    this.website = user.website;
};
document.getElementById('btn-get-users').addEventListener('click', function() {
    function onSuccess(responseText) {
        console.log(responseText);
        var stringToObject = JSON.parse(responseText);
        var userData = [];
        for (var i = 0; i < this.stringToObject; i++) {
            userData.push(new User(users[i]));
        }
    }

    function onError(status) {
        console.log(status);
    };
    getUsers(onSuccess, onError);
});
