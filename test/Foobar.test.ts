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
        })
    })
})