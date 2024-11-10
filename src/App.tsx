import './App.css'
import HistoricalDataChart from './components/HistoricalDataChart'
import RateDates from './components/RateDates'
import useHistoricalData from './hooks/useHistoricalData'

function App() {
  const { data, dateRange, loading, error, setDateRange  } = useHistoricalData()

  return (
    <>
      <div className='main'>
        <h1>USD/ILS Historical Rates</h1>
        <RateDates dateRange={dateRange}  />
        <div className='chart'>
          <HistoricalDataChart data={data}/>
        </div>
      </div>
    </>
  )
}

export default App
