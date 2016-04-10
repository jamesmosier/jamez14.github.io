'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jekyll: {
      build: {
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
        files: ['_layouts/*.html', '_includes/**/*.html', '_plugins/*', '_posts/*', 'about/*', 'contact/*', 'portfolio/*', 'projects/*', 'blog/**/*', 'index.html', 'css/app.css'],
        tasks: ['jekyll', 'copy']
      },
      scripts: {
        files: ['js/gMap.js', 'js/projects.js', 'js/homepage.js', 'js/sw.js'],
        tasks: ['uglify:dev', 'jekyll', 'copy']
      }
    },
    // http://192.168.1.143:3001/
    // '_site/css/*.css'

    browser_sync: {
      dev: {
        options: {
          ghostMode: false,
          host: 'localhost',
          port: 3000,
          files: ['_site/css/*.css'],
          watchTask: true,
          server: {
            baseDir: '_site'
          }
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/app.min.css': ['css/app.css']
        }
      }
    },

    uglify: {
      prod: {
        options: {
          compress: {
            drop_console: true
          }
        },
        files: {
          'js/app.min.js': ['lib/modernizr.js', 'js/projects.js', 'js/gMap.js', 'js/homepage.js'],
          'js/lib.min.js': ['lib/jquery.color-2.1.2.min.js', 'lib/jquery.hoverdir.js', 'lib/headroom/headroom.min.js'],
          'sw.js': ['js/sw.js']
        }
      },
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: {
          'js/app.min.js': ['lib/modernizr.js', 'js/projects.js', 'js/gMap.js', 'js/homepage.js'],
          'js/lib.min.js': ['lib/jquery.color-2.1.2.min.js', 'lib/jquery.hoverdir.js', 'lib/headroom/headroom.min.js'],
          'sw.js': ['js/sw.js']
        }
      }
    },

    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:jamesdmosier/jamesdmosier.github.io.git',
          branch: 'master'
        }
      }
    },

    clean: [
      '_site'
    ],

    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['icons/*'],
            dest: '_site/',
            filter: 'isFile'
          }
        ]
      }
    }

  });

  // Custom tasks
  grunt.registerTask('build', ['sass', 'cssmin', 'uglify:dev', 'jekyll', 'copy']);
  //grunt.registerTask('postbuild', []);
  grunt.registerTask('default', ['build', 'browser_sync', 'watch']);

  grunt.registerTask('prod', ['sass', 'jekyll', 'cssmin', 'uglify:prod', 'copy', 'buildcontrol']);

  grunt.registerTask('publish', ['buildcontrol']);

};
