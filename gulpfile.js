/**
 * Created by zhangxin on 2018/6/15.
 */
var  gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    imgmin = require('gulp-imagemin'),
    jshint=require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    rename = require("gulp-rename"),
    htmlmin = require('gulp-htmlmin');
/**
 * 贮备
 * @type {[*]}
 */
var loadArr = ['minhtml','sass','mincss','minjs','imgmin','copy'],
    themeName = "theme";
var path={
    input:{
        html:['src/html/*.html'],
        font:['src/css/font/**'],
        js:['src/js/**/*.js'],
        css:['src/css','src/css/*.css'],
        sass:['src/sass/**/*.scss'],
        image:['src/images/**'],
        resource:['src/vendor/**/**']
    },
    output:{
        font: themeName + '/css/font',
        html: themeName + '/html',
        js: themeName + '/js',
        css: themeName + '/css',
        img: themeName + '/images',
        resource: themeName + '/vendor'
    },
    del:{
        font: themeName + '/css/font',
        html: themeName + '/html',
        js: themeName + '/js',
        css: themeName + '/css',
        img: themeName + '/images',
        resource: themeName + '/vendor'
    }
};
//HTMl 压缩
gulp.task('minhtml',function(){
    var options = {
        removeComments: false,//清除HTML注释
        collapseWhitespace: false,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        minifyJS: false,//压缩页面JS
        minifyCSS: false//压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .on('error',function(error){
            console.log(error.message);
        })
        .pipe(gulp.dest(path.output.html))

});
// sass 编译
gulp.task('sass', function () {
    return gulp.src(path.input.sass)
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest(path.input.css[0]))
});
// css 压缩
gulp.task('mincss',function(){
    return  gulp.src(path.input.css[1])
        .pipe(gulp.dest(path.output.css))
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.output.css))
});
// JS 压缩并混淆加密
gulp.task('minjs',function(){
    var jshintConfig={
        asi:true,//忽略缺少;
        strict:false,//不使用严格模式
        eqnull:true,
        eqeqeq: false
    };

    gulp.src(path.input.js)
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter(stylish))
        .pipe(gulp.dest(path.output.js))
        // .pipe(uglify())
        // .pipe(rename({suffix: '.min'}))
        // .on('error',function (error) {
        //     console.log(error.message)
        // })
        // .pipe(gulp.dest(path.output.js))
});
// JS 语法检查
function Jshit(){
    gulp.src(path.input.js)
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(concat('allindex.js'))
        .pipe(gulp.dest(path.output.js))
}
gulp.task('jshint', Jshit);
// 图片压缩

gulp.task('imgmin',function(){
    return  gulp.src(path.input.image)
        .pipe(imgmin([
            imgmin.gifsicle({interlaced: true}),
            imgmin.jpegtran({progressive: true}),
            imgmin.optipng({optimizationLevel: 5}),
            imgmin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest(path.output.img))
});
// 文件copy
function file_copy(){
    gulp.src(path.input.resource)
        .pipe(gulp.dest(path.output.resource))
}
gulp.task('copy',file_copy);
// 文件清除，用于每次连续生成DEV的时候，清除原来的
function del_file(path){
    return  del([path])
}
gulp.task('clean',function(){
    del_file(themeName + '/');
});
/*
 * 实时刷新  connect+watch
 * 不能自动打开浏览器
 *
 * */
gulp.task('connect',function(){
    connect.server({
        root:'src',
        port:9090,
        livereload:true
    });
});
gulp.task('allfile', function () {
    gulp.src('src/**')
        .pipe(connect.reload());
});
gulp.task('watch',function(){
    gulp.watch('src/**',['allfile']);
});
gulp.task('liveport',['connect','watch']);
//   实时监听 browser  支持浏览器窗口弹出
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src/",
            directory: true  // 是否打开文件目录
        }
    });
    gulp.watch("src/**", loadArr);
    gulp.watch("src/**").on('change', browserSync.reload);

});
gulp.task('default',loadArr);