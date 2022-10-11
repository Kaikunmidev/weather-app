import axios from 'axios'
import React, {useState} from 'react'
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const dataState = atom({
  key: 'data',
  default: {},
  effects_UNSTABLE: [persistAtom],
})

// const API_KEY = "deea56660eaf9f31b9881ab0a81f880e"
const API_KEY = import.meta.env.VITE_SOME_KEY
function App() {
  const [data, setdata] = useRecoilState(dataState)
  const [location, setLocation] = useState("")
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
  const searchLocation = (e) => {
    if(e.key == "Enter"){
      axios.get(url).then((response)=> {
        setdata(response.data)
        console.log(response.data)
      })
      setLocation("")
    }
  }
  return (
    <div className='app'>
      <div className="Search">
        <input type="text"
      value={location}
      onKeyPress={searchLocation}
      onChange={e=> setLocation(e.target.value)}
      placeholder = "Enter Location"
        />
      </div>
    
      <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temperature">
          {data.main?<h1>{Math.round(data.main.temp)}&#8451;</h1>:null}
          
        </div>
        <div className="description">
          {data.weather? <p>{data.weather[0].description}</p>: null }
        {/* weather[0].description  */}
          <p></p>
        </div>
      </div>
      {data.name !== undefined &&
      <div className="bottom">
        <div className="feels">
          {data.main? <p className='bold'>{ data.main.feels_like.toFixed()}25&#8451;</p>: null}
          <p>Feels like</p>
        </div>
        <div className="humidity">
        {data.main? <p className='bold'>{ data.main.humidity}%</p>: null}
          {/* <p>84%</p> */}
          <p>Humidity</p>
        </div>
        <div className="wind">
        {data.wind? <p className='bold'>{ data.wind.speed.toFixed()}MPH</p>: null}
          {/* <p>2MPH</p> */}
          <p>Wind speed</p>
        </div>
      </div>}
      </div>
    
    </div>
  )
}

export default App