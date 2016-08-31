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
var controller = angular.module('Ball.controllers', [])

.controller('BallController', ['$scope', '$state', 'QuoteService', function($scope, $state, QuoteService){

	$scope.section = "ball";

	$scope.quote = " ";

	$scope.randomizeQuote = function(){
		$scope.quote = QuoteService.getRandomQuote();
	}

}])


.controller('BallFormController', ['$scope', '$state', 'QuoteService', function($scope, $state, QuoteService){

	$scope.quotes = angular.copy(QuoteService.getQuotes()); 

	$scope.saveQuotes = function (){
		QuoteService.updateQuotes($scope.quotes);
		console.log($scope.quotes);

	}


	

}]);


































































// $scope.saveQuotes = function (){
// 		QuoteService.saveQuotes($scope.quotes).then(function(){

// 			$state.go('dashboard.full.ball'); 
// 		}); 
// 	}

var ball = angular.module('Ball', [
	'Ball.controllers',
	'Quote.services'

]);
var services = angular.module('Quote.services', [])

.factory('QuoteService', ['$q',function($q){
	return {
		
		

		quotes:[

				"It is certain",
				"It is decidedly so",
				"Without a doubt",
				"Yes, definitely",
				"You may rely on it",
				"As I see it, yes",
				"Most likely",
				"Outlook good",
				"Yes",
				"Signs point to yes",
				"Reply hazy try again",
				"Ask again later",
				"Better not tell you now",
				"Cannot predict now",
				"Concentrate and ask again",
				"Don't count on it",
				"My reply is no",
				"My sources say no",
				"Outlook not so good",
				"Very doubtful"

		],
     		
    	

		 getQuotes: function(){

		 	return this.quotes;
		 },

		 setQuotes: function(quotes){
		 	this.quotes= quotes;
		 },
		 

		 getRandomQuote: function(){
		 	var quote= this.quotes[ Math.floor(Math.random() * this.quotes.length-1) +1]

		 	return quote;
		 },

		


		updateQuotes: function(quotes){

		 	console.log("updateQuotes from service");
		 	
		 	var defer= $q.defer();



		 		

		 	// this.setQuotes(quotes);

		 	this.quotes=quotes;
		 	defer.resolve(quotes);

		 	return defer.promise;

		 	
		 }
		


		
		


	};
}]);












































 		// getQuote: function(index){
		 // 	return this.quotes[index];
		 // },

		 // setQuote: function(index, quote){
		 // 	this.quotes[index]= quote;
		 // },



			// for(var x=0; x< quotes.length; x++){
		 // 		if(quotes[x].length < 1){
		 // 			quotes[x] ="EMPTY QUOTE";
		 // 		}
		 // 	}

			// this.quotes= quotes;
		 	// defer.resolve(quotes);

		 	// return defer.promise;

























		
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
var dashboard = angular.module('Dashboard', [
	'Dashboard.controllers'
]);
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
var directives = angular.module('Gallery.directives', [])
.directive('image', function(){





});
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
var services = angular.module('Gallery.services', [])
.factory('GalleryDataService', ['$q', '$http', function($q, $http){
	return {
		// getGDPTop20: function(){
		// 	var defer = $q.defer(), 
		// 		self  = this;

		// 	$http({
		// 		'method': 'GET', 
		// 		'url': 'assets/gdp-data-total-top20.json'
		// 	}).then(function(response){
		// 		self.gdpTop20 = response.data;
		// 		defer.resolve(response.data);
		// 	});

		// 	return defer.promise;
		// },

		getGalleryImage: function(){
			var defer = $q.defer(), 
				self  = this;

			$http({
				'method': 'GET', 
				'url': 'assets/dog-gallery-images.json'
			}).then(function(response){
				self.galleryImage = response.data;
				defer.resolve(response.data);
			});

			return defer.promise;
		}

		
	}

}])
.factory('GalleryImageService', ['GalleryDataService', function(GalleryDataService){
	return{
		charts: [],

		
		getWholeData: function(dataName){
			this[dataName] = GalleryDataService[dataName];
			return GalleryDataService[dataName];
		},

		refreshCharts: function(dataName, force){
			if(!force){
				this.getWholeData(dataName);

			}
			// if no force: get whole data 
			//force: get only one country of data at a time (current object data after onclick)

			//after onclick: data= one rowData object 
			for(var i = 0; i < this.charts.length; i++){

				if(!angular.element(this.charts[i][0]).scope()){
					continue;
				}

				angular.element(this.charts[i][0]).scope().refresh(dataName);
			}
		},
		

		employChart: function(chart){
			this.charts.push(chart); 
		},
		 

		setRowData: function(dataName, rowData){
			this[dataName] = rowData;
			 // console.log(rowData);

			this.refreshCharts(dataName, true); 

		}, 

		// pieConfig: function(){
		// 	var data 	   = this.currentData,
		// 		seriesData = [];

		// 		// console.log(data);

		// 	//Goal: build series data for each country and 
		// 	// 	    their GDP for the last year in the entries



		// 	//loop through properties of an object
		// 	for(var d in data){
		// 		var entry = data[d];
				
		// 		var seriesObj= {
		// 			name: entry["Dog Breed"],
		// 			data: [
		// 				entry["Baby]"], 
		// 				entry["Young"],
		// 				entry["Adult"],
		// 				entry["Senior"], 
		// 			]
		// 		} 

		// 		seriesData.push(seriesObj);
		// 		// console.log(entry); 16 objects
		// 		// console.log(series);	
		// 	} 


		// 	return {
		// 		options:{
		//         	chart: {
		// 	            type: 'pie'
		// 	        }
		//         },
		//         title: {
		//             text: ''
		//         },
		//         tooltip: {
		//             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		//         },
		//         plotOptions: {
		//             pie: {
		//                 allowPointSelect: true,
		//                 cursor: 'pointer',
		//                 dataLabels: {
		//                     enabled: true,
		//                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		//                     style: {
		//                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		//                     }
		//                 }
		//             }
		//         },
		//         series: [{
		//             name: 'Countries',
		//             colorByPoint: true,
		//             data: seriesData
		//         }]
		//     }
		// },

		// pieConfig: function(dataName, service){
			

			
		// 	var data   	   = service[dataName],
		// 		series 	   = [];

		// 	// console.log(data);

			

		// 	//loop through properties of an object
		// 	for(var d in data){
		// 		var entry = data[d];
				
		// 		var seriesObj= {
		// 			name: entry["Dog Breed"],
		// 			data: [
		// 				{
		// 					name: "Baby",
		// 					y: entry["Baby"]
		// 				},
		// 				{
		// 					name:"Young",
		// 					y:entry["Young"]
		// 				},
		// 				{
		// 					name: "Adult",
		// 					y: entry["Adult"]},
		// 				{
		// 					name:"Senior",	
		// 					y:entry["Senior"]}
						

		// 				// entry["Baby"],
		// 				// entry["Young"],
		// 				// entry["Adult"],
		// 				// entry["Senior"]
		// 			]
		// 		} 

		// 		series.push(seriesObj);
		// 		// console.log(entry); 16 objects
		// 		// console.log(series);	
		// 	} 

		// 	//build year
		// 	for(var p in data[0]){
		// 		var value = data[0][p];
		// 			// dogProps = Object.keys(value),
		// 			// lastFourProperty= dogProps[dogProps.length - 1];


		// 		if(typeof value == 'number'){
		// 			var type= p.substring(0, 6);
		// 			console.log(type); 
					

		// 			// seriesObj.data.name.push(type);

		// 			// for(var c= 0; c<series.length; c++){
		// 			// 	var countryGDP = entry[year + " " + "[YR" + year + "]"];
		// 			// 	console.log(countryGDP); 
		// 			// 	seriesObj.data.name.push(type);
		// 			// }
		// 		}
		// 	} 


		// 	//build year
		// 	// for(var p in data[0]){
		// 	// 	var value = data[0][p];

		// 	// 	if(typeof value == 'number'){
		// 	// 		var year= p.substring(0, 4);
		// 	// 		// console.log(year); 

		// 	// 		for(var c= 0; c<series.length; c++){
		// 	// 			var countryGDP = entry[year + " " + "[YR" + year + "]"];
		// 	// 			// console.log(countryGDP); 
		// 	// 			seriesObj.data.push(countryGDP);
		// 	// 		}
		// 	// 	}
		// 	// } 



 			

  
		// 	// //loop through properties of an object
		// 	// for(var d in data){
		// 	// 	var entry = data[d]; 
				
		// 	// 	// console.log(entry); 16 objects
		// 	// 	// console.log(series);
				
		// 	// 	series.push({
		// 	// 		name: entry["Country Name"],
		// 	// 		data: [
						
		// 	// 			entry["2010 [YR2010]"], 
		// 	// 			entry["2011 [YR2011]"],
		// 	// 			entry["2012 [YR2012]"],
		// 	// 			entry["2013 [YR2013]"],
		// 	// 			entry["2014 [YR2014]"] 
		// 	// 		]
		// 	// 	})
		// 	// } 

		// 	// return { 
		// 	// 	options: {
		//  //            dataLabels: {
		//  //                enabled: false,
		//  //            }, 
		// 	//       	chart: {
		//  //        		type: 'pie'
		// 	//       	},
		// 	//       	plotOptions: { 
		//  //                pie: {
		//  //                	allowPointSelect: true,
		//  //                    dataLabels: {
		//  //                        distance: -25, //adjust this value to change label distance
		//  //                    	enabled: false,
		//  //                    	format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		//  //                   		 style: {
		//  //                        	color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		//  //                    	}
		//  //                    }
		//  //                }
		//  //            },
		// 	//       	tooltip: { 
		// 	//           	style: {
		// 	//               padding: 10,
		// 	//               fontWeight: 'bold'
		// 	//           }
		// 	//       	},
		// 	//       	exporting: {
		// 	// 		    enabled: false
		// 	// 		},
		// 	// 		credits: false
		// 	//   	},
		// 	//   	//Series object (optional) - a list of series using normal Highcharts series options.
		// 	// 	series: series,

		
		// 	// 	//Title configuration (optional)
		// 	// 	title: {
		// 	// 	    text: 'Most Recent Years'
		// 	// 	},
		// 	// 	//Boolean to control showing loading status on chart (optional)
		// 	// 	//Could be a string if you want to show specific loading text.
		// 	// 	loading: false,
		// 	//   	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
		// 	//   	useHighStocks: false,
		// 	//   	//size (optional) if left out the chart will default to size of the div or something sensible.
		// 	//   	// size: size 
		// 	// };

		// 	return {
		// 		options:{
		//         	chart: {
		// 	            type: 'pie'
		// 	        }
		//         },
		//         title: {
		//             text: 'Number of Avaliable Dogs for Aduption by Age Group' 
		//         },
		//         tooltip: {
		//             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		//         },
		//         plotOptions: {
		//             pie: {
		//                 allowPointSelect: true,
		//                 cursor: 'pointer',
		//                 dataLabels: {
		//                     enabled: true,
		//                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		//                     style: {
		//                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		//                     }
		//                 }
		//             }
		//         },
		//         series: series
		//     }

		// 	// return config;
		// },

		// barConfig: function(dataName, service, size){

		// 	var data= service[dataName],
		// 		series= [], 
		// 		categories= [];

		// 		// console.log(data); = one array of 16 objects

		// 	//build year= categories = x-axis
		// 	// for(var p in data[0]){
		// 	// 	var value = data[0][p];

		// 	// 	if(typeof value == 'number'){
		// 	// 		var year= p.substring(0, 4);
		// 	// 		// console.log(year); 
		// 	// 		categories.push(year);
		// 	// 	}
		// 	// }

		// 	//build year
		// 	for(var p in data[0]){
		// 		var value = data[0][p];
		// 			// dogProps = Object.keys(value),
		// 			// lastFourProperty= dogProps[dogProps.length - 1];


		// 		if(typeof value == 'number'){
		// 			var type= p.substring(0, 6);
		// 			// 
		// 			categories.push(type); 
					
		// 			// seriesObj.data.name.push(type);

		// 			// for(var c= 0; c<series.length; c++){
		// 			// 	var countryGDP = entry[year + " " + "[YR" + year + "]"];
		// 			// 	console.log(countryGDP); 
		// 			// 	seriesObj.data.name.push(type);
		// 			// }
		// 		}
		// 	}  


		// 	//build series
		// 	//iterate through each property of the data
		// 	for(var p in data){
		// 		var entry= data[p];


		// 		// console.log(entry); = 16 objects

		// 		var seriesObj= {
		// 			name: entry["Dog Breed"],
		// 			data: [
		// 				{
		// 					name: "Baby",
		// 					y: entry["Baby"]
		// 				},
		// 				{
		// 					name:"Young",
		// 					y:entry["Young"]
		// 				},
		// 				{
		// 					name: "Adult",
		// 					y: entry["Adult"]},
		// 				{
		// 					name:"Senior",	
		// 					y:entry["Senior"]}
						

		// 				// entry["Baby"],
		// 				// entry["Young"],
		// 				// entry["Adult"],
		// 				// entry["Senior"]
		// 			]
		// 		} 

		// 		//iterate through each property of the entry
		// 		// for(var c in entry){
		// 		// 	var value = entry[c];

		// 		// 	if(typeof value == 'string'){
		// 		// 		seriesObj.data.push(value)
		// 		// 	}
		// 		// } 
		// 		series.push(seriesObj);
		// 	}

			





		// 	// var data   	   = service[dataName],
		// 	// 	series 	   = [],
		// 	// 	categories = [
					
		// 	// 		'2010',
		// 	// 		'2011',
		// 	// 		'2012',
		// 	// 		'2013',
		// 	// 		'2014'
		// 	// 	];

		// 	// 	//categories: x axis 
		// 	// 	//series: y axis 

		// 	// for(var d in data){
		// 	// 	var entry = data[d];
				
		// 	// 	series.push({
		// 	// 		name: entry["Country Name"],
		// 	// 		data: [
						
		// 	// 			entry["2010 [YR2010]"],
		// 	// 			entry["2011 [YR2011]"],
		// 	// 			entry["2012 [YR2012]"],
		// 	// 			entry["2013 [YR2013]"],
		// 	// 			entry["2014 [YR2014]"]
		// 	// 		]
		// 	// 	})
		// 	// }

		// 	return {
		// 		options: {
		// 	      	chart: {
		//         		type: 'column'
		// 	      	},
		// 	      	tooltip: {
		// 	          	style: {
		// 	              padding: 10,
		// 	              fontWeight: 'bold'
		// 	          }
		// 	      	},
		// 	      	exporting: {
		// 			    enabled: false
		// 			},
		// 			credits: false
		// 	  	},
		// 	  	//Series object (optional) - a list of series using normal Highcharts series options.
		// 		series: series,
		// 		//Title configuration (optional)
		// 		title: {
		// 		    text: ''
		// 		},
		// 		//Boolean to control showing loading status on chart (optional)
		// 		//Could be a string if you want to show specific loading text.
		// 		loading: false,
		// 		xAxis: {
		// 			title: {
		// 				text: 'Age'
		// 			},
		// 			categories: categories
		// 		},
		// 		yAxis: {
		//             title: {
		//                 text: 'Number of Dogs'
		//             },
		//             labels: {
	 //                	formatter: function () {
		//                     return this.axis.defaultLabelFormatter.call(this).replace('T', '');
		//                 }            
		//             }
		// 		},
		// 	  	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
		// 	  	useHighStocks: false,
		// 	  	//size (optional) if left out the chart will default to size of the div or something sensible.
		// 	  	size: size
		// 	}

			
		// },

		

	}

}]);   
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




