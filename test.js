async  function cool(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve( "after wait show this message");
     }, 4000);
    })
     
}

async function fun(){
    const result = await cool();
    console.log(result)
}


fun()