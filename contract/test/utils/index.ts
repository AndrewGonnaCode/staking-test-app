import  { ethers, network } from 'hardhat';

/**
 * Changes the time of the next block
 *
 * @param newTimestamp - Timestamp to set on the next block
 */
 export async function setBlockTime(newTimestamp: number) {
    await network.provider.send('evm_setNextBlockTimestamp', [newTimestamp]);
    await network.provider.send('evm_mine');
}

/**
 * Returns the timestamp of the last block on the chain
 */
 export async function getLatestBlockTimestamp() {
    const blockNum = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNum);
    return block.timestamp;
}

/**
 * Returns the timestamp of specific block
 */
 export async function getBlockTimestamp(blockNum:number) {
    const block = await ethers.provider.getBlock(blockNum);
    return block.timestamp;
}

