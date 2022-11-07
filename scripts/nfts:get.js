import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";

import { getWallet } from '../utils/wallet.js'

async function main() {
  const network = process.argv[2]
  let wallet = await getWallet(network)
  // Instantiating metaplex 
  const connection = new Connection(clusterApiUrl(network));
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());
  // Fetching all NFTs
  const myNfts = await metaplex.nfts().findAllByOwner({
    owner: metaplex.identity().publicKey
  });
  console.log("NFTS: ", myNfts)
}

try {
  await main();
}
catch (e) {
  console.log("ERROR \n", e)
}