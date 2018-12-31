//This controller is used to select the categories on the main
//screen.

angular.module("sportsStore")
    .constant("productListActiveClass","btn-primary")
    .constant("productListPageCount", 3)
    .controller("productListCtrl", function($scope, $filter, 
        productListActiveClass, productListPageCount, cart){

    var selectedCategory = null;
    
    //pagination
    //When you change category you always start on page 1, so
    // the $scope.selectedPage is defined as 1.
    $scope.selectedPage = 1;
    //Page size was defined as 3, because there are only 3 categories.
    $scope.pageSize     = productListPageCount;

    $scope.selectCategory = function(newCategory){
        selectedCategory  = newCategory;
        $scope.selectedPage = 1;
    }

    $scope.selectPage = function(newPage){
        $scope.selectedPage = newPage;
    }

    //Arguments names are all diferent because of the 
    //chaining of action on the ng-repeat directive.
    $scope.categoryFilterFn = function(product){
        return  selectedCategory == null || product.category == selectedCategory;
    }

    $scope.getCategoryClass = function(category){
        return selectedCategory == category ? productListActiveClass : "";
    }

    //This is only to apply the class to show the selectedPage nothing more.
    //WRONG: when this gets called from the second ng-repeat directive
    // gets and Array with values 0,1
    // [0,1] and then turns on the button for the one value.
    $scope.getPageClass = function(page){
        return $scope.selectedPage == page ? productListActiveClass : "";
    }

    $scope.addProductToCart = function(product){
        cart.addProduct(product.idProduct, product.name, product.price);
    }
});
