const base_URL = "https://api.exchangerate-api.com/v4/latest/";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg=document.querySelector(".msg");

const api_key = "6c7134e1ed52de48f40ae425";


for(let select of dropdowns){
for(currcode in countryList){
    let newoption=document.createElement("option");
    newoption.innerText=currcode;
    if(select.name==="from" && currcode==="USD"){
        newoption.selected="selected";
    }
    else if(select.name==="to" && currcode==="INR"){
        newoption.selected="selected";
    }
    newoption.value=currcode;
    select.append(newoption); 
}
select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
});
}

const updatexchangerate= async()=>{
    
    let amount=document.querySelector(".amount input");
      let amtval=amount.value;
   if(amtval==="" || amtval<1){
      amtval=1;
      amount.value="1";
  } 
  
  const fromCurrency = fromcurr.value;
  const toCurrency = tocurr.value;
   const URL = `${base_URL}${fromCurrency}?access_key=${api_key}&symbols=${toCurrency}`;
   let response = await fetch(URL);
   let data = await response.json();
  let Rate = data.rates[toCurrency];
   
   let final=amtval*Rate;
   msg.innerText=`${amtval} ${fromcurr.value}=${final} ${tocurr.value}`;
}

const updateflag=(element)=>{
  let currcode=element.value;
   let countrycode=countryList[currcode];
   let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
        img.src=newsrc;
};


btn.addEventListener("click", (evt)=>{
       evt.preventDefault(); 
     updatexchangerate();
});

document.addEventListener("load",()=>{
    updatexchangerate();
});