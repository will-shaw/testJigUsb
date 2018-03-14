var nexe = require('nexe');

nexe.compile({
   input: 'server.js',
   output: 'C:/Users/thales.priolli/Documents/TestJigServer/setupServerTestJig',
   nodeVersion: '8.9.4',
   nodeTempDir: 'src',
   //python: 'D:/Python01',
   flags: true,
   loglevel: 'verbose'
}, function(err) {
   console.log(err);
});