var controllers = angular.module('Table.controllers', [])
.controller('TableController', ['$scope', 'TableDataService', 'TableChartService', function($scope, TableDataService, TableChartService){

	TableDataService.getGDPTop20().then(function(data){
		TableChartService.refreshCharts('gdpTop20', null);

		$scope.countries = data;
		// console.log(data);




	});

	$scope.setCharts = function(rowData){

		TableChartService.setRowData('gdpTop20', [rowData]);
	}

 
}])
.controller('GraphController', ['$scope', 'TableDataService', 'TableChartService', function($scope, TableDataService, TableChartService){

	TableDataService.getDogAduption().then(function(data){
		TableChartService.refreshCharts('dogAduption', null);

		$scope.countries = data;
		// console.log(data);




	});

	$scope.setCharts = function(rowData){

		TableChartService.setRowData('dogAduption', [rowData]);
	}

	



 
}]);