var directives = angular.module('Service.directives', [])
.directive('service', function(){





});
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
var services = angular.module('Service.services', [])


.factory('FormService', ['$http', '$q', 'localStorageService', function($http, $q, localStorageService){
		
	return {
	
		formObjects: {
			datas: {
				items: [],
				firstnames:[],
				lastnames:[],
				dognames:[],
				contactnumbers: [],
				months: [],
				dates:[],
				hours: [],
				minutes: [],
				ampms: []
			}
			  
		},

		formStarts: [],

		getFormObjects: function(){

			return this.formObjects;
			
		},

		getFormStarts: function(){

			return this.formStarts;
			
		},

		success: function(formStarts){
			var defer = $q.defer();

			this.formStarts = formStarts;
			defer.resolve(formStarts);

			return defer.promise; 
		}

	}
}]);





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
var directives = angular.module('Table.directives', [])
.directive('chart', function(){

	return {

		restrict: 'E',
		template: '<highchart id="chart1" config="chartConfig" style="max-height: 100%; overflow: hidden"></highchart>',
		controller: ['$scope', '$attrs', '$element', 'TableChartService', function($scope, $attrs, $element, TableChartService){
				$scope.refresh = function(dataName){
					var configFn  = TableChartService[$attrs.type + "Config"];


					$scope.chartConfig = configFn(dataName, TableChartService);
				};

		 	TableChartService.employChart($element);
		}] 



	};	
});
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
var services = angular.module('Table.services', [])
.factory('TableDataService', ['$q', '$http', function($q, $http){
	return {
		
		getDogAduption: function(){
			var defer = $q.defer(), 
				self  = this;

			$http({
				'method': 'GET', 
				'url': 'assets/dog-data-aduption.json'
			}).then(function(response){
				self.dogAduption = response.data;
				defer.resolve(response.data);
			});

			return defer.promise;
		},
	}

}])
.factory('TableChartService', ['TableDataService', function(TableDataService){
	return{
		charts: [],

		
		getWholeData: function(dataName){
			this[dataName] = TableDataService[dataName];
			return TableDataService[dataName];
		},

		refreshCharts: function(dataName, force){
			if(!force){
				this.getWholeData(dataName);

			}
			// if no force: get whole data 
			//force: get only one country of data at a time (current object data after onclick)

			//after onclick: data= one rowData object 
			for(var i = 0; i < this.charts.length; i++){

				if(!angular.element(this.charts[i][0]).scope()){
					continue;
				}

				angular.element(this.charts[i][0]).scope().refresh(dataName);
			}
		},
		

		employChart: function(chart){
			this.charts.push(chart);
		},
		 

		setRowData: function(dataName, rowData){
			this[dataName] = rowData;
			 // console.log(rowData);

			this.refreshCharts(dataName, true); 

		}, 

		pieConfig: function(dataName, service){
		
			var data   	   = service[dataName],
				series 	   = [];

			// console.log(data);

			
			// loop through properties of an object
			for(var d in data){
				var entry = data[0];
				
				var seriesObj= {
					name: entry["Dog Breed"],
					data: [
						{
							name: "Baby",
							y: entry["Baby"]
						},
						{
							name:"Young",
							y:entry["Young"]
						},
						{
							name: "Adult",
							y: entry["Adult"]},
						{
							name:"Senior",	
							y:entry["Senior"]}
					]
				} 
				series.push(seriesObj);
				
			} 

			return {
				options:{
					dataLabels: {
						enabled: false,
					},
		        	chart: {
			            type: 'pie'
			        }
		        },
		        title: {
		            text: 'Number of Avaliable Dogs for Aduption by Age Group' 
		        },
		        tooltip: {
		        	style: {
		        		padding: 10,
		        		fontWeight: 'bold'
		        	},
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                	distance:-25,
		                    enabled: false,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
		            }
		        },
		        exporting: {
		        	enabled: false
		        },

		        series: series
		    }
		},

		barConfig: function(dataName, service, size){

			var data= service[dataName],
				series= [], 
				categories= [];

			//build year
			for(var p in data[0]){
				var value = data[0][p];
					// dogProps = Object.keys(value),
					// lastFourProperty= dogProps[dogProps.length - 1];


				if(typeof value == 'number'){
					var type= p.substring(0, 6);
					
					categories.push(type); 
					
				}
			}  


			//build series
			//iterate through each property of the data
			for(var p in data){
				var entry= data[p]; 

				// console.log(entry); = 16 objects

				var seriesObj= {
					name: entry["Dog Breed"],
					data: [
						{
							name: "Baby",
							y: entry["Baby"]
						},
						{
							name:"Young",
							y:entry["Young"]
						},
						{
							name: "Adult",
							y: entry["Adult"]},
						{
							name:"Senior",	
							y:entry["Senior"]}
					]
				} 
				series.push(seriesObj);
			}

			return {
				options: {
			      	chart: {
		        		type: 'column'
			      	},
			      	tooltip: {
			          	style: {
			              padding: 10,
			              fontWeight: 'bold'
			          }
			      	},
			      	exporting: {
					    enabled: false
					},
					credits: false
			  	},
			  	//Series object (optional) - a list of series using normal Highcharts series options.
				series: series,
				//Title configuration (optional)
				title: {
				    text: ''
				},
				//Boolean to control showing loading status on chart (optional)
				//Could be a string if you want to show specific loading text.
				loading: false,
				xAxis: {
					title: {
						text: 'Age'
					},
					categories: categories
				},
				yAxis: {
		            title: {
		                text: 'Number of Dogs'
		            },
		            labels: {
	                	formatter: function () {
		                    return this.axis.defaultLabelFormatter.call(this).replace('T', '');
		                }            
		            }
				},
			  	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
			  	useHighStocks: false,
			  	//size (optional) if left out the chart will default to size of the div or something sensible.
			  	size: size
			}

			
		},
	}

}]);   
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

