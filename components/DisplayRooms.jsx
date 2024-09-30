
export default function DisplayRooms({rooms, setSelectedRoom}){
    return(
        <div className="flex flex-col gap-2 mt-10">
            <h1>Rooms</h1>
            {rooms && rooms.map(room => {
                return (
                    <div key={room.id} className="p-2 outline outline-white">
                        <p className="hover:cursor-pointer hover:bg-white hover:text-black" onClick={() => setSelectedRoom(room.id)}>{room.name}</p>
                    </div>
                )
            })}
        </div>
    )
}