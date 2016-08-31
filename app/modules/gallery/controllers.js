var controllers = angular.module('Gallery.controllers', [])
.controller('GalleryController', ['$scope', 'GalleryDataService', 'GalleryImageService', function($scope, GalleryDataService, GalleryImageService){

	GalleryDataService.getGalleryImage().then(function(data){
		GalleryImageService.refreshCharts('galleryImage', null);

		$scope.countries = data;
		// console.log(data);
	});	

	// $scope.setCharts = function(rowData){

	// 	TableChartService.setRowData('gdpTop20', [rowData]);
	// }


 
}]);