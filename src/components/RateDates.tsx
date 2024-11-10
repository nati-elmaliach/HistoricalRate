import { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';



interface RateDatesProps {
    dateRange: {
        startDate: string;
        endDate: string;
    }    
}

// I tried to add the date picker but failedto do it on time...
const RateDates: React.FC<RateDatesProps> = ( { dateRange: {startDate, endDate }  }) => { 
    const [_startDate, setStartDate] = useState(new Date(startDate));
    const [_endDate, setEndDate] = useState(new Date(endDate));

    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className="date-selection" >
           {/* <DatePicker
            selected={_startDate}
            onChange={onChange}
            startDate={_startDate}
            endDate={_endDate}
            selectsRange
            inline
        /> */}
            <div className="date-selection-text">
                <p>Start Date: {_startDate ? _startDate.toLocaleDateString() : "None"}</p>
                <p>End Date: {_endDate ? _endDate.toLocaleDateString() : "None"}</p>
            </div>
        </div>
    );
}

export default RateDates;