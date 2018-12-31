//this filter is used to build the categories from the data.products array
//  keys[val] and the isUndefined function are the genious part of the code.
//if keys[val] is undefined it creates it, else jumps to the next element.
// it also uses a factory.

angular.module("customFilters",[])
.filter("unique", function(){
    return function(data, propertyName){
        if(angular.isArray(data) && angular.isString(propertyName) ){
            var results = [];
            var keys    = {};
            
            for(var i = 0; i < data.length; i++){
                var val = data[i][propertyName];

                if(angular.isUndefined(keys[val])){
                    keys[val] = true;
                    results.push(val);
                }
            }

            return results;

        }else{
            return data;
        }
    }
})
//returns a range of elements from an array, corresponding to ta page of products.
//Accepts arguments for the currently selected page and the page size.
.filter("range", function($filter){
    return function(data, page, size){
        if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
            //Génio!
            //Gives the starting element position when the user changes page.
            var start_index = (page - 1) * size;

            if(data.length < start_index){
                return [];
            }else{
                //splice: Cuts the array, make the array start
                //and the start_index position. LimitTo just
                //limits the return Array to 3.
                return $filter("limitTo")(data.splice(start_index),size);
            }
        }else{
                return data;
        }
        
    }
})
//dirty hack
//returns the number of pages the array with data is going to need to be displayed
.filter("pageCount", function(){
    return function(data, size){
        if(angular.isArray(data)){
            var result = [];

            for(var i = 0; i < Math.ceil(data.length / size); i++){
                result.push(i);
            }

            return result;
        }else{
            return data;
        }
    }
});

//142 perceber paginação wtf.