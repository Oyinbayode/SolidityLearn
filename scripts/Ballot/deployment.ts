import { ethers, providers } from "ethers";

import { Ballot } from "../../typechain";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let x = 0; x < array.length; x++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[x]));
  }
  return bytes32Array;
}

const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

const main = async () => {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);

  const provider = ethers.providers.getDefaultProvider("ropsten");
  console.log(`Using address ${wallet.address}`);

  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));

  console.log(`Wallet balance ${balance}`);
  const lastBlock = await provider.getBlock("latest");

  // const ballotFactory = await ethers.getContractFactory("Ballot");
  // const ballotContract: Ballot = await ballotFactory.deploy(
  //   convertStringArrayToBytes32(PROPOSALS)
  // );
  // await ballotContract.deployed();

  // for (let i = 0; i < PROPOSALS.length; i++) {
  //   const proposal = await ballotContract.proposals(i);
  //   console.log(`Proposal at ${i} is named ${proposal}`);
  // }
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
