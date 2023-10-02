async function fetching()
{
    const link= await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const asli=await link.json();
    console.log(asli);
}
fetching();