angular.module( 'appRoutes', []).config( [ '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider) 
{
    $routeProvider
    .when( '/', 
    {
	    templateUrl:    'home.html',
		controller:     'HomepageController',
    })
    .otherwise(
    {
        templateUrl:    'error.html',
        controller:     'ErrorController'
    });        
	
    $locationProvider.html5Mode( true);
}]);
