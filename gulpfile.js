var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'webpack']
    }),
    gutil = require('gulp-util'),
    _ = require('lodash');

function webpackCallback(err, stats) {
    if (err) throw $.notify(err);

    gutil.log("[webpack]", stats.toString({
        colours: true,
        progress: true
    }));
}

function plumberError() {
	return $.plumber({ errorHandler: $.notify.onError("Error: <%= error.message %>") })
}

// Main tasks
gulp.task('pug', function () {
    return gulp.src('./app/pages/**/*.pug')
		.pipe(plumberError())
        .pipe($.pug())
        .pipe(gulp.dest('./dist/'))
		.pipe($.connect.reload());
});

gulp.task('webpack', function (done) {
    $.webpack(require('./webpack.config.js'))
        .run(function (err, stats) {
            webpackCallback(err, stats);

            done();
        });
});

// Build process
gulp.task('watch', function () {
    $.webpack(require('./webpack.config.js'))
        .watch({
            aggregateTimeout: 300,
            poll: true
        }, webpackCallback);

    gulp.watch('./app/pages/**/*.pug', ['pug']);
});

// Compile
gulp.task('build', function (done) {
    $.env.set({
        NODE_ENV: 'production'
    });

    $.sequence(['webpack', 'pug'], done);
});

// Dev server
gulp.task('serve', function () {
    $.connect.server({
        livereload: true,
        port: process.env.PORT || 3303,
        root: ['./dist/']
    });
});

gulp.task('default', ['watch', 'serve']);
