let s = 'Hello';

// out是模块内部函数，模块外部不可见:
function out(prompt, name) {
    console.log(`${prompt}, ${name}!`);
}

// greet是导出函数，可被外部调用:
export function greet(name) {
    out(s, name);
}

// hi是导出函数，可被外部调用:
export function hi(name) {
    out('Hi', name);
}