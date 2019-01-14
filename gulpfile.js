const gulp 			= require('gulp'),
	  browserSync 	= require('browser-sync'),
	  babel 		= require('gulp-babel'),
	  sass 			= require('gulp-sass'),
	  autoprefixer  = require('gulp-autoprefixer'),
	  plumber 		= require('gulp-plumber'),
	  notify 		= require('gulp-notify'),
	  jshint 		= require('gulp-jshint'),
	  cssbeautify 	= require('gulp-cssbeautify'),
	  imagemin 		= require('gulp-imagemin'),
	  svgSprite 	= require('gulp-svg-sprite'),
	  svgmin 		= require('gulp-svgmin'),
	  cheerio 		= require('gulp-cheerio'),
	  replace 		= require('gulp-replace');

const paths = {

	src: {
		index: 'src/*.html',
		styles: 'src/style/**/*.scss',
		js: 'src/js/**/*.js',
		image: 'src/image/**',
		font: 'src/fonts/**',
		svgIcon: 'src/image/static/*.svg',
		json: './products.json'
	},

	dist: {
		index: 'dist',
		styles: 'dist/assets/css',
		js: 'dist/assets/js',
		image: 'dist/assets/image',
		font: 'dist/assets/fonts',
		svgIcon: 'dist/assets/image/static',
		json: 'dist/'
	},

	watch: {
		index: 'src/*.html',
		styles: 'src/style/**/*.scss',
		js:'src/js/*.js',
		image: 'src/image/**/*.*',
		font: 'src/fonts/**/*.*'
	}

}


// browser-sync task

gulp.task('server', () => {
	browserSync.init({
    		server: { 
    			baseDir: './dist',
    			index: 'index.html'

    		}
    });
});

gulp.task('json', () => {
	return gulp.src(paths.src.json)
	.pipe(gulp.dest(paths.dist.json))
	.pipe(browserSync.stream({
		reload: true
	}));
});

// html task

gulp.task('html', () => {
	return gulp.src(paths.src.index)
	.pipe(gulp.dest(paths.dist.index))
	.pipe(browserSync.stream({
		reload: true
	}));
});


// style task 

gulp.task('styles', () => {
	return gulp.src(paths.src.styles)
	.pipe(plumber({errorHandler: notify.onError((err) => {
			return {
				title: 'sass',
				sound: 'false',
				message: err.message
			}
		})
	}))
	.pipe(sass({outputStyle: 'expanded'}))
	.pipe(autoprefixer('last 5 version', 'safari 5', 'ie >= 8',  'opera 12.1', 'ios 6', 'android 4'))
	.pipe(cssbeautify())
	.pipe(gulp.dest(paths.dist.styles))
	.pipe(browserSync.stream({
		reload: true
	}));

});

// js task

gulp.task('js', () => {
	return gulp.src(paths.src.js)
	.pipe(plumber({errorHandler: notify.onError((err) => {
			return {
				title: 'js',
				sound: 'false',
				message: err.message
			}
		})
	}))
	.pipe(babel({
          	presets: ['@babel/env']
    }))
    .pipe(jshint.reporter('Default'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream({
		reload: true
	}));
});

// images task

gulp.task('images', () => {
	return gulp.src(paths.src.image)
	.pipe(imagemin([
		    imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({
		        plugins: [
		            {removeViewBox: true},
		            {cleanupIDs: false}
		        ]
		    })
		]))
	.pipe(gulp.dest(paths.dist.image))
	.pipe(notify({message: 'Images task complite!'}))
	.pipe(browserSync.stream({
		reload: true
	}));
});

// fonts task 

gulp.task('fonts', () => {
	return gulp.src(paths.src.font)
	.pipe(gulp.dest(paths.dist.font))
	.pipe(notify({message: 'Fonts task complite!'}));
});

// svg task 

gulp.task('svg', () => {
	return gulp.src(paths.src.svgIcon)
	.pipe(plumber({errorHandler: notify.onError((err) => {
			return {
				title: 'js',
				sound: 'false',
				message: err.message
			}
		})
	}))
	//minify svg
	.pipe(svgmin({
		js2svg: {
			pretty: true
		}
	}))

	// remove all fill and style declarations in out shapes
	.pipe(cheerio({
		run: function ($) {
			$('[fill]').removeAttr('fill');
			$('[stroke]').removeAttr('stroke');
			$('[width]').removeAttr('width');
			$('[height]').removeAttr('height');
			$('[style]').removeAttr('style');
		},
		parserOptions: {xmlMode: true}
	}))

	// cheerio plugin create unnecessary string '&gt;', so replace it.
	.pipe(replace('&gt;', '>'))

	// build svg sprite
	.pipe(svgSprite({
		mode: {
			symbol: {
				sprite: "sprite.svg",
				example: true
			}
		}
	}))

	.pipe(gulp.dest(paths.dist.svgIcon));
});

// task build 

gulp.task('build', [
		'html',
		'styles',
		'js',
		'fonts',
		'images'
	]);

// watch task

gulp.task('watch', () => {

	// watch html files

	gulp.watch(paths.watch.index, ['html']);

	// watch scss files

	gulp.watch(paths.watch.styles, ['styles']);

	// watch js files

	gulp.watch(paths.watch.js, ['js']);

	// watch image files

	gulp.watch(paths.watch.image, ['images']);

	// watch font files

	gulp.watch(paths.watch.font, ['fonts']);

});

gulp.task('default', ['build', 'server', 'watch']);