var user = angular.module('User', [
	'User.controllers',
	'User.services'

]);
var services = angular.module('User.services', [])

.factory('UserService', ['$http', '$q', 'localStorageService', function($http, $q, localStorageService){
	return {
		user: {},
		getUser: function(){
			if(!this.user.token){
				this.user = localStorageService.get('user');
			}
			return this.user;
		},
		setUser: function(user){
			this.user = user;
			localStorageService.set('user', user);
		},
		login: function(username, password){
			var defer = $q.defer(),
				self  = this;

			console.log("Login from UserService");

			//call ajax to login
			$http({
				'method': 'POST',
				'url': 'http://localhost:3000/login',
				'data': {
					'username': username,
					'password': password
				}
			}).then(function(response){

				self.setUser(response.data);

				defer.resolve(response);

			}, function(error){
				
				defer.reject(error);

			});
			
			return defer.promise;
		},
		signup: function(fn, ln, un, pw){
			var defer = $q.defer();

			//call ajax to login
			$http({
				'method': 'POST',
				'url': 'http://localhost:3000/signup',
				'data': {
					'firstName': fn,
					'lastName': ln,
					'username': un,
					'password': pw
				}
			}).then(function(response){

				defer.resolve(response);

			}, function(error){
				
				defer.reject(error);

			});

			return defer.promise;
		},

		// quotes: function(){
			

		// 	//call ajax to login
		// 	$http({
				
		// 		'url': 'http://localhost:3000/quotes',
			
		// 	});

			
		// }


	};
}]);