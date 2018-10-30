var nexe = require('nexe');
let path = require('path');
const pkg = require('./package.json');

nexe.compile({
   input: 'server.js',
   output: path.join(__dirname, 'build', `setupServerTestJig_v${pkg.version}`),
   nodeVersion: '8.9.4',
   nodeTempDir: 'src',
   //python: 'D:/Python01',
   flags: true,
   loglevel: 'verbose'
}, function(err) {
   console.log(err);
});
