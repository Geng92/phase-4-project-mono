import React, { useState, useEffect } from "react";
import DriverCollection from "./DriversCollection"
import DriverDetails from "./DriverDetails"
import { useNavigate } from "react-router-dom"
import characterselect from "./assets/characterselect.png"

export default function DriversContainer () {
    const [ drivers, setDrivers ] = useState([]);
    const [ selectedDriverId, setSelectedDriverId ] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const currentDriver = sessionStorage.getItem("user_id")
        if (currentDriver == null){
            navigate("/login")
        }else{
        fetch(`/drivers`)
        .then((res) => res.json())
        .then((drivers) => setDrivers(drivers));
        }
    },[setDrivers]);

    const selectedDriver = drivers.find((driver) => driver.id === selectedDriverId)

    const handleSelectDriver = (driver) => {
        setSelectedDriverId(driver.id)
    }

    const driversToDisplay = drivers.filter((driver) => 
          driver.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div>
                {selectedDriver ? <DriverDetails driver={selectedDriver} /> : <img className="absolute top-[20%] left-[34%] w-72 h-52 mb-32 mx-2 rounded-xl pb-2" src={characterselect} alt="select"/>}
                <DriverCollection 
                    drivers={driversToDisplay}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} 
                    onClickDriver={handleSelectDriver}
                />
            </div>
        </div>
    );
}