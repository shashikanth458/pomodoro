var gulp = require('gulp'),
		gutil = require('gulp-util'),
		gsass = require('gulp-sass');

gulp.task('log',function(){
	'use strict';
	gutil.log('Iam from util logs');
});
gulp.task('sass',function(){
	'use strict';
	return gulp.src('./dev-www/assets/css/pomodoro.scss')
					.pipe(gsass().on('error',gsass.logError))
					.pipe(gulp.dest('./www/assets/css'));
});
gulp.task('default',['sass']);
