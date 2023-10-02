function uppercasemain(strings,callback)
{
    const word=strings.toUpperCase();
    callback(word);
}
function display(words)
{
    console.log(words);
}
uppercasemain("kailash",display);