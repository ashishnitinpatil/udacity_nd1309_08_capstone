## Token Minting - Steps to reproduce

Start truffle console (with apt network) after deploying contracts -

    $ truffle console --network rinkeby

Call mint token on SolnSquareVerifier contract instance at deployed address -

    truffle(rinkeby)> SolnSquareVerifier.deployed().then((instance) => {
            instance.mintToken(
                accounts[0],
                1,
                ["0x0fc978f22d06a974d6316d985fa282b3a4a21e1d27e9c289fee9a22b12871312", "0x0fe05fa5fb235d548c4c1e62b7c876085ebbbe1f90f8d383182f1aab309257e7"],
                [["0x0bae5b063fdd7c6a866adb5de9857e79cc028d00a35201c29ec82ded189bfd41", "0x214c23d14f00501bee5fdd36908b837c2c48c89766e0fd4c73ba1107fa399a72"], ["0x041549e1f75316db78902a80939b3009f42d47841cdf514f712a4de071d9f6da", "0x270c660ba3e36c3b41a6d392da2b48c642adec0a162b15fe1c83449f5e99c8bf"]],
                ["0x0a21d3108de18e2c654277a663686bf08f4b20ccf2f98e4f9b725632dcfefe07", "0x2c59ad0d705e8e65bfd0c7079dc3a19e6546aa737bc0965bbfe673bfefb19ca6"],
                ["0x0000000000000000000000000000000000000000000000000000000000000271", "0x0000000000000000000000000000000000000000000000000000000000000001"],
            );
            return instance;
        }).then((instance) =>
            return instance.balanceOf(accounts[0]);
        }).then((balance) => {
            console.log("Token balance for", accounts[0], "is", balance.toNumber());
        });

Repeat above with different zokrates proof.jsons & tokenIDs.

Note that since it's a testnet transaction, it takes time to confirm, so balance numbers may lag.