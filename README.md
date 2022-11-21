## Requirements
You should have installed:
  - [Node](https://nodejs.org/it/download/) (18.12.1 recommended)
  - [Yarn](https://yarnpkg.com/) (or [NPM](https://docs.npmjs.com/cli/))


## Directory structure
- `configs` stores all of the wallets used in different networks;
- `constants` contains all of your project constant settings files;
- `example_metadata` houses all of the testing metadata;
- `utils` contains additional useful functions imported in different application files;
- `scripts` contains scripts you can run by enter `yarn task <filename> <network>`;

## Commands
### Install dependencies
The first thing you need to do in order to be able to use the other commands is to install the project dependencies.
Move inside the project folder and run:
```sh
npm install
#or
yarn
```
### Tasks
You can execute any tasks you find inside the `scripts` folder using the `yarn task <filename> <network>` command.
```sh
# yarn task <task> <network>
#or
# npm run task <task> <network>
yarn task balance:add devnet

```

This command will add 1 SOL to the current devnet wallet address balance.

### Generate a new wallet
```sh
# yarn task wallet <network>
yarn task wallet:get devnet
```
This creates a new wallet if an old one named `devnet`.json inside the `configs` folder is not found. To force generating a new one, you can simply delete the `devnet`.json file and run the command again. 

### Import a new wallet
```sh
# yarn task wallet <network> <private_key_base58>
yarn task wallet:import devnet <your_private_key_base58>
```
This creates a new wallet derived from the private key if an old one named `devnet`.json inside the `configs` folder is not found.

### Mint
1.  In order to mint some ntfs on Solana using Metaplex, you need to setup a [Candy Machine](https://docs.metaplex.com/programs/candy-machine/overview) first.
    ```sh
    yarn task candy-machine:create devnet
    ```
    A new Candy Machine will be created pre-configured using the settings you can find inside the `candyMachineSettings` variable in the `scripts/candy-machine:create.js` file. Docs here: https://docs.metaplex.com/programs/candy-machine/candy-machine-settings
    
1.  The Candy Machine must be filled with the NFT Collection items before minting.
    ```sh
    yarn task candy-machine:fill devnet
    ```
1.  Now you can mint your Candy Machine with its associated NFTs.
    ```sh
    yarn task candy-machine:mint devnet
    ```



Node used version: 18.12.1