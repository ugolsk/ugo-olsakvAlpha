var gulp         = require('gulp');
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    uglifyCss    = require('gulp-uglifycss'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin     = require('gulp-imagemin');

var autoprefixerOptions = {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
};

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
          baseDir: 'app'
        }
    });
});

gulp.task('sass', function() {
  return gulp.src('app/sass/main.scss')
          .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
          .pipe(sass())
          .pipe(autoprefixer(autoprefixerOptions))
          .pipe(gulp.dest('app/css'))
          .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/sass/main.scss', ['sass']);
    gulp.watch('app/index.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});

/**

END OF PROD

Min all files and compress images

**/

gulp.task('concat-min-js', function() {
  return gulp.src('app/js/*.js')
           .pipe(concat('main.min.js'))
           .pipe(uglify())
           .pipe(gulp.dest('app/js'));
});

gulp.task('concat-min-css', function() {
  return gulp.src('app/css/*.css')
           .pipe(concat('main.min.css'))
           .pipe(uglifyCss())
           .pipe(gulp.dest('app/css'));
});

gulp.task('images', () =>
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img'))
);

gulp.task('compress-min', ['concat-min-js', 'concat-min-css', 'images']);
