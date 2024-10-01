
export default function DisplayTimeslots({date, selectedRoom, Timeslots, selectedTime, handleSelectedTime, totalTime}){
    return (
        <>
        <h1 className="col-span-6">Timeslots</h1>
        {(date && selectedRoom) && Timeslots.map(timeslot => {
            return(
                <div key={timeslot} onClick={() => handleSelectedTime(timeslot)} className={`m-1 p-1 outline outline-white rounded hover:text-black hover: cursor-pointer hover:bg-white ${selectedTime.includes(timeslot) || totalTime.includes(timeslot)? `bg-white text-black` : `` }`}>
                    <p>{timeslot}</p>
                </div>
            )
        })}
        <div className="mt-5">
            {totalTime.length >= 1 && (
                <p>Selected timings are: {totalTime.join()}</p>
            )}
        </div>
        </>
    )
}