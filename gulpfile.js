const gulp = require('gulp');
const sass = require('gulp-sass');
const browser = require("browser-sync");
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');

// ローカルサーバを起動
gulp.task("server", function (done) {
  browser({
    server: {
      baseDir: "./public"
    }
  });
  done();
});

// ブラウザのリロードを行う
gulp.task("reload", function (done) {
  browser.reload();
  done();
});

// scss のビルドを行う
gulp.task('build', function (done) {
  const plugins = [
    autoprefixer({ cascade: false }),
  ];

  gulp.src('./src/sass/app.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./public/css'));
  done();
});

// ファイルの変更を監視する
gulp.task('survey', function (done) {
  gulp.watch('./src/sass/**/*.scss', gulp.parallel(['build', 'reload']));
  gulp.watch('./public/index.html', gulp.series(['reload']));
  done();
});

// ビルド / ファイル監視 / サーバ起動
gulp.task('watch', gulp.series(gulp.parallel(['build', 'survey', 'server'])));
