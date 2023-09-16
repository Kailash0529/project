function generateRandomNumber()
{
    return Math.floor(Math.random() *100);
}


function generateRandomNumberWithDelay(delayInSeconds)
{
    console.log(`Generating a random number after a delay of ${delayInSeconds} seconds`);
    let counts=delayInSeconds;
    const stopper= setInterval(() => {
        console.log(`${counts} seconds remaining...`);
        counts--;
        if(counts===0)
        {
            clearInterval(stopper);
        const result=generateRandomNumber();
            console.log(`Random number generated: ${result}`);

        }

    }, 1000);
}
generateRandomNumberWithDelay(3);