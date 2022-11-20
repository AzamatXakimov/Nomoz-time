const elRegionText = document.querySelector(".js-nomoz-city");
const elNomozForm = document.querySelector(".js-nomoz-form");
const elNomozInput = elNomozForm.querySelector(".js-nomoz-region-search")
const elNomozBtnBox = elNomozForm.querySelector(".js-day-btn");
const elNomozList = document.querySelector(".js-nomoz-list")
const elNomozTemp = document.querySelector(".js-nomoz-template").content;

function renderArr(info, node, region){
    node.innerHTML = "";
    
    elRegionText.textContent = region;
    const elNomozFrag = new DocumentFragment()
    if(Array.isArray(info)){
        info.forEach(item => {
            const elNomozTepmClone = elNomozTemp.cloneNode(true);
            let date;
            
            if(info.length > 20){
                date = item.date.split("T")[0]
            }
            else{
                date = item.date.split(", ")[0].split("/").reverse().join("-")
            }

            elNomozTepmClone.querySelector(".js-bomdod-time").textContent = item.times?.tong_saharlik;
            elNomozTepmClone.querySelector(".js-bomdod-time").datetime = `${date} ${item.times?.tong_saharlik}`;

            elNomozTepmClone.querySelector(".js-quyosh-time").textContent = item.times?.quyosh;
            elNomozTepmClone.querySelector(".js-quyosh-time").datetime = `${date} ${item.times?.quyosh}`;

            elNomozTepmClone.querySelector(".js-peshin-time").textContent = item.times?.peshin;
            elNomozTepmClone.querySelector(".js-peshin-time").datetime = `${date} ${item.times?.peshin}`;
            
            elNomozTepmClone.querySelector(".js-asr-time").textContent = item.times?.asr;
            elNomozTepmClone.querySelector(".js-asr-time").datetime = `${date} ${item.times?.asr}`;
            
            elNomozTepmClone.querySelector(".js-shom-time").textContent = item.times?.shom_iftor;
            elNomozTepmClone.querySelector(".js-shom-time").datetime = `${date} ${item.times?.shom_iftor}`;
            
            elNomozTepmClone.querySelector(".js-xufton-time").textContent = item.times?.hufton;
            elNomozTepmClone.querySelector(".js-xufton-time").datetime = `${date} ${item.times?.hufton}`;
            
            elNomozTepmClone.querySelector(".js-nomoz-date").textContent = date;
            elNomozTepmClone.querySelector(".js-nomoz-date").datetime = date;

            elNomozFrag.appendChild(elNomozTepmClone)
        })
    }
    else{
        const elNomozTepmClone = elNomozTemp.cloneNode(true);
            
        const date = info.date.split(", ")[0].split("/").reverse().join("-")
        elNomozTepmClone.querySelector(".js-bomdod-time").textContent = info.times?.tong_saharlik;
        elNomozTepmClone.querySelector(".js-bomdod-time").datetime = `${date} ${info.times?.tong_saharlik}`;

        elNomozTepmClone.querySelector(".js-quyosh-time").textContent = info.times?.quyosh;
        elNomozTepmClone.querySelector(".js-quyosh-time").datetime = `${date} ${info.times?.quyosh}`;

        elNomozTepmClone.querySelector(".js-peshin-time").textContent = info.times?.peshin;
        elNomozTepmClone.querySelector(".js-peshin-time").datetime = `${date} ${info.times?.peshin}`;
        
        elNomozTepmClone.querySelector(".js-asr-time").textContent = info.times?.asr;
        elNomozTepmClone.querySelector(".js-asr-time").datetime = `${date} ${info.times?.asr}`;
        
        elNomozTepmClone.querySelector(".js-shom-time").textContent = info.times?.shom_iftor;
        elNomozTepmClone.querySelector(".js-shom-time").datetime = `${date} ${info.times?.shom_iftor}`;
        
        elNomozTepmClone.querySelector(".js-xufton-time").textContent = info.times?.hufton;
        elNomozTepmClone.querySelector(".js-xufton-time").datetime = `${date} ${info.times?.hufton}`;
        
        elNomozTepmClone.querySelector(".js-nomoz-date").textContent = date;
        elNomozTepmClone.querySelector(".js-nomoz-date").datetime = date;

        elNomozFrag.appendChild(elNomozTepmClone)
    }
    node.appendChild(elNomozFrag)

}

async function getInfo(days="day", region="Toshkent", monht="", present="present/"){
    try {
        const res = await fetch(`https://islomapi.uz/api/${present}${days}?region=${region}${monht}`)
        const data = await res.json();
        renderArr(data, elNomozList, region)
    } catch (error) {
        console.log(error);
    }
}

elNomozForm.addEventListener("submit", evt => {
    evt.preventDefault();

    getInfo(undefined, elNomozInput.value)
})

elNomozBtnBox.addEventListener("click", evt => {
    if(evt.target.matches(".hero-day-day")){
        getInfo("day");
    }
    if(evt.target.matches(".hero-day-week")){
        getInfo("week");
    }
    if(evt.target.matches(".hero-day-month")){
        const nowDate = new Date();
        if(elNomozInput.value == ""){
            getInfo("monthly", undefined, `&month=${nowDate.getMonth()+1}`, "");
        }
        else{
            getInfo("monthly", elNomozInput.value, `&month=${nowDate.getMonth()+1}`, "");
        }
    }
})

getInfo()