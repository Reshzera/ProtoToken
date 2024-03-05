import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ProtoToken", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ProtoTokenContract = await ethers.getContractFactory("ProtoToken");
    const protoTokenContract = await ProtoTokenContract.deploy();

    return { protoTokenContract, owner, otherAccount };
  }

  it("Should have correct name and symbol", async function () {
    const { protoTokenContract } = await loadFixture(deployOneYearLockFixture);

    const name = await protoTokenContract.name();
    const symbol = await protoTokenContract.symbol();

    expect(name).to.equal("ProtoToken");
    expect(symbol).to.equal("PTK");
  });

  it("Should have correct initial supply", async function () {
    const { protoTokenContract } = await loadFixture(deployOneYearLockFixture);

    const initialSupply = await protoTokenContract.totalSupply();
    const totlaSupplyExpected = 1000n * 10n ** 18n;

    expect(initialSupply).to.equal(totlaSupplyExpected);
  });

  it("Should have correct decimals", async function () {
    const { protoTokenContract } = await loadFixture(deployOneYearLockFixture);

    const decimals = await protoTokenContract.decimals();

    expect(decimals).to.equal(18);
  });

  it("Should get ballance", async function () {
    const { protoTokenContract, owner } = await loadFixture(
      deployOneYearLockFixture
    );

    const ownerBallance = await protoTokenContract.balanceOf(owner.address);

    expect(ownerBallance).to.equal(1000n * 10n ** 18n);
  });

  it("Should transfer tokens", async function () {
    const { protoTokenContract, owner, otherAccount } = await loadFixture(
      deployOneYearLockFixture
    );
    const totalSupply = 1000n * 10n ** 18n;
    const amount = 100n;

    await protoTokenContract.transfer(otherAccount.address, amount);

    const ownerBallance = await protoTokenContract.balanceOf(owner.address);
    const otherAccountBallance = await protoTokenContract.balanceOf(
      otherAccount.address
    );

    expect(ownerBallance).to.equal(totalSupply - amount);
    expect(otherAccountBallance).to.equal(amount);
  });

  it("Should not transfer tokens if sender has not enough tokens", async function () {
    const { protoTokenContract, otherAccount } = await loadFixture(
      deployOneYearLockFixture
    );

    const amount = 1001n * 10n ** 18n;

    await expect(
      protoTokenContract.transfer(otherAccount.address, amount)
    ).to.be.revertedWith("Insufficient balance");
  });

  it("Should approve tokens", async function () {
    const { protoTokenContract, owner, otherAccount } = await loadFixture(
      deployOneYearLockFixture
    );
    const amount = 1n;

    await protoTokenContract.approve(otherAccount.address, amount);

    const allowance = await protoTokenContract.allowance(
      owner.address,
      otherAccount.address
    );

    expect(allowance).to.equal(amount);
  });

  it("Should transferFrom tokens", async function () {
    const { protoTokenContract, owner, otherAccount } = await loadFixture(
      deployOneYearLockFixture
    );
    const otherAccountInstance = protoTokenContract.connect(otherAccount);
    const amout = 10n;
    const approve = 20n;
    await protoTokenContract.approve(otherAccount.address, approve);

    const beforeOtherAccounBalance = await otherAccountInstance.balanceOf(
      otherAccount.address
    );
    const beforeOwnerBalance = await protoTokenContract.balanceOf(
      owner.address
    );

    await otherAccountInstance.transferFrom(
      owner.address,
      otherAccount.address,
      amout
    );

    const otherAccounBalance = await otherAccountInstance.balanceOf(
      otherAccount.address
    );
    const ownerBalance = await protoTokenContract.balanceOf(owner.address);

    const ownerAllowance = await protoTokenContract.allowance(
      owner.address,
      otherAccount.address
    );

    expect(otherAccounBalance).to.equal(beforeOtherAccounBalance + amout);
    expect(ownerBalance).to.equal(beforeOwnerBalance - amout);
    expect(ownerAllowance).to.equal(approve - amout);
  });

  it("Should NOT transferFrom tokens (BALANCE)", async function () {
    const { protoTokenContract, otherAccount } = await loadFixture(
      deployOneYearLockFixture
    );
    const otherAccountInstance = protoTokenContract.connect(otherAccount);
    await expect(
      otherAccountInstance.transferFrom(
        otherAccount.address,
        otherAccount.address,
        10n
      )
    ).to.revertedWith("Insufficient balance");
  });

  it("Should NOT transferFrom tokens (ALLOWANCE)", async function () {
    const { protoTokenContract, otherAccount, owner } = await loadFixture(
      deployOneYearLockFixture
    );
    const otherAccountInstance = protoTokenContract.connect(otherAccount);
    await expect(
      otherAccountInstance.transferFrom(
        owner.address,
        otherAccount.address,
        10n
      )
    ).to.revertedWith("Insufficient Allowance");
  });
});
