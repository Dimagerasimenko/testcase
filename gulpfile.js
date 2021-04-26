const {src, dest, parallel, series, watch} = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    scss = require('gulp-sass'),
    less = require('gulp-less'),
    autopref = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    del = require('del');

let preprocessor = "scss";


const browserSync = require('browser-sync').create();//создается новое подключение

function browsersync() {
    browserSync.init({
        server: {
            baseDir: `app/`
        },
        notify: false,
        online: true
    })
}

// функция к-я обрабатывает скрипты проекта
//в случае подключение какого либо фреймворка "app/js/index.js", дб всегда в конце чтобы можно было пользоваться библиотеками
function scripts() {
    return src([
            "node_modules/jquery/dist/jquery.min.js",
            "app/js/index.js"
        ]
    )
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream())

}


function styles() {
    return src(`app/${preprocessor}/main.${preprocessor}`)
        .pipe(eval(preprocessor)())
        .pipe(concat('app.min.css'))
        .pipe(autopref({overrideBrowserlist: ['last 10 versions'], grid: true}))
        .pipe(cleancss(({level: {1: {specialComments: 0}}, /*format: 'beautify'*/})))
        .pipe(dest('app/css/'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/img/src/**/*')
        .pipe(newer('app/img/dest/'))
        .pipe(imagemin())
        .pipe(dest('app/img/dest'))
}

function cleanImgDest() {
    return del('app/img/dest/**/*', {force: true})
}


function cleanBuildDist() {
    return del('dist/**/*')
}

function build() {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*min.js',
        'app/img/dest/**/*',
        'app/**/*.html'], {base: 'app'})
        .pipe(dest('dist'))
}

function startWatch() {
    watch([`app/**/${preprocessor}/**/*`], styles);
    watch(['app/js/**/*.js', '!app/js/**/*.min.js'], scripts);
    watch(`app/**/*.html`).on('change', browserSync.reload);
    watch('app/img/src/', images);
}

// server: {base: 'app/'} задание корневой папки
//notify: false отключение уведумлений
//online отвечает за обращение к wifi
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.imgmin = images;
exports.delimgdest = cleanImgDest;
exports.delbuild = cleanBuildDist;
exports.build = series(cleanBuildDist, styles, scripts, images, build);
exports.default = parallel(styles, scripts, browsersync, startWatch);
