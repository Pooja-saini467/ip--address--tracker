const secret_api ='at_3eB8plkcCnHPbZVGa4oHY3LImvQX3'

const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'
const api_uri = 'https://geo.ipify.org/api/v2/country,city'

let current_ip = document.getElementById('new-ip')
let current_town = document.getElementById('new-location')
let current_zone = document.getElementById('new-zone')
let current_isp = document.getElementById('new-isp')

const entered_ip = document.getElementById('input-ip') 
const searchbtn = document.getElementById('search')

const headers_option = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup()


updateMarker = (update_marker = [-33.665, 18.993]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_url = `${bypass_cors_url}${api_uri}?apiKey=${secret_api}`
    }
    else {
        var ip_url = `${bypass_cors_url}${api_uri}?apiKey=${secret_api}&ipAddress=${default_ip}`
    }
    console.log(ip_url);
    fetch(ip_url, headers_option)
    .then( results => results.json())
    .then( data => {
        current_ip.innerHTML = data.ip
        current_town.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        current_zone.innerHTML = data.location.timezone
        current_isp.innerHTML = data.isp

         
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    })
}

document.addEventListener('load', updateMarker())

searchbtn.addEventListener('click', e => {
    e.preventDefault()
    if (entered_ip.value != '' && entered_ip.value != null) {
        getIPDetails(entered_ip.value)
        return
    }
    alert("Please enter a valid IP address");
})
