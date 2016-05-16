var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'webpack']
    }),
    gutil = require('gulp-util'),
    _ = require('lodash');

function webpackCallback(err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);

    gutil.log("[webpack]", stats.toString({
        colours: true,
        progress: true
    }));
}

gulp.task('pug', function () {
    return gulp.src('./app/pages/**/*.pug')
        .pipe($.pug())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('webpack', function (done) {
    $.webpack(require('./webpack.config.js'))
        .run(function (err, stats) {
            webpackCallback(err, stats);

            done();
        });
});

gulp.task('default', function () {
    $.webpack(require('./webpack.config.js'))
        .watch({
            aggregateTimeout: 300,
            poll: true
        }, webpackCallback);

    gulp.watch('./app/pages/**/*.pug', ['pug']);
});

gulp.task('build', function (done) {
    $.env.set({
        NODE_ENV: 'production'
    });

    $.sequence(['webpack', 'pug'], done);
});