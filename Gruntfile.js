module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        watch: {
            src: {
                files: ['client/js/app/**/**.js'],
                tasks: ['default']
            }
        },
        concat: {
            options: {
                separator: ';',
                sourceMap: true
            },
            dist: {
                src: [
                    // Vendor files
                    'client/components/angular/angular.min.js',
                    'client/components/angular-ui-router/release/angular-ui-router.min.js', 
                    'client/components/angular-bootstrap/ui-bootstrap-tpls.min.js', 
                    // App files
                    'client/js/dest/**/**.js'
                ],
                dest: 'client/js/bundle.js',
            },
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'client/js/app',
                    src: '**/**.js',
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
    grunt.registerTask('default', ['preuglify', 'concatenate']);

};
