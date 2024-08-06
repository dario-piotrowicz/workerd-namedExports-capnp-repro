import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';
import { fileURLToPath } from 'url';

const workerdBinary = fileURLToPath(
    new URL('../bin/workerd', import.meta.resolve('workerd'))
)

const workerdProcess = spawn(workerdBinary, ['serve', 'src/config.capnp']);

// let's wait for workerd to be ready (there must be a better way to do this, but here this is good enough)
await setTimeout(1000);

const workerdResp = await fetch('http://localhost:8080').then(res => res.text());

console.log('Response from workerd:');
console.log(`\x1b[34m${workerdResp}\x1b[0m`);

workerdProcess.kill();
