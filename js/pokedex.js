var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'https://pokeapi.co/api/v2/');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.factory('chosenPokemon', function($resource, $log, $rootScope){
    var pokemon = {};
    var description = {};

    function retreive(url){
        var ApiData = $resource(url);
        ApiData.get().$promise.then(function(result){
            pokemon = result;
            var ApiDescription = $resource(result.species.url);
            ApiDescription.get().$promise.then(function(result){
                var description = result.flavor_text_entries.find(function(m){
                        return m.language.name === "en";
                });
                pokemon.description = description.flavor_text;
            });
        });
    }

    function getPokemon(){
        return pokemon;
    }

    return {retreive: retreive, getPokemon: getPokemon}
});

pokeApp.controller('pokeList', function($scope, $resource, POKEAPI, chosenPokemon) {
    var ApiData = $resource(POKEAPI + "pokemon/?limit=151");
    ApiData.get().$promise.then(function(results){
        $scope.pokemons = results.results;
    });
    $scope.iChooseYou = function(choice) {
        chosenPokemon.retreive(choice)
    };
});

pokeApp.controller('pokeChoice', function($scope, chosenPokemon) {
    $scope.$watch(function(){
            return chosenPokemon.getPokemon()
        }
        ,function (newVal){
            $scope.pokemon = newVal;
        });
});

pokeApp.directive('pokedex', function() {
    return {
        templateUrl: 'pokedex.html'
    };
});

pokeApp.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});