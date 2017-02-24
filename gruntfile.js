module.exports = function(grunt){

	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				options:{
					livereload:true
				}
			},
			js:{
				files:['public/js/**','models/**/*.js','schemas/**/*.js'],
				tasks:['jshint'],
				options:{
					livereload:true
				}
			}
		},

		nodemon:{
			dev:{
				script: 'app.js',
		        options: {
	               args: [],
	               nodeArgs: ['--debug'],
	               ignore: ['README.md', 'node_modules/**'],
	               ext: 'js',
	               watch: ['./'],
	               delay: 1000,
	               env: {
	                    PORT: '80'
	               },
	               cwd: __dirname
		        }
			}
		},

		concurrent:{
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		}

	})

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')
	grunt.option('force' , true)

	grunt.registerTask('default',['concurrent'])

}