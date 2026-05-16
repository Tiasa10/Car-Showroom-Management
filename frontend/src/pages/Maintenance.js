import "./Maintenance.css";

import { useState } from "react";
import axios from "axios";

function Maintenance({ cars, fetchCars }) {

    const [editingId, setEditingId] = useState(null);

const [status, setStatus] = useState("");
const [cost, setCost] = useState("");
const [lastService, setLastService] = useState("");
const [nextService, setNextService] = useState("");

const startEdit = (car) => {

    setEditingId(car._id);

    setStatus(car.maintenanceStatus || "Good");

    setCost(car.maintenanceCost || 0);

    setLastService(car.lastServiceDate || "");

    setNextService(car.nextServiceDate || "");

};

const updateMaintenance = async (id) => {

    try {

        await axios.put(
            `http://localhost:5000/cars/${id}`,
            {

                maintenanceStatus: status,

                maintenanceCost: cost,

                lastServiceDate: lastService,

                nextServiceDate: nextService

            }
        );

        setEditingId(null);

        fetchCars();

    } catch (error) {

        console.log(error);

    }

};

       return (

        <>

<div className="maintenance-header">

    <div>

        <h1>

            Maintenance Center

        </h1>

        <p>

            Track servicing, repairs
            and operational health

        </p>

    </div>

</div>

<div className="maintenance-stats">

    <div className="maintenance-stat-card">

        <h3>Total Vehicles</h3>

        <h1>{cars.length}</h1>

    </div>

    <div className="maintenance-stat-card warning-card">

        <h3>Service Due</h3>

        <h1>

            {

                cars.filter(

                    (car) =>

                    car.maintenanceStatus
                    === "Service Due"

                ).length

            }

        </h1>

    </div>

    <div className="maintenance-stat-card repair-card">

        <h3>Under Repair</h3>

        <h1>

            {

                cars.filter(

                    (car) =>

                    car.maintenanceStatus
                    === "Under Repair"

                ).length

            }

        </h1>

    </div>

</div>

<div className="premium-maintenance-grid">

    {cars.map((item) => {

        const isOverdue =

            item.nextServiceDate &&

            new Date(item.nextServiceDate)
            < new Date();

        return (

            <div
                className="premium-maintenance-card"
                key={item._id}
            >

                <div className="maintenance-top">

                    <div>

                        <h2>{item.name}</h2>

                        <p>{item.brand}</p>

                    </div>

                    <span
                        className={

                            item.maintenanceStatus
                            === "Good"

                            ? "status-good"

                            : item.maintenanceStatus
                            === "Service Due"

                            ? "status-due"

                            : "status-repair"

                        }
                    >

                        {

                            item.maintenanceStatus
                            || "Good"

                        }

                    </span>

                </div>

                <div className="maintenance-info">

                    <div>

                        <h4>Maintenance Cost</h4>

                        <p>

                            ₹

                            {

                                item.maintenanceCost
                                || 0

                            }

                        </p>

                    </div>

                    <div>

                        <h4>Last Service</h4>

                        <p>

                            {

                                item.lastServiceDate
                                || "Not Serviced"

                            }

                        </p>

                    </div>

                    <div>

                        <h4>Next Service</h4>

                        <p>

                            {

                                item.nextServiceDate
                                || "Not Scheduled"

                            }

                        </p>

                    </div>

                </div>

                {

                    isOverdue && (

                        <div className="overdue-box">

                            ⚠ Service Overdue

                        </div>

                    )

                }

{

editingId === item._id

?

<div className="maintenance-edit-form">

    <select
        value={status}
        onChange={(e) =>
            setStatus(e.target.value)
        }
    >

        <option>Good</option>

        <option>Service Due</option>

        <option>Under Repair</option>

    </select>

    <input
        type="number"
        placeholder="Maintenance Cost"
        value={cost}
        onChange={(e) =>
            setCost(e.target.value)
        }
    />

    <input
        type="date"
        value={lastService}
        onChange={(e) =>
            setLastService(e.target.value)
        }
    />

    <input
        type="date"
        value={nextService}
        onChange={(e) =>
            setNextService(e.target.value)
        }
    />

    <button
        className="save-maintenance-btn"
        onClick={() =>
            updateMaintenance(item._id)
        }
    >

        Save Maintenance

    </button>

</div>

:

<button
    className="maintenance-edit-btn"
    onClick={() =>
        startEdit(item)
    }
>

    Edit Maintenance

</button>

}
            </div>

        );

    })}

</div>

</>

);

}

export default Maintenance;