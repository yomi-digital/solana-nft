import fs from 'fs';
import { exec } from "child_process";

let scriptFile
let task = process.argv[2]
let network = process.argv[3]
async function run() {
  exec(`node ${scriptFile} ${network}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    console.log(`${stdout}`);
  });
}

if (task && network) {
  console.log("Network: ", network)
  if (fs.existsSync('./scripts/' + task + '.js')) {
    scriptFile = './scripts/' + task + '.js'
    run();
  } else {
    console.log('Can\'t find task: ' + './scripts/' + task + '.js')
  }
} else {
  console.log('Can\'r run task, please use script like `yarn task balance:get devnet`.')
}

