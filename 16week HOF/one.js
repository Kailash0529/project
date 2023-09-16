let inputs="kailash";
function reverseinput(strings)
{
return strings.split("").reverse().join("");
}
function delayz(stringsa)
{
    setTimeout(function() {
        let reversestring=reverseinput(stringsa);
        console.log("reversetring is" +reversestring);
    }, 2000);
}
delayz(inputs);