import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

import { getWallet } from '../utils/wallet.js';

async function main() {
  const network = process.argv[2]
  let wallet = await getWallet(network);
  const candyMachineAddress = "64UwG8v8bV2JY8FSL7WHRHqoThDTfewXqjuCr1V8JeyR";
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
  let candyMachine = await metaplex
    .candyMachines()
    .findByAddress({ address: new PublicKey(candyMachineAddress) });
  console.log("Inserting items...")
  // Inserting items
  await metaplex.candyMachines().insertItems({
    candyMachine,
    items: [
      { name: "", uri: "0.json" }
    ]
  });
  candyMachine = await metaplex.candyMachines().refresh(candyMachine);
  console.log("Candy machine items: ", candyMachine.items)
}

try {
  main();
}
catch (e) {
  console.log("ERROR \n", e)
}