var nexe = require('nexe');
let path = require('path');

nexe.compile({
   input: 'server.js',
   output: path.join(__dirname, 'build', `setupServerTestJig_v2_08_08`),
   nodeVersion: '8.9.4',
   nodeTempDir: 'src',
   //python: 'D:/Python01',
   flags: true,
   loglevel: 'verbose'
}, function(err) {
   console.log(err);
});
