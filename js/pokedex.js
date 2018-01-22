var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'https://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('pokeList', function($scope, $resource) {
    $scope.iChooseYou = function(choice) {
        console.log(choice);
    };

    var ApiData = $resource("https://pokeapi.co/api/v1/pokedex/1/");
    var pokedex = ApiData.get().$promise.then(function(results){
        $scope.pokemons = results.pokemon;
    });

});

pokeApp.controller('pokeChoice', function($scope) {
});