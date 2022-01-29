import { expect } from "chai";
import { ethers } from "hardhat";

describe('Foobar contract', () => {

    let foobar: any

    beforeEach(async () => {
        const Foobar = await ethers.getContractFactory("Foobar");
        foobar = await Foobar.deploy();
        await foobar.deployed();
    })

    describe('hello function', () => {

        it('returns "foo"', async () => {
            const helloResult = await foobar.hello();
            expect(helloResult).to.equal("foo");
        })

        it('returns a hundred trillion!', async () => {
            const hello2Result = await foobar.hello2();
            expect(hello2Result).to.equal(100_000_000_000);
        })

    })

    describe('state manipulating functions', () => {

        describe('increment function', () => {

            it('initializes magicNum to zero', async () => {

                const initialMagicNum = await foobar.magicNum();

                expect(initialMagicNum).to.equal(0);

            })

            it('increments magicNum by 1', async () => {

                await foobar.increment();

                const incrementedMagicNum = await foobar.magicNum();

                expect(incrementedMagicNum).to.equal(1);

            })

            it('increments magicNum to 5', async () => {

                for (let i = 0; i < 5; i++) {
                    await foobar.increment();
                }

                const incrementedMagicNum = await foobar.magicNum();

                expect(incrementedMagicNum).to.equal(5);

            })
        })

        describe('manipulating an array', () => {

            it('sets up the initial elements', async () => {

                const firstElement = await foobar.tony(0);
                const secondElement = await foobar.tony(1);
                const thirdElement = await foobar.tony(2);

                expect(firstElement).to.equal(1);
                expect(secondElement).to.equal(2);
                expect(thirdElement).to.equal(7);

                const fourthElement = foobar.tony(3);

                expect(fourthElement).to.be.revertedWith('');

                expect(await foobar.tonyLength()).to.equal(3)

            })

            it('swaps first and last elements', async () => {

                await foobar.swap();

                const firstElement = await foobar.tony(0);
                const secondElement = await foobar.tony(1);
                const thirdElement = await foobar.tony(2);

                expect(firstElement).to.equal(7);
                expect(secondElement).to.equal(2);
                expect(thirdElement).to.equal(1);

                const fourthElement = foobar.tony(3);

                expect(fourthElement).to.be.revertedWith('');

                expect(await foobar.tonyLength()).to.equal(3)
            })

            it('pops off last element', async () => {

                await foobar.pop();

                const firstElement = await foobar.tony(0);
                const secondElement = await foobar.tony(1);
                const thirdEl = await foobar.tony(2);

                expect(firstElement).to.equal(1);
                expect(secondElement).to.equal(2);
                expect(thirdEl).to.equal(0);

                const fourthElement = foobar.tony(3);
                await expect(fourthElement).to.be.revertedWith('');

                expect(await foobar.tonyLength()).to.equal(2)
            })

            it('inserts an element to end of array', async () => {

                const mockNewNum = 42;

                await foobar.append(mockNewNum);

                const firstElement = await foobar.tony(0);
                const secondElement = await foobar.tony(1);
                const thirdEl = await foobar.tony(2);
                const fourthEl = await foobar.tony(3);

                expect(firstElement).to.equal(1);
                expect(secondElement).to.equal(2);
                expect(thirdEl).to.equal(7);
                expect(fourthEl).to.equal(mockNewNum);

                const fifthElement = foobar.tony(4);
                await expect(fifthElement).to.be.revertedWith('');

                expect(await foobar.tonyLength()).to.equal(4)
            })

            it('insert, swap n\' pop', async () => {

                const mockNewNum = 5;

                await foobar.swap();
                await foobar.append(mockNewNum);
                await foobar.pop();

                const firstElement = await foobar.tony(0);
                const secondElement = await foobar.tony(1);
                const thirdEl = await foobar.tony(2);
                const fourthEl = await foobar.tony(3);

                expect(firstElement).to.equal(7);
                expect(secondElement).to.equal(2);
                expect(thirdEl).to.equal(1);
                expect(fourthEl).to.equal(0);

                const fifthElement = foobar.tony(4);
                await expect(fifthElement).to.be.revertedWith('');

                expect(await foobar.tonyLength()).to.equal(3)
            })

        })

    })

})