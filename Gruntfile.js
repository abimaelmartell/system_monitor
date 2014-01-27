module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        files: {
          "public/css/main.css": "assets/stylesheets/main.less"
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'public/js/app.js': ['assets/javascripts/app.coffee']
        }
      }
    },
    watch: {
      files: ['assets/stylesheets/*.less', 'assets/javascripts/*.coffee'],
      tasks: ['less', 'coffee']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('default', ['less', 'coffee']);
};
