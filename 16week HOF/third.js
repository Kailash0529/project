const items = [
    {
        name: "Iphone 15",
        category: "Mobile",
        priceUSD: 999,
    },
    {
        name: "Macbook Air",
        category: "Laptops",
        priceUSD: 1499,
    },
    {
        name: "Apple Watch",
        category: "Watches",
        priceUSD: 499,
    },
];
const exchng=80;

function convertToINR(priceusd)
{
return priceusd*exchng;
}
const kailash=items.map((item)=>({
    ...item,
    priceINR:convertToINR(item.priceUSD),
}));
console.log(kailash);