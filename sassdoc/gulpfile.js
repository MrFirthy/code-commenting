var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: '*',
        camelize: true
    });

// Configuration
// -----------------------------------------------------------------------------
var basePaths = {
        src: 'src/',
        dist: 'dist/'
    },
    config = {
        sass: {
            glob: [basePaths.src + 'sass/**/*.s{a,c}ss'],
            output: basePaths.dist + 'css',
            options: {
                paths: {
                    /* Allow SCSS files to import Bootstrap SASS */
                    includePaths: [
                        'sass/base/',
                        'sass/layout',
                        'sass/utils'
                    ]
                },
                renaming: { suffix: ".min" }
            }
        },
    };

/* -----------------------------------------------------------------------------
 * Function - sass
 * Compiles SASS files into CSS in the dist/ directory
 * -------------------------------------------------------------------------- */
gulp.task('sass', function() {
    return gulp.src(config.sass.glob)
        .pipe($.sass(config.sass.options.paths).on("error", $.notify.onError(function(error) {
            return "SCSS could not be compiled: " + error.message;
        })))
        .pipe($.rename(config.sass.options.renaming))
        .pipe(gulp.dest(config.sass.output));
});

/* -----------------------------------------------------------------------------
 * Task - sassdoc
 * Generate sassdoc documentation and output it to static/consumer/sassdoc
 * -------------------------------------------------------------------------- */
gulp.task('sassdoc', function() {
    var options = {
        dest: basePaths.dist + 'sassdoc',
        verbose: true,
        display: {
            access: ['public', 'private'],
            alias: true,
            watermark: false,
        },
        groups: {
            colours: 'Colours',
            breakpoints: 'Breakpoints',
            mixins: 'Mixins'
        },
        basePath: 'https://github.com/MrFirthy/code-commenting/tree/master/src/sass',
    };

    return gulp.src(config.sass.glob)
        .pipe($.sassdoc(options));
});

/* -----------------------------------------------------------------------------
 * Task - watch
 * Generate CSS and sassdoc documentation when a SASS file is changed
 * -------------------------------------------------------------------------- */
gulp.task('watch', function() {
    gulp.watch(config.sass.glob, ['sass', 'sassdoc']);
});

gulp.task('start', ['sass', 'sassdoc', 'watch']);

gulp.task('default', ['start']);
