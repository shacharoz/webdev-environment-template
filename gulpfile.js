const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// Compile SCSS to CSS
function styles() {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("release/css"));
}

// Serve & Watch Files
function watchFiles() {
  browserSync.init({
    server: { baseDir: "./server/" },
    notify: false,
    injectChanges: false, // 🔴 Prevents unwanted injection of CSS
    reloadDebounce: 200 // ⏳ Ensures proper reloading without conflicts
  });

  gulp.watch("src/scss/**/*.scss", gulp.series(styles, (done) => {
    browserSync.reload(); // 🔄 Force full page reload instead of injecting CSS
    done();
  }));
  
  gulp.watch("release/*.html").on("change", browserSync.reload);
}

// Default Task
gulp.task("default", gulp.series(styles, watchFiles));
