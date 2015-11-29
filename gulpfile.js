var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    prefix = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    autoprefix = require('autoprefixer'),
    flexpost = require('postcss-flexboxfixer'),
    rename = require('gulp-rename');

gulp.task('minify', function() {
    gulp.src('app/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/'))
});
gulp.task('prefix', function() {
    var processors = [ //这里就是中间件
        //已经require("autoprefixer");
        autoprefix({
            browsers: ['last 3 Safari versions',"last 2 Explorer versions",'last 2 Explorer versions',"iOS 5"]
            ,cascade:true,
            remove:true
        }),
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
        'app/**/upload.html',
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
    gulp.src('app/index.html')
        .pipe(rename("index.ejs"))
        .pipe(gulp.dest('../h5Games/views'));
    gulp.src('app/upload.html')
        .pipe(rename("upload.ejs"))
        .pipe(gulp.dest('../h5Games/views'));
    gulp.src('app/redict.html')
        .pipe(rename("redict.ejs"))
        .pipe(gulp.dest('../h5Games/views'));
    gulp.src('app/styles/**/*.css')
        .pipe(gulp.dest('../h5Games/styles'));
    gulp.src('app/img/**/*.png')
        .pipe(gulp.dest('../h5Games/img'));
})
gulp.task('copyJS', function() {
    gulp.watch(['app/js/**/*.js', 'app/styles/**/*.css'], function(event) {
        gulp.src('app/js/**/*.js')
            .pipe(gulp.dest('../h5Games/js'));
        gulp.src('app/styles/**/*.css')
            .pipe(gulp.dest('../h5Games/styles'));
            gulp.src('app/index.html')
                .pipe(rename("index.ejs"))
                .pipe(gulp.dest('../h5Games/views'));
    });
})
gulp.task('default', ['sync', 'watch']);
