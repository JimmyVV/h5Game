var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    prefix = require('gulp-autoprefixer');

gulp.task('minify', function() {
    gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});
gulp.task('prefix', function() {
    return gulp.src('./app/**/*.css')
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/'));
})
gulp.task('watch', function() {
    gulp.watch('app/styles/**/*.css',['prefix'])
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
gulp.task('default',['sync','watch']);
