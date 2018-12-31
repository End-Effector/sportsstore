//This is a service, that is used on components/cart/cartSummary.html
angular.module("cart",[]).factory("cart",function(){
    var cartData = [];
    //returns an object with three methods
    return {

        //Insert
        addProduct: function(id, name, price){

            var addedToExistingItem = false;
            //If the item is already on the cartData it just increments the count
            for(var i=0; i<cartData.length;i++){
                if(cartData[i].id == id){
                   cartData[i].count++;
                   addedToExistingItem = true;
                   break;
                }
            }
            //This always happens, this is the insert
            if(!addedToExistingItem){
                cartData.push(
                    {
                        count:  1,
                        id:     id,
                        price:  price,
                        name:   name
                    }
                );
            }
        },

        //Delete
        removeProduct:  function(id){
            for(var i=0; i< cartData.length; i++){
                if(cartData[i].id == id){
                    cartData.splice(i,1);
                    break;
                }
            }
        },

        //Search
        getProducts: function(){
            return cartData;
        }
    }
})
//Custom directive
.directive("cartSummary", function(cart){
    return {
        restrict:    "E",
        templateUrl: "components/cart/cartSummary.html", //This is the connection between the JS code and html
        controller:  function($scope){

            var cartData = cart.getProducts();

            //Calculates the cost of the cart
            $scope.total = function(){
                var total = 0;
                for(var i=0; i < cartData.length; i++){
                    total += (cartData[i].price * cartData[i].count);
                }
                
                return total;
            }
            
            //How many item are on the cart
            $scope.itemCount = function (){
                var total = 0;
                for(var i = 0; i<cartData.length; i++){
                    total += cartData[i].count;
                }
                return total;
            }
        }
    };
});