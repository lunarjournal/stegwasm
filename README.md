# stegwasm

stegwasm - A simple steganography web assembly (wasm) demo in C.

This code builds upon [tinywasm](https://github.com/lunarjournal/tinywasm) to create a web assembly binary that decodes and executes javascript code embedded in a GIF file. A modified version of [giffy](https://github.com/vipyne/giffy) is provided to allow a user to embed data into GIFs.

# Info
Ensure you have installed the emscripten C compiler (emcc) as per the following [guide](https://emscripten.org/docs/getting_started/downloads.html).

`decode.c` - Primary wasm decoder written in C<br>
`decode.js` - Wasm bootstraper <br>

Folders:
* `giffy` - Modified giffy <br>

Simply run `build.sh` from base directory to build and launch simple python http file server.

```
+---------------------------------------+
|   .-.         .-.         .-.         |
|  /   \       /   \       /   \        |
| /     \     /     \     /     \     / |
|        \   /       \   /       \   /  |
|         "_"         "_"         "_"   |
|                                       |
|  _   _   _ _  _   _   ___   ___ _  _  |
| | | | | | | \| | /_\ | _ \ / __| || | |
| | |_| |_| | .` |/ _ \|   /_\__ \ __ | |
| |____\___/|_|\_/_/ \_\_|_(_)___/_||_| |
|                                       |
|                                       |
| Lunar RF Labs                         |
| https://lunar.sh                      |
|                                       |
| RF Research Laboratories              |
| Copyright (C) 2022-2024               |
|                                       |
+---------------------------------------+
```
