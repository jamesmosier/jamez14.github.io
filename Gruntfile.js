module.exports = function (grunt) {

    // Project Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: ['sass/**.scss'],
                tasks: 'sass:dev'
            },
            livereload: {
                options: {
                    livereload: {
                        port: 4000
                    }
                },
                files: ['css/*'],
            },
        },

        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/app.css': 'sass/app.scss'
                }
            },
            dev: {
                options: {
                    style: 'expanded'
                },
                src: ['sass/app.scss'],
                dest: 'css/app.css'
            }
        },

        jekyll: {
            dev: {
                options: {
                    serve: true,
                    watch: true
                }
            }
        },

        concurrent: {
            tasks: ['watch:sass', 'jekyll:dev'],
            options: {
                logConcurrentOutput: true
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-concurrent');

   
    grunt.registerTask('build', ['sass', 'jekyll']);
    grunt.registerTask('default', ['build', 'concurrent'])

};