import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

import { getWallet } from '../utils/wallet.js';

async function main() {
  const network = process.argv[2]
  let wallet = await getWallet(network);
  const candyMachineAddress = "8qToifCxqeVFWGvda55ycuQPHXMrpT1ctAoK3725a9gX";
  if (!candyMachineAddress) {
    console.log("Candy Machine address is empty")
    return;
  }
  console.log("Wallet address: ", wallet.publicKey.toBase58())
  // Instantiating metaplex 
  const connection = new Connection(clusterApiUrl(network));
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());
  // Fetching Candy Machine
  console.log("Fetching candy machine...")
  const candyMachine = await metaplex
    .candyMachines()
    .findByAddress({ address: new PublicKey(candyMachineAddress) });
  // minting
  console.log("Minting...")
  const { nft } = await metaplex.candyMachines().mint({
    candyMachine,
    wallet
  });
  console.log("Minted successfully!", nft)
  console.log(candyMachine.items[0].name)
}

try {
  main();
}
catch (e) {
  console.log("ERROR \n", e)
}