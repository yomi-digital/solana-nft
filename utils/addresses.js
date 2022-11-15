import bs58 from 'bs58';

export const addressToBytes = async (address) => {
let bytes
try {
  bytes = bs58.decode(address)
}
catch (e) {
  console.log("ERROR \n", e)
}
return bytes

}
