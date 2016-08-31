var controllers = angular.module('User.controllers', [])

.controller('LoginController', ['$scope', '$state', 'UserService', function($scope, $state, UserService){

	$scope.loginHandler = function(){

		UserService.login($scope.username, $scope.password).then(function(){
			//login success
			$state.go('dashboard.basic.home');
		}, function(){
			//login failed
			$scope.errorMessage = "FAILED!!!!";
		});

		//go into app, $state.go('start')
		//handle login error
	};

}])

.controller('SignupController',  ['$scope', '$state', 'UserService', function($scope, $state, UserService){

	$scope.signupHandler = function(){
		UserService.signup($scope.firstName, $scope.lastName, $scope.username, $scope.password).then(function(){
			//login success
			$state.go('login');
		}, function(){
			//login failed
			alert("fail.");
		});
	}

}])

.controller('SubmitController',  ['$scope', '$state', 'UserService', function($scope, $state, UserService){

	$scope.submitHandler = function(){
		// UserService.signup($scope.firstName, $scope.lastName, $scope.username, $scope.password).then(function(){
		// 	//login success
		// 	$state.go('login');
		// }, function(){
		// 	//login failed
		// 	alert("fail.");
		// });
	}

}])

.controller('ProfileController', ['$scope', 'UserService', function($scope, UserService){
	$scope.testValue = 100;

	$scope.user = UserService.getUser();
	// $scope.contactNumbers = angular.copy(FormService.getContactNumbers())

	$scope.imageStrings = [];
  	$scope.processFiles = function(files){
    	angular.forEach(files, function(flowFile, i){
       		var fileReader = new FileReader();
         	fileReader.onload = function (event) {
            	var uri = event.target.result;
            	$scope.imageStrings[i] = uri;     
          	};
          fileReader.readAsDataURL(flowFile.file);
    	});
  	};

  	$scope.saveHandler = function () {
  		
        if ($scope.user.firstName ) {
          	$scope.user.push(this.user.firstName );
         	// $scope.text = '';
        } 

        FormService.success($scope.todos, $scope.timeMonths, $scope.timeDates, $scope.timeHours, $scope.timeMinutes, $scope.timeAmpms, $scope.dogNames, $scope.firstNames, $scope.lastNames, $scope.contactNumbers).then(function(){
        	$state.go('dashboard.full.success');
        }) 
	}


}]);
