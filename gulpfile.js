var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var browserSync = require('browser-sync');
var paths = {
    pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}

gulp.task('bundle', ['copy-html'], bundle);

//gulp.task("default", ["copy-html"], bundle);

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', ['watch'], function () {
    return browserSync({
        server: {
            baseDir: './dist'
        },
        port: 3005
    });
});

gulp.task('watch', ['bundle'], function () {
    var watcher = gulp.watch('./src/**/*', ['refresh']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('refresh', ['bundle'], browserSync.reload);

//watchedBrowserify.on("update", bundle);
//watchedBrowserify.on("log", gutil.log);