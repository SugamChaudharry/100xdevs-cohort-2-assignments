let counter = 1
const date = new Date().getTime()
while(true){
  const date2 = new Date().getTime()
  if (date2 - date === (1000 * counter)) {
    console.log(counter++,);
  }
  if(counter === 11)break;
}