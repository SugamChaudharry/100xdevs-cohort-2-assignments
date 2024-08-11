let counter = 0;

function incrementCounter() {
    counter++;
    console.log(counter);
    if(counter == 10){
      clearInterval(inteval)
    }
}

// Start the counter
const inteval = setInterval(incrementCounter, 1000);inteval