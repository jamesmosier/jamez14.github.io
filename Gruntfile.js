
module.exports = function(grunt) {

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
      options: {
        livereload: true
      },
      sass: {
        files: 'sass/**/*.scss',
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true
        }
      },
      jekyll: {
        files: ['_layouts/*.html', '_includes/*.html', 'js/*.js', '_plugins/*', '_posts/*', 'css/app.css', 'about/*', 'contact/*', 'portfolio/*', 'index.html'],
        tasks: ['jekyll']
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['uglify']
      }
    },
    // http://192.168.1.143:3001/
    // '_site/css/*.css'
    browser_sync: {
      files: {
        src: ['_site/css/*.css']
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
          'css/app.min.css': ['css/app.css']
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'js/app.min.js': ['lib/modernizr.js', 'js/app.js'],
          'js/lib.min.js': ['lib/jquery.typer.js', 'lib/jquery.hoverdir.js', 'lib/headroom/headroom.min.js']
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


  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // Custom tasks
  grunt.registerTask('build', ['sass', 'cssmin', 'uglify', 'jekyll']);
  //grunt.registerTask('postbuild', []);
  grunt.registerTask('default', ['build', 'browser_sync', 'watch']);

  grunt.registerTask('prod', ['sass', 'jekyll', 'cssmin', 'uglify', 'buildcontrol']);



};
