import { ethers } from "hardhat";

async function main() {
 const factory = await ethers.deployContract("MultiSigFactory");
 factory.waitForDeployment();
 console.log(factory);
 console.log(`MultiSig deployed to ${factory.target}`);

 //npx hardhat verify --constructor-args args.js 0x5345Ee6c9C1bD8977699D596A2b5c532F4C0D9FC --network goerli
 //MultiSig deployed to 0x5345Ee6c9C1bD8977699D596A2b5c532F4C0D9FC

 let [admin1, admin2, admin3] = await ethers.getSigners();

 const amount = ethers.parseEther("0.001");
 const factoryMultisig = await ethers.getContractAt(
  "IFactoryMultisig",
  "0x5345Ee6c9C1bD8977699D596A2b5c532F4C0D9FC"
 );
 const receipt = await factoryMultisig.createMultisig(
  [
   "0x8A91F5D0FaC39AB37c4E281a498eb68eA24ae078",
   "0xF4e8Ac6446551E8046540a495120F3648d3B00e4",
   "0xC28052343150235DFaaf35714A80d2161B77924F",
   "0xB5119738BB5Fe8BE39aB592539EaA66F03A77174",
   "0xc9DE6D26315f7353d28401f4e3CA66A470cd7991",
   "0xe9999a29B116cB45444621EcD1CE52CA013243E4",
  ],
  { value: amount }
 );

 console.log(`Child contract Multisig created at ${receipt})`);
 const multisig = await ethers.getContractAt(
  "IMultisig",
  "0x305851b690ed21634B1AdEE6a60685724ae7a181"
 );
 await multisig.createTransaction(amount, admin3);
 await multisig.AprroveTransaction(1);
 await multisig.connect(admin2).AprroveTransaction(1);
 await multisig.AprroveTransaction(1);
 await multisig.connect(admin3).AprroveTransaction(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
 console.error(error);
 process.exitCode = 1;
});
