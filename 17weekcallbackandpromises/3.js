const insaan={
    firstname:"mithun",
    lastname:"chakravati",
    age:20,
};
function joinletters(insaan,callback)
{
    const fullname=`${insaan.firstname}${insaan.lastname}`;
    const ageindays=insaan.age*365;
    callback(fullname,ageindays);
}
function logs(fullname,ageindays)
{
    console.log(`fullname is ${fullname} and age is ${ageindays} days`);
}
joinletters(insaan,logs);
