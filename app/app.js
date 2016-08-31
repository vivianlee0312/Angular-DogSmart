var app = angular.module('FirstApp', [
	'ui.router',
	'ngAnimate',
	'ngAria',
	'ngMaterial',
	'angular-loading-bar',
	'LocalStorageModule',
	'highcharts-ng',
	'flow',

	'Dashboard',	
	'User',		
	'Table', 
	'Gallery', 
	'Service', 

])


.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, localStorageServiceProvider){

	localStorageServiceProvider
	.setPrefix('myfirstapps')
	.setStorageType('localStorage');

	//Setup redirects or default paths
	$urlRouterProvider.when('', '/login');

	//Define states of application
	$stateProvider
	.state('login', {
		'url': '/login',
		'views': {
			'container': {
				'templateUrl': 'app/modules/user/views/view-login-container.html',
				'controller': 'LoginController'
			}
		}
	})
	.state('signup', {
		'url': '/signup',
		'views': {
			'container': {
				'templateUrl': 'app/modules/user/views/view-signup-container.html',
				'controller': 'SignupController'
			}
		} 
	})
	.state('dashboard', {
		'abstract': true,
		'views': {
			'container': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-container.html'
			},
			'nav@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-nav.html',
				'controller': 'NavController'
			},
			'footer@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-footer.html',
			}
		}
	})
	.state('dashboard.basic', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-basic.html'
			}
		}
	})
	.state('dashboard.full', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-full.html'
			}
		}
	})
	.state('dashboard.basic.home', {
		'url': '/home',
		'views': {
			'header@dashboard.basic': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-headerBasic.html'
			},
			'main@dashboard.basic': {
				'templateUrl': 'app/modules/dashboard/views/view-home-details.html '
			},
			'footer@dashboard.basic': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-footer.html '
			},
		}
	})
	.state('dashboard.full.profile', {
		'url': '/profile',
		'views': {
			'header@dashboard.full': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-headerFull.html',
				'controller': 'HeaderController'
			},
			'main@dashboard.full': {
				'templateUrl': 'app/modules/user/views/view-profile.html', 
				'controller': 'ProfileController'
			}
		}
	});
}]);