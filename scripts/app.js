const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')

const updateUI = (data) => {
    // const cityData = data.cityData
    // const weather = data.weather

    const {cityData, weather} = data

    details.innerHTML = `
        <h5 class="my-3">${cityData.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `
    let iconSrc = `./img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)

    const timeSrc = weather.IsDayTime ? './img/day.svg' : './img/night.svg'
    time.setAttribute('src', timeSrc)

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}

const updateCity = async (city) => {
    const cityData = await getCity(city)
    const weather = await getWeather(cityData.Key)
    return { cityData, weather }
}

cityForm.addEventListener('submit', e => {
    e.preventDefault()
    const city = cityForm.city.value.trim()
    cityForm.reset()

    updateCity(city)
        .then(data => { updateUI(data) })
        .catch(err => { console.log(err) })

    localStorage.setItem('city', city)
})

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => { updateUI(data) })
        .catch(err => { console.log(err) })
}