const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile SCSS to CSS
function styles() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('release'))
        .pipe(browserSync.stream());
}

// Move HTML and JS files to release folder
function copyFiles() {
    return gulp.src(['release/index.html', 'release/js/**/*.js'])
        .pipe(gulp.dest('release'))
        .pipe(browserSync.stream());
}

// Watch for file changes
function watchFiles() {
    browserSync.init({
        server: { baseDir: 'release' }
    });
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('release/js/**/*.js', copyFiles);
    gulp.watch('release/index.html', copyFiles);
}

// Default task
exports.default = gulp.series(styles, copyFiles, watchFiles);
