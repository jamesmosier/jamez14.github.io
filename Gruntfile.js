module.exports = function(grunt) {
 
    // All configuration goes here
    grunt.initConfig({
 
        jekyll: {
            build : {
                dest: '_site'
            }
        },
 
        sass: {
            dist: {
                files: {
                    'css/app.css': 'sass/app.scss'
                }
            }
        },
 
        watch: {
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass', 'cssmin']
            },
            jekyll: {
                files: ['_layouts/*.html', '_includes/*.md', '_plugins/*', '_posts/*', 'css/app.css', 'about/*', 'contact/*', 'portfolio/*', 'index.html'],
                tasks: ['jekyll']
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['uglify']
            }
        },
 
        browser_sync: {
            files: {
                src : ['_site/css/*.css']
            },
            options: {
                watchTask: true,
                ghostMode: {
                    clicks: true,
                    scroll: true,
                    links: true,
                    forms: true
                },
                server: {
                    baseDir: '_site'
                }
            }
        },
        cssmin: {
          combine: {
            files: {
              '_site/css/app.min.css': ['_site/css/app.css']
            }
          }
        },
        uglify: {
            my_target: {
                files: {
                    '_site/js/app.min.js': ['_site/js/app.js'],
                    '_site/js/lib.min.js': ['_site/lib/jquery.typer.js', '_site/lib/jquery.hoverdir.js']
                }
            }
        }
 
    });
 
    // Load the plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
 
    // Custom tasks
    grunt.registerTask('build', ['sass', 'jekyll', 'cssmin', 'uglify']);
    grunt.registerTask('default', ['build', 'browser_sync', 'watch']);
};