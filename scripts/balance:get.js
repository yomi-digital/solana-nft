import { exec } from "child_process";
import { networks } from '../constants/networks.js'
import { getWallet } from '../utils/wallet.js'

async function main() {
  const network = process.argv[2]
  let wallet = await getWallet(network)
  console.log("Getting current balance...")
  exec(`solana balance ${wallet.publicKey.toBase58()} --url ${networks[network].url}`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
      }
      console.log(`Current ${wallet.publicKey.toBase58()} balance is ${stdout}`);
  });
}

try {
  await main();
}
catch (e) {
  console.log("ERROR \n", e)
}