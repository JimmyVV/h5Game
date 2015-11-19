var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    prefix = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    autoprefix = require('autoprefixer'),
    flexpost  = require('postcss-flexboxfixer');

gulp.task('minify', function() {
    gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});
gulp.task('prefix', function() {
     var processors = [  //这里就是中间件
      //已经require("autoprefixer");
      autoprefix({browsers:['last 2 version']}),
                flexpost
        ];
    return gulp.src('./app/**/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('app/'));
})

gulp.task('watch', function() {
    gulp.watch('app/styles/**/*.css', ['prefix'])
})
gulp.task('sync', function() {
    var files = [
        'app/**/*.html',
        'app/styles/**/*.css',
        'app/img/**/*.png',
        'app/js/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './app'
        }
    });
});
gulp.task('copy', function() {
    gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('../h5Games/js'));
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('../h5Games/views'));
    gulp.src('app/styles/**/*.css')
        .pipe(gulp.dest('../h5Games/styles'));
    gulp.src('app/img/**/*.png')
        .pipe(gulp.dest('../h5Games/img'));
})
gulp.task('copyJS', function() {
    gulp.watch('app/js/**/*.js', function(event) {
        gulp.src('app/js/**/*.js')
            .pipe(gulp.dest('../h5Games/js'));
    });
})
gulp.task('default', ['sync', 'watch']);
