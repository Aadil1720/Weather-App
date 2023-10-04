const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const day = document.getElementById('day').textContent; // Get the day from the template
const today_date = document.getElementById('today_date').textContent; // Get the date from the template

const getInfo = async(event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `Please write the name before searching`;
        datahide.classList.add("data_hide");
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=4ae1037be9689befbc7edc7c6be7abf8`
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;

            if (tempMood == "Clear") {
                // const date =new Date();
                // const hours=date.getHours();
                // if(hours>20||hours<5){
                //     temp_status.innerHTML = "<i class='fa-duotone fa-moon' style='color:#fff;'></i>"
                // }else
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
                
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #009ad8;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
            }
            datahide.classList.remove('data_hide');
        } catch {
            datahide.classList.add("data_hide");
            city_name.innerText =  `Please enter the proper city name`;
            console.log('Please add the proper city name');
        }
    }
}

submitBtn.addEventListener('click', getInfo);
