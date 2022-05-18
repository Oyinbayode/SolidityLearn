import { expect } from "chai";
import { ethers } from "hardhat";

describe("Testing HelloWorld", () => {
  it("Should deploy Hello World contract", async () => {
    const helloWorldContractFactory = await ethers.getContractFactory(
      "HelloWorld"
    );
    const helloWorldContract = await helloWorldContractFactory.deploy();
    await helloWorldContract.deployed();
    const text = await helloWorldContract.getText();

    expect(text).to.eq("Hello World");
  });

  it("Should change text", async () => {
    const helloWorldContractFactory = await ethers.getContractFactory(
      "HelloWorld"
    );
    const helloWorldContract = await helloWorldContractFactory.deploy();
    await helloWorldContract.deployed();
    await helloWorldContract.setText("Text");
    const text = await helloWorldContract.getText();

    expect(text).to.eq("Text");
  });
});
