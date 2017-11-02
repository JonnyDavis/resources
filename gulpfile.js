let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch');
let gulpSequence = require('gulp-sequence');
let concat = require('gulp-concat');
let jsmin = require('gulp-jsmin');

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


gulp.task('watch', function () {
	gulp.watch('./scss/*.scss', ['styles']);
});


// Compile and minify js

gulp.task('default', ['compile_js']);

gulp.task('compile_js', function(){
	gulp.watch("./scripts/*.js", function(){
		gulp.src('./scripts/*.js')
			.pipe(jsmin())
			.pipe(concat('min.js'))
			.pipe(gulp.dest('js'));
	});
});

let tabify = require('gulp-tabify');
 
gulp.task('default', function () {
  return gulp.src('./app/**.*.js')
    .pipe(tabify(4, true))
    .pipe(gulp.dest('./app'));
});