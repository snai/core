/**
 * ownCloud - App Settings
 *
 * @author Bernhard Posselt
 * @author Raghu Nayyar
 *
 * @copyright 2013 Bernhard Posselt <dev@bernhard-posselt.com>
 * @copyright 2013 Raghu Nayyar <raghu.nayyar.007@gmail.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

module.exports = function(grunt) {
	// load needed modules
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-phpunit');

	grunt.initConfig({
		meta: {
			pkg: grunt.file.readJSON('package.json'),
			version: '<%= meta.pkg.version %>',
			production: '../../js/apps/public/'
		},

		concat: {
			basic: {
				options: {
					stripBanners: true
				},
				src: [
					'../../js/apps/config/config.js'
				],
				dest: '<%= meta.production %>config.js',
			},
			extras: {
				options: {
					stripBanners: true
				},
				src: [
					'../../js/apps/app/**/*.js'
				],
				dest: '<%= meta.production %>app.js'
			},
		},

		jshint: {
			files: [
				'Gruntfile.js',
				'../../js/apps/**/*.js',
				'../../js/apps/config/*.js',
				'../../tests/apps/js/unit/**/*.js'
			],
			options: {
				globals: {
					console: true
				}
			}
		},

		watch: {
			concat: {
				files: [
					'../../js/apps/app/**/*.js',
					'../../js/apps/config/*.js'
				],
				tasks: ['build']
			},
			
			phpunit: {
				files: '../../**/*.php',
				tasks: ['phpunit']
			}
		},

		phpunit: {
			classes: {
				dir: '../../tests/apps/php/unit'
			},
			options: {
				colors: true
			}
		},

		karma: {
			unit: {
				configFile: '../../tests/apps/js/config/karma.js'
			},

			continuous: {
				configFile: '../../tests/apps/js/config/karma.js',
				singleRun: true,
				browsers: ['PhantomJS'],
				reporters: ['progress']
			}
		}
	});
	
	// make tasks available under simpler commands
	grunt.registerTask('build', ['jshint', 'concat']);
	grunt.registerTask('test', ['karma']);
};