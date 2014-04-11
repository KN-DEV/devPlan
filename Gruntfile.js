module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    typescript: {
        base: {
          src: ['./ts/devPlan/Init.ts'],
          dest: './assets/js/devPlan.js',
          options: {
            module: 'amd',
            target: 'es5',
     
            sourceMap: true,
            declaration: true
          }
        }
      },
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.registerTask('default', ['typescript']);

};