import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

import { getWallet } from '../utils/wallet.js';

async function main() {
  const network = process.argv[2]
  console.log("Network: ", network);
  let wallet = await getWallet(network);
  console.log("Wallet address: ", wallet.publicKey.toBase58())
  // Connection
  const connection = new Connection(clusterApiUrl(network), 'confirmed');
  const lamports = await connection.getBalance(wallet.publicKey);
  console.log(`Balance: ${(lamports / LAMPORTS_PER_SOL)} SOL`)
}

try {
  await main();
}
catch (e) {
  console.log("ERROR \n", e)
}