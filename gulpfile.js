'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var pug = require('gulp-pug');
var cached = require('gulp-cached');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('pug', function () {
  return gulp.src('source/pug/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(plumber.stop())
    .pipe(cached('pug'))
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('script', function () {
  return gulp.src('source/js/*.js')
    .pipe(gulp.dest('build/js'));
});

var vendorsScripts = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
  'node_modules/flickity/dist/flickity.pkgd.min.js',
  'node_modules/slick-carousel/slick/slick.min.js'
];

gulp.task('vendor', function (cb) {
  return vendorsScripts.length
    ? gulp.src(vendorsScripts)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('build/js/vendor'))
    : cb();
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/**/*.pug', gulp.series('pug', 'refresh'));
  gulp.watch('source/js/**/*.js', gulp.series('script', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))

    .pipe(gulp.dest('source/img'));

});

gulp.task('webp', function () {
  return gulp.src('source/img/content/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('source/img/content'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/svg/{icon-*,htmlacademy*}.svg')
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite_auto.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('spritePNG', function () {
  var spriteData = gulp.src('source/img/sprite/png/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../img/sprite/sprite.png',
    cssName: 'sprite.scss',
    padding: 5,
    cssVarMap: function (sprite) {
      sprite.name = 'icon-' + sprite.name;
    }
  }));

  // Оптимизируем спрайт
  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/sprite/'));

  // Собираем SCSS
  var cssStream = spriteData.css
    .pipe(gulp.dest('source/sass/utils/'));

  return merge(imgStream, cssStream);
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/content/**',
    'source/img/*.{png, jpg}',
    'source//*.ico'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series('clean', 'webp', 'css', 'sprite', 'pug', 'script', 'spritePNG', 'vendor', 'copy'));
gulp.task('start', gulp.series('build', 'server'));
