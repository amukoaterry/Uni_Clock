
const searched = document.getElementById('search-bar');
const button = document.getElementById('button');

// APIS 

const baseUrl = "https://worldtimeapi.org/api/timezone";
const container = document.getElementById('container');

const cityT = document.createElement('p');
cityT.setAttribute('id','userValue-time');
cityT.setAttribute('class','search');

const cityD = document.createElement('p');
cityD.setAttribute('id','userValue-date');
cityD.setAttribute('class','search');


document.getElementById('search-bar').addEventListener('input',() => {

    if(searched.value == ""){
        cityT.removeAttribute('id','userValue-time');
        cityT.removeAttribute('class','search');
       cityT.innerHTML = ""
    
    cityD.removeAttribute('id','userValue-date');
    cityD.removeAttribute('class','search');
    cityD.innerHTML = "";
    
    }

    });

const getTime =  () => {

    let value = searched.value;

    if (value !== "") {
        
const timeZone = fetch(`${baseUrl}/${value}`)
.then(async (response) =>{
const result = await response.json()
const time = new Date(result.datetime);

console.log(time.toString());

const city = document.getElementById('time-date');


city.appendChild(cityT);


if(time.toString() !== 'Invalid Date' ){

const realTime = time.toLocaleTimeString("en-US",{timeZone: `${value}`});
console.log({realTime});


city.appendChild(cityD);


cityT.setAttribute('id','userValue-time');
cityT.setAttribute('class','search');

cityD.setAttribute('id','userValue-date');
cityD.setAttribute('class','search');

cityT.innerHTML = `In ${value}, it's ${realTime}`
cityD.innerHTML = `${time.toDateString()} (${result.abbreviation})`

}

else{

cityD.removeAttribute('id','userValue-date');
cityD.removeAttribute('class','search');
cityD.innerHTML = "";
cityT.innerHTML = "No Data Found!"

}

})
.catch((error = "Make sure you add continent and city") =>{

    throw new Error(error);

});
console.log({timeZone});
}

else{

    cityT.innerHTML = ""

}

};


button.addEventListener('click',getTime);