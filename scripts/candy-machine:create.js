import { Metaplex, keypairIdentity, bundlrStorage, toBigNumber, sol, toDateTime } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { writeFile } from 'node:fs/promises';
import { getWallet } from '../utils/wallet.js';

async function main() {
  const network = process.argv[2]
  let wallet = await getWallet(network);
  console.log("Wallet address: ", wallet.publicKey.toBase58())
  // Instantiating metaplex 
  const connection = new Connection(clusterApiUrl(network));
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());
  console.log("Creating NFT collection...")
  // creating collection NFT
  const { nft: collectionNft } = await metaplex.nfts().create({
    name: "YOMI",
    uri: "https://raw.githubusercontent.com/yomi-digital/solana-nft/main/example_metadata/0.json",
    updateAuthority: wallet,
    sellerFeeBasisPoints: 0,
    isCollection: true
  });

  console.log("NFT collection created at: ", collectionNft.address.toBase58())
  console.log("Creating Candy Machine...")
  // creating Candy Machine
  const candyMachineSettings = {
    authority: wallet,
    sellerFeeBasisPoints: 333,
    symbol: "",
    maxEditionSupply: toBigNumber(0),
    isMutable: true,
    creators: [
      { address: wallet.publicKey, share: 100 }
    ],
    collection: {
      address: collectionNft.address,
      updateAuthority: wallet
    },
    itemsAvailable: toBigNumber(1),
    itemSettings: {
      type: "configLines",
      prefixName: "YOMI #$ID+1$",
      nameLength: 0,
      prefixUri: "https://raw.githubusercontent.com/yomi-digital/solana-nft/main/example_metadata/",
      uriLength: 43,
      isSequential: false
    },
    guards: {
      botTax: { lamports: sol(0.01), lastInstruction: false },
      solPayment: { amount: sol(1), destination: wallet.publicKey },
      startDate: { date: toDateTime("2022-10-17T16:00:00Z") }
    },
  };
  const { candyMachine } = await metaplex.candyMachines().create(candyMachineSettings)
  console.log("Candy Machine created at: ", candyMachine.address.toBase58())
  let newWallet = {}
  newWallet.public_key = wallet.publicKey.toBase58();
  newWallet.secret_key = Object.values(wallet.secretKey);
  newWallet.candy_machine_address = candyMachine.address.toBase58();
  const data = new Uint8Array(Buffer.from(JSON.stringify(newWallet)));
  await writeFile(`./configs/${network}.json`, data);
}

try {
  main();
}
catch (e) {
  console.log("ERROR \n", e)
}