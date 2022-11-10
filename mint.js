import { Metaplex, keypairIdentity, bundlrStorage, toBigNumber } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

import { getWallet } from './utils/wallet.js';
import * as candyMachineV2 from './candy-machine/cache.json' assert {type:'json'};

async function main() {
  const candyMachineV2Address = candyMachineV2.default.program.candyMachine
  if(!candyMachineV2Address) {
    console.log("Empty Candy Machine V2 address")
    return;
  }
  const network = process.argv[2]
  console.log("Network: ", network);
  let wallet = await getWallet(network);
  console.log("Wallet address: ", wallet.publicKey.toBase58())
  // Instantiating metaplex 
  const connection = new Connection(clusterApiUrl(network));
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());

  const candyMachine = await metaplex
    .candyMachinesV2()
    .findByAddress({ address: new PublicKey(candyMachineV2Address) });

  const collectionUpdateAuthority = wallet.publicKey.toBase58()
  const { nft } = await metaplex.candyMachinesV2().mint({
    candyMachine,
    collectionUpdateAuthority
  });

  console.log("NFT MINTED", nft)
}

try {
  main();
}
catch (e) {
  console.log("ERROR \n", e)
}