import { Metaplex, keypairIdentity, bundlrStorage, toBigNumber } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";

import { getWallet } from './utils/wallet.js';


async function main() {
  const network = process.argv[2]
  console.log("Network: ", network);
  let wallet = await getWallet(network);
  console.log("Wallet address: ", wallet.publicKey.toBase58())
  // Instantiating metaplex 
  const connection = new Connection(clusterApiUrl(network));
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());

    // WIP
}

try {
  main();
}
catch (e) {
  console.log("ERROR \n", e)
}