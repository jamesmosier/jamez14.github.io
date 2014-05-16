module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      app_targets: {
        files: {
          '_site/js/app.min.js': ['js/app.js']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          '_site/css/app.min.css': ['lib/normalize.css', 'css/framework.css', 'css/app.css', 'css/responsive.css']
        }
      }
    },
    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve --watch'
      },
      deploy: {
        cmd: 'rsync --progress -a --delete -e "ssh -q" _site/ myuser@host:mydir/'
      }
    }
  });

grunt.loadNpmTasks('grunt-exec');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');



grunt.registerTask('default', [ 'exec:build', 'uglify', 'cssmin' ]);
grunt.registerTask('deploy', [ 'default', 'exec:deploy' ]);

};