## Directory structure
- `configs` stores all of the wallets used in different networks;
- `constants` houses all of your project constant settings files;
- `utils` contains additional useful functions imported in different application files;
- `scripts` contains scripts you can run by enter `yarn task <filename> <network>`;

## Commands
```sh
# yarn mint <network>
yarn mint devnet
```
This command will create a new NFTs Collection and a new Candy Machine using a new wallet if an old one named `devnet` is not found.

### Tasks
You can execute any tasks you find inside the `scripts` folder using the `yarn task <filename> <network>` command.
```sh
# yarn task <network>
yarn task balance:add devnet
```

This command will add 1 SOL to the current devnet wallet address balance.

Node used version: 16.17.0