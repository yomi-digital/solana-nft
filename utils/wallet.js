import { readFile, copyFile, writeFile } from 'node:fs/promises';
import { Keypair } from "@solana/web3.js";

export const getWallet = async (network) => {
  let wallet = {}
  try {
    // Reading from existent wallet json file
    wallet = await readFile(`./configs/${network}.json`, { encoding: 'utf8' });
    wallet = Keypair.fromSecretKey(new Uint8Array(JSON.parse(wallet).secret_key))
  }
  catch {
    // Creating new wallet
    console.log(`Configuration not found. Creting new ${network} wallet...`);
    const newWallet = Keypair.generate();
    wallet.public_key = newWallet.publicKey.toBase58();
    wallet.secret_key = Object.values(newWallet.secretKey);
    await copyFile('./configs/example.json', `./configs/${network}.json`);
    const data = new Uint8Array(Buffer.from(JSON.stringify(wallet)));
    await writeFile(`./configs/${network}.json`, data);
    wallet = newWallet
  }
  return wallet
}