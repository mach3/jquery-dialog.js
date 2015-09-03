
module.exports = function(grunt){

	require("load-grunt-tasks")(grunt);

	var banner = grunt.template.process(
		grunt.file.read("src/banner.js"),
		{data: grunt.file.readJSON("package.json")}
	);

	grunt.initConfig({
		uglify: {
			build: {
				options: {banner: banner},
				files: {
					"dist/jquery-dialog.min.js": ["src/jquery-dialog.js"]
				}
			}
		},
		concat: {
			build: {
				options: {banner: banner},
				files: {
					"dist/jquery-dialog.js": ["src/jquery-dialog.js"]
				}
			}
		}
	});

	grunt.registerTask("default", []);
	grunt.registerTask("build", ["uglify", "concat"]);

};
