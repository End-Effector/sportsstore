angular.module("sportsStoreAdmin")
.controller("authCtrl", function ($scope, $http, $location) {

    $scope.authenticate = function(user,pass){

        var aux  = {
            username :user,
            password : pass
        }

        $http.post("http://localhost:8080/users/login",
        aux,
        {'Content-Type':'application/json'}).then(
            function (data){
                
                //Aqui aparece o resultado certo.


            }, function(error){

                //Aqui aparece o resultado errado.

        });
    }
});