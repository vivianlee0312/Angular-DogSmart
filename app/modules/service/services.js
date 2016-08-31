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




