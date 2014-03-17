/*!
 * http://timpietrusky.com
 * @author Tim Pietrusky
 */

'use strict';

/**
 * Grunt module
 */
module.exports = function (grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * Grunt config
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),





    /**
     * Set project info
     */
    project: {
      main_css : 'theme.css',
      main_js : 'scripts.js',

      src: 'src',
      src_scss: '<%= project.src %>/scss',
      src_js: '<%= project.src %>/js',
      src_js_files: [
        '<%= project.src_js %>/vendor/ga.js',
        '<%= project.src_js %>/wordpress/*.js',
        '<%= project.src_js %>/core/*.js',
        '<%= project.src_js %>/*.js'
      ],

      app: 'app',
      app_css: '<%= project.app %>/css',
      app_js: '<%= project.app %>/js'

    },





    /**
     * Project banner
     * Dynamically appended to CSS/JS files
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n'
    },





    /**
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      files: ['src/js/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },





    /**
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and appends project banner
     */
    concat: {
      options: {
        stripBanners: true,
        nonull: true,
        banner: '<%= tag.banner %>'
      },
      dev: {
        files: {
          '<%= project.app_js %>/<%= project.main_js %>': '<%= project.src_js_files %>'
        }
      }
    },





    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      options: {
        banner: "<%= tag.banner %>"
      },
      dist: {
        files: {
          '<%= project.app_js %>/<%= project.main_js %>': '<%= project.src_js_files %>'
        }
      }
    },





    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files and appends project banner
     */
    compass: {
      dev: {
        options: {
          sassDir: '<%= project.src_scss %>',
          cssDir: '<%= project.app_css %>',
          watch: true
        }
      },
      recompile: {
        options: {
          sassDir: '<%= project.src_scss %>',
          cssDir: '<%= project.app_css %>',
        }
      },
      dist: {
        options: {
          sassDir: '<%= project.src_scss %>',
          cssDir: '<%= project.app_css %>',
          outputStyle: 'compressed',
          environment: 'production'
        }
      },
      clean: {
        options: {
          sassDir: '<%= project.src_scss %>',
          cssDir: '<%= project.app_css %>',
          clean: true
        }
      }
    },





    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     */
    watch: {
      concat: {
        files: '<%= project.src_js %>/{,*/}*.js',
        tasks: ['concat:dev', 'jshint']
      }
    },





    /* 
     * Use different blocking tasks at the same time
     */
    concurrent: {
        target1: ['compass', 'watch'],
        options: {
          logConcurrentOutput: true
        }
    },





    /*
     * Deploy to a server with FTP
     */
    ftpush: {
      build: {
        auth: {
          host: '185.21.101.189',
          port: 21,
          authKey: 'key1'
        },
        src: 'app',
        dest: '/var/www/weloveiconfonts.com',
        exclusions: ['app/.gitignore']
      }
    },





    /*
     * Deploy to a server with SFTP
     */
    'sftp-deploy': {
      build: {
        auth: {
          host: 'pelle.wpengine.com',
          port: 22,
          authKey: 'key1'
        },
        src: '.',
        dest: '/wp-content/themes/synoa.2014',
        exclusions: [
          './node_modules', 
          './.sass-cache', 
          './.ftppass', 
          './.jshintrc', 
          './Gruntfile.js', 
          './src',
          'package.json',
          'sftp-config.json'
        ],
        server_sep: '/'
      }
    },






    /*
     * https://github.com/Luismahou/grunt-hashres
     */
    hashres: {
      // Global options
      options: {
        // Optional. Encoding used to read/write files. Default value 'utf8'
        encoding: 'utf8',
        // Optional. Format used to name the files specified in 'files' property.
        // Default value: '${hash}.${name}.cache.${ext}'
        fileNameFormat: '${hash}.${name}.${ext}',
        // Optional. Should files be renamed or only alter tshe references to the files
        // Use it with '${name}.${ext}?${hash} to get perfect caching without renaming your files
        // Default value: true
        renameFiles: true
      },

      prod: {
        options: {
        },
        // Files to hash
        src: [
          '<%= project.app_js %>/<%= project.main_js %>',
          '<%= project.app_css %>/<%= project.main_css %>'
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: ['header.php', 'footer.php'],
      }
    },





    /*
     * https://github.com/outaTiME/grunt-replace
     */
    replace: {
      prod: {
        options: {
          patterns: [
            {
              match: '/[a-z0-9]{8}.<%= project.main_js %>/g',
              replacement: '<%= project.main_js %>',
              expression: true
            },
            {
              match: '/[a-z0-9]{8}.<%= project.main_css %>/g',
              replacement: '<%= project.main_css %>',
              expression: true
            }
          ]
        },
        files: [
          {
            src: ['footer.php', 'header.php'], 
            dest: './'
          }
        ]
      }
    },






    /*
     * https://github.com/gruntjs/grunt-contrib-clean
     */
    clean: {
      prod: [
        '<%= project.app_js %>/*', 
        '<%= project.app_css %>/*'
      ],
    },









  });





  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    // 'clean:prod',
    'compass:clean',
    'compass:recompile',
    'concat:dev',
    'jshint',
    // 'replace:prod',
    'concurrent:target1'
  ]);





  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'clean:prod',
    'compass:clean',
    'compass:dist',
    'jshint',
    'uglify',
    'hashres:prod',
    'sftp-deploy',
    'replace:prod'
  ]);

};
