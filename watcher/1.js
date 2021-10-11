async function main() {
    var value = await Promise.resolve('Hey there');
    console.log('inside: ' + value);
    return value;
}

var text = main();  
console.log('outside: ' + text)
