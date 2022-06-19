const web3 = require("web3");
const {ethers} = require("hardhat");

class TestHelper {
    users = {};
    contracts = {};

    static largeApproval = web3.utils.toWei("10000000000000000000000000000").toString();


    deployHoneyChecker = async () => {
        await this._deployHoneyChecker();
    }

    _deployHoneyChecker= async () => {
        const Honey = await ethers.getContractFactory("HONEY");
        const addressRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
        const addressWETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

        const value = ethers.utils.parseEther("1");
        const honey = await Honey.deploy(addressRouter,addressWETH,{value:value});
        await honey.deployed();

        const currentContracts = this.contracts || {};
        this.contracts = {...currentContracts, ...{honey}};
    }

}

module.exports = TestHelper;