import { useEffect, useState } from 'react'
import './App.css'
import HistoricalDataChart from './components/HistoricalDataChart'
import useHistoricalData from './hooks/useHistoricalData'

function App() {
  const { data, loading, error, setDateRange  } = useHistoricalData()

  return (
    <>
      <div className='main'>
        <h1>USD/ILS Historical Rates</h1>
        <div className='date-selection'>
          <div className='date-input'>start</div>
          <div className='date-input'>end</div>
        </div>
        <div className='chart'>
          <HistoricalDataChart data={data}/>
        </div>
      </div>
    </>
  )
}

export default App
