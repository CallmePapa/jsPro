module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        //合并
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ["src/**/*.js"],
                dest: "dist/<%= pkg.name %>.js"
            }
        },
        //缩小
        uglify: {
            options: {
                banner: "/*!<%= pkg.name %> <%= grunt.template.today('dd-mm-yyyyy') %>*/\n"
            },
            dist: {
                files: {
                    "dist/<%= pkg.name %>.min.js": ["<%= concat.dist.dest %>"]
                }
            }
        },
        //单元测试
        qunit: {
            files: ["test/**/*.html"]
        },
        //linting
        jshint: {
            files: ["gruntfile.js", "src/**/*.js", "test/**/*.js"],
            options: {
                //覆盖jshint的默认选项
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        //自动化任务进行
        watch: {
            files: ["<%= jshint.files %>"],
            tasks: ["jshint", "qunit"]
        }
    });
    //依赖项
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    //任务
    grunt.registerTask("test", ["jshint", "qunit"]);
    grunt.registerTask("default", ["jshint", "qunit", "concat", "uglify"]);
};