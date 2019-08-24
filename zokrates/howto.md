## Zokrates - Steps to reproduce

Create [square.code](./code/square/square.code) with apt verification function -

    docker run --rm -v /media/ashish/.../projects/08_capstone/zokrates/code:/home/zokrates/code -ti zokrates/zokrates /bin/bash

Change into the shared `code` directory (between local & docker) -

    cd code/

Compile our Zokrates code -

    /home/zokrates/zokrates compile -i square/square.code

Setup Zokrates to generate proving & verification keys -

    /home/zokrates/zokrates setup

Compute witness (25*25 == 625) -

    /home/zokrates/zokrates compute-witness -a 25 625

Generate proof.json -

    /home/zokrates/zokrates generate-proof

Generate verifier.sol -

    /home/zokrates/zokrates export-verifier
