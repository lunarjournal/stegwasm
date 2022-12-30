make -C giffy/
giffy/giffy.exe e giffy/in.gif out.gif giffy/steg.dat
emcc decode.c -O2 -s WASM=1 -s SIDE_MODULE=1 -s EXPORTED_FUNCTIONS='["decode"]' -o decode.wasm -s ERROR_ON_UNDEFINED_SYMBOLS=0
python3 -m http.server 8001
