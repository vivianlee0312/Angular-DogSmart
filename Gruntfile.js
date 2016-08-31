module.exports= function(grunt){
	//1. creat object  for our task
	var tasksConfig = {

		"chmod": {
			"options": {
 				"mode": '777'
			},
			"target": {
   				"src": ['dist']
 			}
		},			

		"clean" : {
			"dist" : ["dist"]
		},

		"bower_concat": {
			"all" : {
				"dest" : {
					"js": "dist/app_lib.js",
					"css": "dist/app_lib.css"
				},

				"bowerOptions" : {
					"relative": false


				}
			}
		},

		"concat": {
			"css": {
				"files": {
					"dist/app.css": [
						//choose what fiolder/files will be inject in this css folder
						"css/*.css"	
					]
				}
			},

			"application": {
				"files": {
					"dist/app.js": [
						"app/*.js",
						"app/*/*.js",
						"app/*/*/*.js",
						"app/*/*/*/*.js"
					]
				}

			}
		},

		"watch": {
			"application": {
				"files": [
					"app/*.js",
					"app/*/*.js",
					"app/*/*/*.js",
					"app/*/*/*/*.js"
				],

				"tasks": [
					"dev"
				]
			},

			"css": {
				"files": [
					"css/*.css"
				],

				"tasks": [
					"dev"
				]
			}
		}

	};

	//2. get info in bower.json file
	var bowerFile = grunt.file.readJSON('bower.json');


	//inilialize time-grunt
	require('time-grunt')(grunt);

	//initialize config
	grunt.initConfig(tasksConfig);

	//inject libraries into grunt
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-chmod');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-rename');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-bower-task');


	//Register tasks
	
	//1. clean up dist folder ('grunt-contrib-clean')
	//2. concat all bower libraries ('grunt-bower-concat')
	//3. concat all app files ('grunt-contrib-concat')
	//4. remove .min from index.html ('grunt-replace'
	//*** 5. add optional "watch" method ('grunt-contrib-watch')


	grunt.registerTask('dev', function(){

		grunt.task.run([
			//list of tasks: commandPrompt: grunt dev
			'chmod',
			'clean:dist',
			'bower_concat',
			'concat',
			'watch'

		]);
	});
}