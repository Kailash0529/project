const urlPattern = /^(https?:\/\/)[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+[.][a-zA-Z]+$/;
function validurl(urls)
{
    return urlPattern.test(urls);
}
const url = "https://pwskills.com"

if(validurl(url)){
    console.log(`${url} is valid`);
}
else{
    console.log(`${url} is invalid`);

}