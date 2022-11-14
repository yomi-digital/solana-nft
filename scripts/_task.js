import fs from 'fs';
import { execSync } from "child_process";

let scriptFile
let task = process.argv[2]
let network = process.argv[3]
async function run() {
  execSync(`node ${scriptFile} ${network}`, { stdio: 'inherit' });
  console.log('All done, exiting!')
  process.exit();
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

