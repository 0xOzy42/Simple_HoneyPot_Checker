const { expect } = require("chai");
const { ethers } = require("hardhat");
const TestHelper = require("./Helper");

const helper = new TestHelper();

describe("Honey tests", function () {
  let honey;
  before(async () => {
      await helper.deployHoneyChecker();

      honey = helper.contracts.honey;
  })

  it("Should return the balance of the contract", async function () {
    const response = await honey.getBalance();
    expect(response).to.be.equal("1000000000000000000");
  });

  it("Should return result for DAI token", async function (){
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const data = await honey.callStatic.checkHoneyMain(daiAddress);
    // const balance = await honey.getBalance();
    // console.log(balance.toString());
    expect(data.sell).to.be.true;
    // console.log(data);
  });

  it("Should return result for scam token", async function (){
    const tokenAddress = "0xe83f8a5db89baa2f7fb29786b38c927ff4f757b4";
    const data = await honey.callStatic.checkHoneyMain(tokenAddress);
    // const balance = await honey.getBalance();
    // console.log(balance.toString());
    expect(data.sell).to.be.false;
    // console.log(data);
  });
  

});