let select=document.querySelectorAll("select");
let tbtn=document.querySelector(".btn");
let ftext=document.querySelector(".ftext");
let ttext=document.querySelector(".fto");
let ex=document.querySelector(".exchange");
let icons = document.querySelectorAll(".row i");

select.forEach((tag,id)=>{
    for (const country in countries) {
        let defult;
       //console.log(countries[country]);
       //console.log(country);
       if(id==0 && country=="en-GB"){
            defult="selected";
       }
       else if(id==1 && country=="hi-IN"){
            defult="selected";
       }
       let option = `<option value="${country}" ${defult}>${countries[country]}</option>`;
       tag.insertAdjacentHTML("beforeend",option);
    }
});

ex.addEventListener("click",()=>{
    let temp = ftext.value;
    ftext.value=ttext.value;
    ttext.value=temp;

    let l = select[0].value;
    select[0].value = select[1].value;
    select[1].value = l;
})

tbtn.addEventListener("click",()=>{
    let text= ftext.value;
    let tfrom = select[0].value;
    let tto = select[1].value;
    if(!text) return ;
    ttext.setAttribute("placeholder","Loading ...")
    let api=`https://api.mymemory.translated.net/get?q=${text}&langpair=${tfrom}|${tto}`;
     fetch(api).then(r => r.json()).then(data => {
       // console.log(data);
        ttext.value = data.responseData.translatedText;
    });
    // console.log(text,tfrom,tto);
});

icons.forEach(i => {
    i.addEventListener("click", ({target})=> {
       // console.log(target);
        if(target.classList.contains("fa-copy"))
        {
            if(target.id == "from")
            {
                navigator.clipboard.writeText(ftext.value);
                //console.log("From copy")
            }
            else
            {
                navigator.clipboard.writeText(ttext.value);
               // console.log("To copy")
            }
        }
        else
        {
            let sp;
            // console.log("Speech")
            if(target.id == "from"){
                sp = new SpeechSynthesisUtterance(ftext.value);
                sp.lang = select[0].value;
            }
            else{
                sp = new SpeechSynthesisUtterance(ttext.value);
                sp.lang = select[1].value;
            }
            speechSynthesis.speak(sp);
        }  
    }); 
});