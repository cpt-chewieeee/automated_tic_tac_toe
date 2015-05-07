angular.module( 'homepage', []).controller( 'HomepageController', function( $scope, TFactory)
{

    $scope.$on( '$viewContentLoaded', function()
    {
        $scope.runSimulation = function()
        {
            TFactory();
        };
    });

});
