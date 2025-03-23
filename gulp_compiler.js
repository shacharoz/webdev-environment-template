const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

// Compile SCSS into CSS
function styles() {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("release/css"))
    .pipe(browserSync.stream());
}

// Copy JS to release folder
function scripts() {
  return gulp.src("src/js/**/*.js").pipe(concat("script.js")).pipe(gulp.dest("release/js"));
}

// Watch files for changes
function watchFiles() {
  browserSync.init({
    server: { baseDir: "release" },
    notify: false,
  });

  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/js/**/*.js", scripts).on("change", browserSync.reload);
  gulp.watch("release/*.html").on("change", browserSync.reload);
}

// Build task
gulp.task("build", gulp.parallel(styles, scripts));

// Default task
gulp.task("default", gulp.series("build", watchFiles));
