module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		typescript: {
			/**
			 * Compiles devPlan
			 */
			development : {
				src : [ './src/**/*.ts' ],
				dest : './build/assets/js/devplan.js',
				options : {
					module : 'amd',
					target : 'es5',
					sourceMap : true,
					declaration : false
				}
			},
			/**
			 * Compiles unit tests for devPlan
			 */
			tests : {
				src : [ './src/tests/**/*.ts' ],
				dest : './tests/tests.js',
				options : {
					module : 'amd',
					target : 'es5',
					sourceMap : true,
					declaration : false
				}
			}
		},
		/**
		 * Test devPlan
		 */
		qunit: {
			all: ['tests/**/*.html']
		},
		watch : {
			tests : {
				files : [ './tests/tests.js', './tests/index.html','./build/assets/js/devPlan.js' ],
				tasks : [ 'qunit' ],
			},
		}
	});

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', [ 'typescript:development', 'typescript:tests','qunit' ]);
};