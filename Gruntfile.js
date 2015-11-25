module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        watch: {
            src: {
                files: ['client/js/app/**.js'],
                tasks: ['concat']
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['bower_components/angular/angular.min.js', 'client/js/dest/**.js'],
                dest: 'client/js/bundle.js',
            },
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'client/js/app',
                    src: '*.js',
                    dest: 'client/js/dest'
                }]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Concatenation task
    grunt.registerTask('concatenate', 'concat');

    // Uglification task
    grunt.registerTask('preuglify', 'uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'concat']);

};
