# Simple Honey Pot Checker

This contract allows you to know if a token is a scam or not, and also to know the exact % of sell/buy taxes.

You just need to change in "HONEY.json" the statemutability for the function "checkHoneyMain" to "view" just after you compile the project. This assure you to make a staticcall about the double swap and not affect the real balance of the smart contract. (or simply add "staticcal" in your calls directly, this is the option by default)

run into a fork of the mainnet :

```shell
npm run test
```

# Important

Don't forget to change your infura node in "hardhat.config.js" => INFURANODE = `https://mainnet.infura.io/v3/YOUR_INFURA_NODE_HERE`
