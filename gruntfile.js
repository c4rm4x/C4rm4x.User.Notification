module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({

		jasmine: {
			pivotal: {
	            src: 'scripts/app/*.js',
	            options: {
	                specs: 'scripts/tests/*.js',
	                vendor: [
	                    'bower_components/angular/angular.js',
	                    'bower_components/angular-route/angular-route.js',
	                    'bower_components/angular-mocks/angular-mocks.js',
	                    'bower_components/angular-animate/angular-animate.js',
	                    'bower_components/angular-aria/angular-aria.js',
	                    'bower_components/angular-messages/angular-messages.js'
	                ]
	            }
	        }
        },

		watch: {
			scripts: {
				files: ['scripts/**/*.js'],
				tasks: ['jasmine']
			}
		},

		concat: {
			js: {
				src: 'scripts/app/*.js',
				dest: 'src/angular-notification.js'
			}
		},

		uglify: {
			options: {
				compress: true,
				mangleProperties: false				
			},
			my_target: {
				files: {
					'src/angular-notification.min.js': ['src/angular-notification.js']
				}
			}			
		},

		copy: {
			main: {
				files: [
				{
					expand: true, 
					src: 'scripts/app/examples/*',
					dest: 'src/examples/',
					flatten: true
				}]
			}
		}
	});

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('test', ['jasmine']);
	grunt.registerTask('min', ['concat', 'uglify']);
	grunt.registerTask('deploy', ['concat', 'uglify', 'copy']);
};