//this code fills the produts panel with elements
//together with the ng-repeat functionality.

//Controlador principal, é para ser usado para
//comportamentos gerais e para ir buscar a data.

angular.module("sportsStore")
    .controller("sportsStoreCtrl", function($scope, $http, $location, cart){
        $scope.data = {};

        $http({
            method: 'GET',
            url: 'http://localhost:8080/products'
        }).then(function successCallback(response) {
                $scope.data.products = response.data;
        }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.data.error = response
        });

        $scope.sendOrder = function(shippingDetails){
            
            //copies the scource so that working object is not afected.
            var order = angular.copy(shippingDetails);

            order.products = cart.getProducts();

            $http.post('http://localhost:8080/orders', order,{'Content-Type':'application/json'}).then(
                function (data){
                    $scope.data.orderId = Number(data.data);
                    cart.getProducts().length = 0;
                }, function(error){
                    $scope.data.orderError = error;
                }).finally(function(){
                    $location.path("/complete");
                });
        };
    }); 