## Requirements
You should have installed the followings CLI tools:
  - [Yarn](https://yarnpkg.com/) (or [NPM](https://docs.npmjs.com/cli/))
  - [Solana CLI Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools)


## Directory structure
- `candy-machine` contains all of your Candy Machine configuration files and assets.
- `configs` stores all of the wallets used in different networks;
- `constants` houses all of your project constant settings files;
- `utils` contains additional useful functions imported in different application files;
- `scripts` contains scripts you can run by enter `yarn task <filename> <network>`;

## Commands

### Generating a new wallet
The first thing you must do to work with Metaplex is generating a new wallet or use an existing one.
```sh
# yarn task wallet <network>
yarn task wallet devnet
```
This creates a new wallet if an old one named `devnet`.json inside the `configs` folder is not found. To force generating a new one, you can simply delete the `devnet`.json file and run the command again. 

### Candy Machine
In order to mint some ntfs on Solana using Metaplex, you need to setup a [Candy Machine](https://docs.metaplex.com/programs/candy-machine/overview). You have two ways to do that:
  - Go inside the [candy-machine](https://github.com/yomi-digital/solana-nft/tree/main/candy-machine) folder and take a look at the [README](https://github.com/yomi-digital/solana-nft/blob/main/candy-machine/README.md) to start.
  - Or you can use the tasks via the command line.


### Minting
```sh
# using Sugar CLI 
yarn mint devnet
#or
# using command line
yarn task candy-machine:create devnet
yarn task candy-machine:fill devnet
yarn task candy-machine:mint devnet
```
After you've created a Candy Machine using the Sugar CLI, this command will mint all of your NFTs inside of it.

### Tasks
You can execute any tasks you find inside the `scripts` folder using the `yarn task <filename> <network>` command.
```sh
# yarn task <network>
yarn task balance:add devnet
```

This command will add 1 SOL to the current devnet wallet address balance.

Node used version: 16.17.0