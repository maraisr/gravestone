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
    return gulp.src('./src/public/**/[^_]*.pug')
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

gulp.task('scss', function () {
	return gulp.src('./src/public/assets/scss/entry.scss')
		.pipe(plumberError())
		.pipe($.sass({
			importer: require('sass-module-importer')()
		}))
		.pipe($.postcss((function (res) {
			res.push(require('autoprefixer')({
				browsers: ['last 1 version'],
				cascade: false,
				add: true
			}));

			if (process.env.NODE_ENV == 'production') {
				res.push(require('cssnano')({
					discardComments: {
						removeAll: true
					}
				}))
			}

			return res;
		})([])))
		.pipe($.rename({ basename: 'main' }))
		.pipe(gulp.dest('./dist/'))
		.pipe($.connect.reload());
});

// Build process
gulp.task('watch', function () {
    $.webpack(require('./webpack.config.js'))
        .watch({
            aggregateTimeout: 300,
            poll: true
        }, webpackCallback);

    gulp.watch('./src/public/**/*.pug', ['pug']);
	gulp.watch('./src/public/assets/scss/**/*', ['scss']);
});

// Compile
gulp.task('build', function (done) {
    $.env.set({
        NODE_ENV: 'production'
    });

    $.sequence(['webpack', 'pug', 'scss'], done);
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
