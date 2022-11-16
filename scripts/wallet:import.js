import { readFile, copyFile, writeFile } from 'node:fs/promises';
import { Keypair } from "@solana/web3.js";

import { addressToBytes } from '../utils/addresses.js'

async function main() {
  const network = process.argv[2]
  const private_key = process.argv[3]
  if(!private_key) {
    console.log("Invalid private key")
    return;
  }
  try {
    await readFile(`./configs/${network}.json`, { encoding: 'utf8' });
    console.log(`ERROR: Wallet ./configs/${network}.json already exists`);
  }
  catch {
    // Creating new wallet
    let bytes = await addressToBytes(private_key)
    let newWallet = Keypair.fromSecretKey(bytes)
    let wallet = {}
    console.log(`Creting new ${network} wallet...`);
    wallet.public_key = newWallet.publicKey.toBase58();
    wallet.secret_key = Object.values(newWallet.secretKey);
    wallet.candy_machine_address = "";
    await copyFile('./configs/example.json', `./configs/${network}.json`);
    const data = new Uint8Array(Buffer.from(JSON.stringify(wallet)));
    await writeFile(`./configs/${network}.json`, data);
    console.log("Wallet imported");
  }
}

try {
  await main();
}
catch (e) {
  console.log("ERROR \n", e)
}