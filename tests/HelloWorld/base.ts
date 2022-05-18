import { expect } from "chai";
import { ethers } from "hardhat";

import { HelloWorld } from "../../typechain";

describe("HelloWorld", () => {
  let helloWorldContract: HelloWorld;

  beforeEach(async () => {
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    helloWorldContract = await helloWorldFactory.deploy();
    await helloWorldContract.deployed();
  });

  it("Should give a Hello World", async () => {
    const text = await helloWorldContract.getText();

    const encodedText = ethers.utils.parseBytes32String(text);

    expect(encodedText).to.equal("Hello World");
  });

  it("Should set owner to deployer account", async () => {
    const accounts = await ethers.getSigners();
    expect(await helloWorldContract.owner()).to.equal(accounts[0].address);
  });

  it("Should not allow anyone other than owner to call transferOwnership", async () => {
    const accounts = await ethers.getSigners();
    await expect(
      helloWorldContract
        .connect(accounts[1])
        .transferOwnership(accounts[1].address)
    ).to.be.revertedWith("Caller is not the owner");
  });

  it("Should not allow anyone other than owner to change text", async () => {
    const accounts = await ethers.getSigners();
    const binaryText = ethers.utils.formatBytes32String("New Value");
    await expect(
      helloWorldContract.connect(accounts[1]).setText(binaryText)
    ).to.be.revertedWith("Caller is not the owner");
  });

  it("Should change text correctly", async () => {
    const NEW_VALUE = "New Value";
    const binaryText = ethers.utils.formatBytes32String(NEW_VALUE);
    const transaction = await helloWorldContract.setText(binaryText);
    const receipt = await transaction.wait();
    await helloWorldContract.setText(binaryText);
    expect(await helloWorldContract.getText()).to.equal(binaryText);
  });
});
