module.exports = function(grunt) {
    grunt.initConfig({
        jst: {
            compile: {
                files: {
                    'public/js/templates.js' : 'templates/*.html'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-jst');
}
