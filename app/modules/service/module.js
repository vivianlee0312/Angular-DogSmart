var dashboard = angular.module('Service', [
	'Service.controllers',
	'Service.services', 
	'Service.directives'
])

.config(['$stateProvider', function($stateProvider){

	$stateProvider
	.state('dashboard.full.service', {
		'url': '/service',
		'views': {
			'header@dashboard.full': {
				templateUrl: 'app/modules/dashboard/views/view-dashboard-headerFull.html',
				'controller': 'HeaderController'
			},
			'main@dashboard.full': {
				'templateUrl': 'app/modules/service/views/view-service-form.html', 
				'controller': 'FormController'
			},
			'footer@dashboard.full': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-footer.html', 
			} 			
		}
	})
	.state('dashboard.full.success', {
		'url': '/success',
		'views': {
			'main@dashboard.full': {
				'templateUrl': 'app/modules/service/views/view-service-todo.html', 
				'controller': 'FormController'
			},
			'footer@dashboard.full': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-footer.html', 
			} 
		}
	})
}]);