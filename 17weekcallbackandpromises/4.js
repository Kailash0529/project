const books=[{
    title:"happythoughts",
    author:"kailash",
    year:2020,
},
{
    title:"Thoughts",
    author:"kailash",
    year:2020,
},
{
    title:"happythough",
    author:"kailash",
    year:2020,
},
{
    title:"happy",
    author:"kailash",
    year:2020,
},];
function booksmap(books,callback)
{
    const titles=books.map((book)=>
book.title);
    callback(titles);

}
function logtitle(titles)
{
    titles.sort();


    console.log(titles.join(","));
}
booksmap(books,logtitle);