import { exec } from "child_process";
import { networks } from '../constants/networks.js'
import { getWallet } from '../utils/wallet.js'

async function main() {
  const network = process.argv[2]
  if(network !== 'devnet') {
    console.log(`Can't request funds on ${network} network`)
    return;
  }
  let wallet = await getWallet(network)
  exec(`solana airdrop 1 ${wallet.publicKey.toBase58()} --url ${networks[network].url}`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
      }
      console.log(`${stdout}`);
  });
}

try {
  await main();
}
catch (e) {
  console.log("ERROR \n", e)
}