# stegwasm

stegwasm - A simple steganography web assembly (wasm) demo in C.

This code builds upon [tinywasm](https://github.com/spacehen/tinywasm) to create a web assembly binary that decodes data embedded in a GIF file. A modified version of [giffy](https://github.com/vipyne/giffy) is provided to allow a user to embed data into GIFs.

# Info
**decode.c** - Primary wasm decoder
**decode.js** - Wasm bootstraper
**giffy/** - Modified giffy executable

Simply run `build.sh` from base directory to build and launch simple python http file server.