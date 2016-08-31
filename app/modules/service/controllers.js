var controllers = angular.module('Service.controllers', [])
.controller('FormController', ['$scope', '$state', 'FormService', function($scope, $state, FormService){

  $scope.formObjects = angular.copy(FormService.getFormObjects()); 
  $scope.formStarts = angular.copy(FormService.getFormStarts());  

  $scope.submitHandler = function () {
  	if ($scope.form.items && $scope.form.firstnames && $scope.form.lastnames && $scope.form.dognames && $scope.form.contactnumbers && $scope.form.months && $scope.form.dates && $scope.form.hours && $scope.form.minutes && $scope.form.ampms ) {
      $scope.formObjects.datas.items.push(this.form.items);
      $scope.formObjects.datas.firstnames.push(this.form.firstnames);
      $scope.formObjects.datas.lastnames.push(this.form.lastnames);
      $scope.formObjects.datas.dognames.push(this.form.dognames);
      $scope.formObjects.datas.contactnumbers.push(this.form.contactnumbers);
      $scope.formObjects.datas.months.push(this.form.months);
      $scope.formObjects.datas.dates.push(this.form.dates);
      $scope.formObjects.datas.hours.push(this.form.hours);
      $scope.formObjects.datas.minutes.push(this.form.minutes);
      $scope.formObjects.datas.ampms.push(this.form.ampms);
      
      $scope.text = ''; 
      $scope.formStarts.push(this.formObjects.datas);

    } 

    FormService.success($scope.formStarts).then(function(){
      $state.go('dashboard.full.success');  
    }) 
	}

   
}]);



