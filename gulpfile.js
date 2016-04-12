﻿var gulp = require('gulp');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var merge = require('merge2');
var webserver = require('gulp-webserver');
var Builder = require('systemjs-builder');
var runSequence = require('run-sequence');
var server = require('gulp-server-livereload');

var paths = {
    source: 'src',
    dest: 'bin',
    bundle: 'bundles'
};

gulp.task('hello', function () {
    console.log('HELLO!');
    console.log(Object.keys(gulp.tasks));
});

gulp.task('cleanSass', function () {
    return gulp.src(paths.dest + '/**/*.css', { read: false })
			.pipe(vinylPaths(del));
});

gulp.task('cleanViews', function () {
    return gulp.src(paths.dest + '/**/*.html', { read: false })
			.pipe(vinylPaths(del));
});

gulp.task('cleanScripts', function () {
    return gulp.src(paths.dest + '/**/*.{js,map,d.ts}', { read: false })
			.pipe(vinylPaths(del));
});

gulp.task('clean', ['cleanSass','cleanViews', 'cleanScripts']);

gulp.task('scripts', ['cleanScripts'], function () {
    var tsProject = typescript.createProject('tsconfig.json');
    
    var sourceFiles = [
        paths.source + '/**/*.ts',
        '!./bin/**/*.*',
        './typings/tsd.d.ts',
        '!./node_modules/angular2/typings/es6-collections/es6-collections.d.ts',
        '!./node_modules/angular2/typings/es6-promise/es6-promise.d.ts'
    ];

    var tsResult = gulp
        .src(sourceFiles)
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject));

    return merge(
        [
            tsResult.js
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(paths.dest)),
            tsResult.dts
                .pipe(gulp.dest(paths.dest))
        ]);
});

gulp.task('copyRootFiles', ['scripts'], function() {
    return gulp.src([
            paths.dest + '/fuel-ui.js',
            paths.dest + '/fuel-ui.d.ts',
            paths.dest + '/styles/fuel-ui.js'
        ])
        .pipe(gulp.dest('.'));
});

gulp.task('bundle', ['copyRootFiles','scripts', 'sass'], function() {    
    // copy
    
    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder('./', './builderConfig.js');
    
    return builder
        //.buildStatic(paths.dest+'/fuel-ui.js', 'fuel-ui.js')
        .bundle(paths.dest+'/fuel-ui.js', paths.bundle+'/fuel-ui.js')
        .then(function() {
            console.log('bundle complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('views', ['cleanViews'], function () {
    return gulp.src(paths.source + '/**/*.html')
        .pipe(gulp.dest(paths.dest));
});

gulp.task('sass', ['cleanSass'], function () {
    return gulp.src(paths.source + '/**/*.{scss,sass}')
        //.pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({
            errLogToConsole: true
        }).on('error', sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest));

});

gulp.task('serve', function(){
	gulp.src('./')
		.pipe(server({
			livereload: {
				enable: true,
				filter: function(filePath, cb) {
					cb( 
						/bin\/[^\/]*\.js$/.test(filePath) &&
						!(/node_modules/.test(filePath)) &&  
						!(/.*ts$/.test(filePath)) && 
						!(/gulpfile.js$/.test(filePath))
					);
				}
			},
			defaultFile: 'index.html',
			open: true
		}));
});

gulp.task('watch', function () {
    gulp.watch(paths.source+'/**/*.*', ['scripts']);
});

gulp.task('build', ['cleanSass', 'cleanScripts', 'cleanViews', 'sass', 'views', 'scripts']);

gulp.task('default', function(){
	runSequence(
		'build',
		'serve',
		'watch'
	);
});
