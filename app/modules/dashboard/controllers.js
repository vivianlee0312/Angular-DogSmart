var controllers = angular.module('Dashboard.controllers', [])

.controller('HeaderController', ['$scope', '$state', function($scope, $state){

	$scope.titleBasic = capitalizeFirstLetter($state.current.name.replace('dashboard.basic.' , '' ));
	$scope.titleFull = capitalizeFirstLetter($state.current.name.replace('dashboard.full.' , '' ));
	$scope.titleTwo = capitalizeFirstLetter($state.current.name.replace('dashboard.two.' , '' ));
	

	function capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
}])

.controller('NavController', ['$scope', 'UserService', function($scope, UserService){

	$scope.name = UserService.getUser().firstName + " " + UserService.getUser().lastName;

	$scope.toggleNav = function(){
		$("#wrapper").toggleClass("toggled");
        $(".navbar-toggle").toggleClass("collapsed");
	};

}]);   