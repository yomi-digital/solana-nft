import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

import { getWallet, getCandyMachineAddress } from '../utils/wallet.js';

async function main() {
  const network = process.argv[2]
  let wallet = await getWallet(network);
  let candyMachineAddress = await getCandyMachineAddress(network)
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
  const collectionUpdateAuthority = wallet.publicKey.toBase58()
  const { nft } = await metaplex.candyMachines().mint({
    candyMachine,
    collectionUpdateAuthority
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