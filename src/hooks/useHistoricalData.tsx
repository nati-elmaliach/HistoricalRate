import { useCallback, useEffect, useState } from "react"
import { DataPoint } from "../types/DatePoint"


// TODO think about DRY
const generateDefaultDays = () => {
    const date = new Date()
    const endDate = date.toISOString().split('T')[0]

    date.setDate(date.getDate() - 13)

    const startDate = date.toISOString().split('T')[0]

    return { startDate, endDate}
}

const generateDateRange = (startDate: string, endDate: string) => {
    const dates = [];
    const end = new Date(endDate);
    const start = new Date(startDate);
    
    while (start <= end) {
      dates.push(start.toISOString().split('T')[0]);
      start.setDate(start.getDate() + 1);
    }

    return dates;
};

const useHistoricalData = (rateSymbol: string = 'ILS') => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState(generateDefaultDays());

  const parseDataPoint = (date: string, value: string) => {
        return {date, value: Number(value)}
    }

  const fetchData = useCallback(async () => {
    if (!dateRange.startDate || !dateRange.endDate) return;

    const dates = generateDateRange(dateRange.startDate, dateRange.endDate);
    console.log(dates)
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        dates.map(async (date) => {
          const cacheKeyWithParams = `${rateSymbol}-${date}`;
          const cachedData = sessionStorage.getItem(cacheKeyWithParams);

          if (cachedData) {
            console.log('Got it from cache')
            return parseDataPoint(date, cachedData);
          } 

        try {
            console.log('Fetching for ' + date, rateSymbol)
            const result = await fetch(`https://openexchangerates.org/api/historical/${date}.json?app_id=9637dd16bfce47dfa554678e6cec6c47&symbols=${rateSymbol}`)
            const { rates } = await result.json()
            sessionStorage.setItem(cacheKeyWithParams, rates[rateSymbol])
            return parseDataPoint(date, rates[rateSymbol])
        } catch (err) {
            console.error(`Error fetching data for ${date}:`, err);
            return {} as DataPoint
        }
        })
      );
      const resultsToDisplay = results.map((dataPoint, index) => {
        if (index == 0) return dataPoint;
        const oldValue = results[index -1].value;
        const changeInPrecentage = ((dataPoint.value - oldValue) / oldValue) * 100;
        return  { ...dataPoint, changeInPrecentage  };
      })
      setData(resultsToDisplay);
      console.log(resultsToDisplay)
    } catch (err) {
      setError("Could not fetch historical data");
      console.error('Error fetching historical data:', err);
    } finally {
      setLoading(false);
    }
  }, [rateSymbol, dateRange]);


  useEffect(() => {
    fetchData();
  }, [dateRange]);

  return {
    data,
    loading,
    error,
    dateRange,
    setDateRange,
  };
}

export default useHistoricalData;