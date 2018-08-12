const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('sass');
const reload      = browserSync.reload;
const path = require('path');
const src = {
    scss: '**/*.scss',
    html: './*.html',
};

const args = process.argv.slice(0);
console.log(args);


// Compile sass into CSS
const sassTask = exports.sass = (done) => {
    const config = {
        file: path.join(__dirname, './main.scss'), 
       // outFile: path.join(__dirname, './style.css'), 
        outputStyle: 'expanded'
    };
    console.log(config);
    sass.renderSync(config);
    done();
};

// Static Server + watching scss/html files
const serveTask = exports.serve = () => {
    browserSync.init({
        open: false,
        server: '.',
//        port: 9000,
//        ui: {port: 9001},
//        host: '127.0.0.1'
    });

    gulp.watch(src.scss, gulp.parallel(sassTask))
      .on('change', () => reload({stream: true}));
    gulp.watch(src.html)
      .on('change', reload);
};

exports.default = serveTask;