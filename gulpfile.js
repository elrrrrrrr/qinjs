var gulp = require('gulp'),
    uglify = require('gulp-uglify');

var paths = {
    js: ['qin.js']
}

gulp.task('compress', function() {
  gulp.src('qin.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('default', function() {
    gulp.watch(paths.js, ['compress'])
})

