var cluster = require('cluster');
var os = require('os');

if (cluster.isMaster) {
  var cpus = os.cpus();
  cpus.map(cpu => {
    cluster.fork();
  });

  cluster.on('listening', (worker) => {
    console.log("worker", worker.process.pid);
  });

  cluster.on('exit', (worker) => {
    console.log("worker %d desconectado", worker.process.pid);
    cluster.fork();
  });

} else {
  require("./index.js");
}