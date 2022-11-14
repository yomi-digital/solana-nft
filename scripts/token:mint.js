import { Connection, clusterApiUrl, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, getAccount, getMint, AuthorityType, createSetAuthorityInstruction } from '@solana/spl-token';

import { getWallet } from '../utils/wallet.js';

async function main() {
  const network = process.argv[2]
  console.log("Network: ", network);
  let wallet = await getWallet(network);
  console.log("Wallet address: ", wallet.publicKey.toBase58())
  // Connection
  const connection = new Connection(clusterApiUrl(network), 'confirmed');
  // Creating new empty NFT token
  const mint = await createMint(
    connection,
    wallet,
    wallet.publicKey,
    wallet.publicKey,
    0
  );
  // Getting associated account
  const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    wallet.publicKey
  );
  // Mint
  await mintTo(
    connection,
    wallet,
    mint,
    associatedTokenAccount.address,
    wallet,
    1
  );
  // Disabling future minting
  let transaction = new Transaction()
    .add(createSetAuthorityInstruction(
      mint,
      wallet.publicKey,
      AuthorityType.MintTokens,
      null
    ));
  await sendAndConfirmTransaction(connection, transaction, [wallet]);

  const accountInfo = await getAccount(connection, associatedTokenAccount.address);
  console.log("Your balance is now: ", accountInfo.amount);
  const mintInfo = await getMint(
    connection,
    mint
  );

  console.log("Mint info", mintInfo);
}

try {
  main();
}
catch (e) {
  console.log("ERROR \n", e)
}