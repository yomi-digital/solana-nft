import { getWallet } from '../utils/wallet.js'

async function main() {
  const network = process.argv[2]
  let wallet = await getWallet(network)
  console.log("Your wallet: ", wallet)
}

try {
  await main();
}
catch (e) {
  console.log("ERROR \n", e)
}