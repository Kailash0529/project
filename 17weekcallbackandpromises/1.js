const array=[1,2,3,4,5];
function callback(num)
{
    return num*2;
}
function  mainkaam(arr,callback)
{
    const kailash=arr.map((num)=>
    {
return callback(num);
    });
    return kailash;
}
const ishu=mainkaam(array,callback);
console.log(ishu);
