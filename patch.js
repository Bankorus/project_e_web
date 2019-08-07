const fs = require('fs');


function patchAngular() {
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

  fs.writeFile(f, result, 'utf8', function (err) {
    if (err) return console.log(err);
    console.log("complet patch angular");
  });
});
}

function patchWeb3() {
const f1 = 'node_modules/@types/web3/index.d.ts'

fs.readFile(f1, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/export = Web3;/g, 'export default Web3;');

  fs.writeFile(f1, result, 'utf8', function (err) {
    if (err) return console.log(err);
    console.log("complete patch web3");
  });
});
}

patchAngular();
patchWeb3();
