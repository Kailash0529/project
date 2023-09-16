const linkedinProfileRegex = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]{5,30}[a-zA-Z0-9]\/$/;
function validurl(url)
{
    return linkedinProfileRegex.test(url);
}
let url = 'https://www.linkedin.com/in/mithun-s-83a8a3186/'
if(validurl(url))
{
    console.log(`${url} is valid`);
}
else{
    console.log(`${url} is invalidvalid`);

}