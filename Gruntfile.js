
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
      sass: {
        files: 'sass/**/*.scss',
        tasks: ['sass', 'cssmin']
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
        src: ['sass/*.scss']
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
          '_site/js/app.min.js': ['_site/lib/modernizr.js', '_site/js/app.js'],
          '_site/js/lib.min.js': ['_site/lib/jquery.typer.js', '_site/lib/jquery.hoverdir.js', '_site/lib/headroom/headroom.min.js']
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
    }


  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-build-control');


  // Custom tasks
  grunt.registerTask('build', ['sass', 'jekyll']);
  grunt.registerTask('postbuild', ['cssmin', 'uglify']);
  grunt.registerTask('default', ['build', 'postbuild', 'browser_sync', 'watch']);

  grunt.registerTask('prod', ['sass', 'jekyll', 'cssmin', 'uglify', 'buildcontrol']);
};
