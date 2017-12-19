var nexe = require('nexe');

nexe.compile({
   input: 'index.js',
   output: 'D:/Desktop/Syft/syft-test-jig-node/setup',
   nodeVersion: '6.11.4',
   nodeTempDir: 'src',
   python: 'D:/Python01',
   flags: true
   //loglevel: 'verbose'
}, function(err) {
   console.log(err);
});