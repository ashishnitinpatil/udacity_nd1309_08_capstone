const SquareVerifier = artifacts.require('SquareVerifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const truffleAssert = require('truffle-assertions');


contract('Test SolnSquareVerifier', accounts => {

    const owner = accounts[0];
    const tokenHolder = accounts[1];
    const randomAcc = accounts[2];

    describe('test token minting by providing solution', () => {
        beforeEach(async () => {
            const squareContract = await SquareVerifier.new({from: owner});
            this.contract = await SolnSquareVerifier.new(
                squareContract.address, {from: owner}
            );
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        // using proof.json from 25**2 == 625 (correct)
        it('should mint token for correct proof', async () => {
            let tokenId = 101;
            let tx = await this.contract.mintToken(
                tokenHolder,
                tokenId,
                ["0x0fc978f22d06a974d6316d985fa282b3a4a21e1d27e9c289fee9a22b12871312", "0x0fe05fa5fb235d548c4c1e62b7c876085ebbbe1f90f8d383182f1aab309257e7"],
                [["0x0bae5b063fdd7c6a866adb5de9857e79cc028d00a35201c29ec82ded189bfd41", "0x214c23d14f00501bee5fdd36908b837c2c48c89766e0fd4c73ba1107fa399a72"], ["0x041549e1f75316db78902a80939b3009f42d47841cdf514f712a4de071d9f6da", "0x270c660ba3e36c3b41a6d392da2b48c642adec0a162b15fe1c83449f5e99c8bf"]],
                ["0x0a21d3108de18e2c654277a663686bf08f4b20ccf2f98e4f9b725632dcfefe07", "0x2c59ad0d705e8e65bfd0c7079dc3a19e6546aa737bc0965bbfe673bfefb19ca6"],
                ["0x0000000000000000000000000000000000000000000000000000000000000271", "0x0000000000000000000000000000000000000000000000000000000000000001"],
                {from: owner}
            );
            await truffleAssert.eventEmitted(tx, "SolutionAdded", (ev) => {
                return (ev.to == tokenHolder && ev.tokenId == tokenId);
            });
            let _owner = await this.contract.ownerOf.call(tokenId);
            assert.equal(_owner, tokenHolder, "Wrong owner of token after mint");
            let bal = await this.contract.balanceOf.call(tokenHolder);
            assert.equal(bal, 1, "Incorrect balance for tokenHolder after mint");
        });

        it('should not allow solution reuse', async () => {
            let tokenId = 201;
            await this.contract.mintToken(
                tokenHolder,
                tokenId,
                ["0x0fc978f22d06a974d6316d985fa282b3a4a21e1d27e9c289fee9a22b12871312", "0x0fe05fa5fb235d548c4c1e62b7c876085ebbbe1f90f8d383182f1aab309257e7"],
                [["0x0bae5b063fdd7c6a866adb5de9857e79cc028d00a35201c29ec82ded189bfd41", "0x214c23d14f00501bee5fdd36908b837c2c48c89766e0fd4c73ba1107fa399a72"], ["0x041549e1f75316db78902a80939b3009f42d47841cdf514f712a4de071d9f6da", "0x270c660ba3e36c3b41a6d392da2b48c642adec0a162b15fe1c83449f5e99c8bf"]],
                ["0x0a21d3108de18e2c654277a663686bf08f4b20ccf2f98e4f9b725632dcfefe07", "0x2c59ad0d705e8e65bfd0c7079dc3a19e6546aa737bc0965bbfe673bfefb19ca6"],
                ["0x0000000000000000000000000000000000000000000000000000000000000271", "0x0000000000000000000000000000000000000000000000000000000000000001"],
                {from: owner}
            );

            // can't reuse same solution
            await truffleAssert.reverts(
                this.contract.mintToken(
                    tokenHolder,
                    tokenId+1,
                    ["0x0fc978f22d06a974d6316d985fa282b3a4a21e1d27e9c289fee9a22b12871312", "0x0fe05fa5fb235d548c4c1e62b7c876085ebbbe1f90f8d383182f1aab309257e7"],
                    [["0x0bae5b063fdd7c6a866adb5de9857e79cc028d00a35201c29ec82ded189bfd41", "0x214c23d14f00501bee5fdd36908b837c2c48c89766e0fd4c73ba1107fa399a72"], ["0x041549e1f75316db78902a80939b3009f42d47841cdf514f712a4de071d9f6da", "0x270c660ba3e36c3b41a6d392da2b48c642adec0a162b15fe1c83449f5e99c8bf"]],
                    ["0x0a21d3108de18e2c654277a663686bf08f4b20ccf2f98e4f9b725632dcfefe07", "0x2c59ad0d705e8e65bfd0c7079dc3a19e6546aa737bc0965bbfe673bfefb19ca6"],
                    ["0x0000000000000000000000000000000000000000000000000000000000000271", "0x0000000000000000000000000000000000000000000000000000000000000001"],
                    {from: owner}
                )
            );
        });

        // using false-proof.json from 24**2 == 600 (incorrect)
        // but with input as true (0x000...01) instead of false (0x000...00)
        it('should not mint token for incorrect proof', async () => {
            let tokenId = 999;
            await truffleAssert.reverts(
                this.contract.mintToken(
                    randomAcc,
                    tokenId,
                    ["0x2fe0382ba55fe351367fe334953c082fa1ccb0c326bd3553905736cf83568865", "0x28daa90a9d842c3bf00257f985e25efa4019897e64dcf834b955780a436528b5"],
                    [["0x15e256bfa2260697a629d16ea76b549d8824085f183ef629154c14b585a4fdd3", "0x126c6bb37810f6d95dc2eeb4c910ce3ec5d3c78a085e67f916be6453720b48cc"], ["0x2dce22f6bd135cc63fe3c223f2d93209d0c05b1917cf34b6841c9aba045dee99", "0x1de3601645452911b04cde2aea2999843ea5a863b0c39c691c0e5a4f16b6216b"]],
                    ["0x096efc17542105fd6d7d72e68425975252571a724192282efe813f2011ace881", "0x250b4f441c7c8f7fa1de33f197f84060dc7fa1ba2592e993288bb0ac99c7ad45"],
                    ["0x0000000000000000000000000000000000000000000000000000000000000258", "0x0000000000000000000000000000000000000000000000000000000000000001"],
                    {from: owner}
                )
            );
            let _owner = await this.contract.ownerOf.call(randomAcc);
            assert.equal(
                _owner, "0x0000000000000000000000000000000000000000",
                "Should not assign owner if incorrect proof given"
            );
            let bal = await this.contract.balanceOf.call(randomAcc);
            assert.equal(bal, 0, "Incorrect balance for randomAcc after invalid mint");
        });
    });
});
