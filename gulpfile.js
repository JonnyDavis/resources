let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch');
let gulpSequence = require('gulp-sequence');
let concat = require('gulp-concat');
let jsmin = require('gulp-jsmin');
let tabify = require('gulp-tabify');
let browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    var stream = gulp.src('./scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename('styles.css'));
    return stream;
});

gulp.task('minify-css', () => {
  return gulp.src('css/styles.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./css/'));
});


gulp.task('styles', function(callback){ 
	gulpSequence('sass', 'minify-css')(callback)
});

gulp.task('rebuild-then-reload', ['styles'], function (done) {
	browserSync.reload();
	done();
});


gulp.task('compile_js', function(){
		gulp.src('./scripts/*.js')
			.pipe(jsmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('js'));
});


gulp.task('default', function () {
  return gulp.src('./app/**.*.js')
    .pipe(tabify(4, true))
    .pipe(gulp.dest('./app'));
});



gulp.task('watch', function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch('./scss/*.scss', ['styles']);
	gulp.watch('./scripts/*.js', ['compile_js']);
	gulp.watch(['./scss/*.scss', './*.html', './*.js'], ['rebuild-then-reload']);
});