import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Example from './components/RateChart'

function App() {
  const [count, setCount] = useState(0)


  const fetchRates = async () => {
    const rates = await fetch("https://openexchangerates.org/api/historical/2023-01-01.json?app_id=9637dd16bfce47dfa554678e6cec6c47&symbols=ILS")
    console.log(await rates.json())

  } 
  useEffect(() => {
    fetchRates()
  }, [])

  return (
    <>
      <div className='main'>
        <h1>USD/ILS Historical Rates</h1>
        <div className='date-selection'>
          <div className='date-input'>start</div>
          <div className='date-input'>end</div>
        </div>
        <div className='chart'>
          <Example/>
        </div>
      </div>
    </>
  )
}

export default App
