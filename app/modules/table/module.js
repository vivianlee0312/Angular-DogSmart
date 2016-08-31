var dashboard = angular.module('Table', [
	'Table.controllers',
	'Table.services', 
	'Table.directives'
])

.config(['$stateProvider', function($stateProvider){

	$stateProvider
	.state('dashboard.three', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-three.html'
			}
		}
	})
	.state('dashboard.three.table', {
		'url': '/table',
		'views': {
			'footer@dashboard.three': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-footer.html',
			},
			'one@dashboard.three': {
				'templateUrl': 'app/modules/table/views/view-graph-details.html', 
				'controller': 'GraphController'
			},
			'two@dashboard.three': {
				'template': '<chart type="pie"></chart>',
				'controller': 'GraphController'
			},
			'three@dashboard.three': {
				'template': '<chart type="bar"></chart>',
				'controller': 'GraphController' 
			} 
		} 
	})
}]);