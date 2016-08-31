var dashboard = angular.module('Gallery', [
	'Gallery.controllers',
	'Gallery.services', 
	'Gallery.directives'
])

.config(['$stateProvider', function($stateProvider){

	$stateProvider
	// .state('dashboard.', {
	// 	'abstract': true,
	// 	'views': {
	// 		'layout@dashboard': {
	// 			'templateUrl': 'app/modules/dashboard/views/view-layout-basic.html'
	// 		}
	// 	}
	// })
	.state('dashboard.full.gallery', {
		'url': '/gallery',
		'views': {
			'header@dashboard.full': {
				templateUrl: 'app/modules/dashboard/views/view-dashboard-headerFull.html',
				'controller': 'HeaderController'
			},
			'main@dashboard.full': {
				'templateUrl': 'app/modules/gallery/views/view-gallery-main.html', 
				'controller': 'GalleryController'
			},
			'footer@dashboard.full': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-footer.html', 
			}
		}
	})
}]);