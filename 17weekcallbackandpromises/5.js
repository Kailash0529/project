function greeting(name)
{
return new Promise((resolve) => {
    const message=`hello ${name}`;
    resolve(message);
});
}
greeting("kailash").then((message)=>console.log(message));