"use strict";

module.exports = function ( grunt ) {

    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),

        jshint: {

            options: {
                jshintrc: ".jshintrc"
            },
            defaults: [
                "src/**/*.js",
                'Gruntfile.js'
            ]
        },

        csslint: {
            strict: {
                options: {
                    csslintrc: '.csslintrc',
                    import: 2,
                    formatters: ['compact']
                },
                src: [
                    'src/**/*.css'
                ]
            }
        },

        connect: {
            mock: {
                options: {
                    base: 'src/',
                    open: true,
                    keepalive: true
                }
            }
        }

    });

    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-csslint' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );

    // Runs all checkstyle stuff
    grunt.registerTask( 'default', [
        'jshint',
        'csslint'
    ] );

};
