import { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./Vehicles.css";

function Vehicles({

    cars,
    fetchCars,
    search,
    setSearch

}) {

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const [fuelType, setFuelType] = useState("");
    const [transmission, setTransmission] = useState("");
    const [mileage, setMileage] =useState("")
    const [color, setColor] =useState("");
    const [year, setYear] =useState("");

    const [stockQuantity, setStockQuantity] =useState("");
    const [engineDetails, setEngineDetails] =useState("");
    const [features, setFeatures] =useState("");
    const [emiPrice, setEmiPrice] =useState("");

    const [availability, setAvailability] = useState("Available");

    const [selectedStatus, setSelectedStatus] = useState("All");
    const [availabilityFilter,setAvailabilityFilter] = useState("All");
    const [editingId, setEditingId] = useState(null);
  

    const addCar = async (e) => {

        console.log("ADD BUTTON CLICKED");

        e.preventDefault();
    
        try {
    

            await axios.post("http://localhost:5000/cars", {
                name,
                brand,
                price,
                image,

                fuelType,
                transmission,
                mileage,
                color,
                year,
                stockQuantity,
                engineDetails,
                features,
                emiPrice, 
                availability
            });

            setName("");
            setBrand("");
            setPrice("");
            setImage("");

            fetchCars();

        } catch (error) {

            console.log(error);

        }

    };

    const deleteCar = async (id) => {

        try {

            await axios.delete(`http://localhost:5000/cars/${id}`);

            fetchCars();

        } catch (error) {

            console.log(error);

        }

    };

    const startEdit = (car) => {

        console.log(car);
    
        setEditingId(car._id);
    
        setName(car.name);
        setBrand(car.brand);
        setPrice(car.price);
        setImage(car.image);
    
        setFuelType(car.fuelType || "");
        setTransmission(car.transmission || "");
        setMileage(car.mileage || "");
        setColor(car.color || "");
        setYear(car.year || "");
    
        setStockQuantity(
            car.stockQuantity || ""
        );
    
        setEngineDetails(
            car.engineDetails || ""
        );
    
        setFeatures(
            car.features || ""
        );
    
        setEmiPrice(
            car.emiPrice || ""
        );
    
        setAvailability(
            car.availability || "Available"
        );
    
    };

    const updateCar = async (id) => {

        try {

            await axios.put(`http://localhost:5000/cars/${editingId}`, 
            {
                name,
                brand,
                price,
                image,

                fuelType,
                transmission,
                mileage,
                color,
                year,
                stockQuantity,
                engineDetails,
                features,
                emiPrice, 
                availability
            });

            setEditingId(null);

            setName("");
            setBrand("");
            setPrice("");
            setImage("");

            fetchCars();

        } catch (error) {

            console.log(error);

        }

    };

    const filteredCars = cars.filter((car) => {

        const matchesSearch = car.name
            .toLowerCase()
            .includes(search.toLowerCase());
    
        const matchesStatus =
    
            selectedStatus === "All"
    
            ||
    
            car.maintenanceStatus === selectedStatus;
    
        const matchesAvailability =
    
            availabilityFilter === "All"
    
            ||
    
            car.availability === availabilityFilter;
    
        return (
    
            matchesSearch
    
            &&
    
            matchesStatus
    
            &&
    
            matchesAvailability
    
        );
    
    });

    return (

        <>

        <div className="vehicles-header">
        
            <h1>
        
                Vehicle Management
        
            </h1>
        
            <div className="vehicles-actions">
        
                <input
                    type="text"
                    placeholder="Search vehicles..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />
        
            </div>
        
        </div>
        
        <div className="status-filters">

        <button
    className={
        availabilityFilter === "All"
        ? "active-filter"
        : ""
    }
    onClick={() =>
        setAvailabilityFilter("All")
    }
>

    All Inventory

</button>

        <button
    className={
        availabilityFilter === "Sold"
        ? "active-filter"
        : ""
    }
    onClick={() =>
        setAvailabilityFilter("Sold")
    }
>

    Sold

</button>

<button
    className={
        availabilityFilter === "Available"
        ? "active-filter"
        : ""
    }
    onClick={() =>
        setAvailabilityFilter("Available")
    }
>

    Available

</button>
        
        <button
    className={
        selectedStatus === "All"
        ? "active-filter"
        : ""
    }
    onClick={() =>
        setSelectedStatus("All")
    }
>

    All Vehicles

</button>
        
<button
    className={
        selectedStatus === "Good"
        ? "active-filter"
        : ""
    }
    onClick={() =>
        setSelectedStatus("Good")
    }
>

    Good

</button>
        
<button
    className={
        selectedStatus === "Service Due"
        ? "active-filter"
        : ""
    }
    onClick={() =>
        setSelectedStatus("Service Due")
    }
>

    Service Due

</button>
        
<button
    className={
        selectedStatus === "Under Repair"
        ? "active-filter"
        : ""
    }
    onClick={() =>
        setSelectedStatus("Under Repair")
    }
>

    Under Repair

</button>
        
        </div>
        
        <div className="vehicle-form-card">
        
        <input
    type="text"
    placeholder="Enter Car Name"
    value={name}
    onChange={(e) =>
        setName(e.target.value)
    }
/>
        
<input
    type="text"
    placeholder="Enter Brand"
    value={brand}
    onChange={(e) =>
        setBrand(e.target.value)
    }
/>
        
<input
    type="number"
    placeholder="Enter Price"
    value={price}
    onChange={(e) =>
        setPrice(e.target.value)
    }
/>

<input
    type="text"
    placeholder="Enter Image URL"
    value={image}
    onChange={(e) =>
        setImage(e.target.value)
    }
/>

<input
    type="text"
    placeholder="Fuel Type"
    value={fuelType}
    onChange={(e) =>
        setFuelType(e.target.value)
    }
/>

<input
    type="text"
    placeholder="Transmission"
    value={transmission}
    onChange={(e) =>
        setTransmission(e.target.value)
    }
/>

<input
    type="text"
    placeholder="Mileage"
    value={mileage}
    onChange={(e) =>
        setMileage(e.target.value)
    }
/>

<input
    type="text"
    placeholder="Color"
    value={color}
    onChange={(e) =>
        setColor(e.target.value)
    }
/>

<input
    type="number"
    placeholder="Year"
    value={year}
    onChange={(e) =>
        setYear(e.target.value)
    }
/>

<input
    type="number"
    placeholder="Stock Quantity"
    value={stockQuantity}
    onChange={(e) =>
        setStockQuantity(e.target.value)
    }
/>

<input
    type="text"
    placeholder="Engine Details"
    value={engineDetails}
    onChange={(e) =>
        setEngineDetails(e.target.value)
    }
/>

<input
    type="text"
    placeholder="Features"
    value={features}
    onChange={(e) =>
        setFeatures(e.target.value)
    }
/>

<input
    type="number"
    placeholder="EMI Price"
    value={emiPrice}
    onChange={(e) =>
        setEmiPrice(e.target.value)
    }
/>

<select
    value={availability}
    onChange={(e) =>
        setAvailability(e.target.value)
    }
>
    <option>Available</option>
    <option>Sold</option>
</select>
        
<button
    type="button"
    onClick={
        editingId
        ?
        updateCar
        :
        addCar
    }
>
    {
        editingId
        ?
        "Update Vehicle"
        :
        "+ Add Vehicle"
    }
</button>
        
        </div>
        
        <div className="premium-cars-grid">
        
            {filteredCars.map((car) => (
        
                <div
                className={

                    car.availability === "Sold"
                
                    ?
                
                    "premium-car-card sold-car"
                
                    :
                
                    "premium-car-card"
                
                }
                >
        
                    <div className="car-image-section">

                    {
                        car.availability === "Sold"
                        &&
                        <div className="sold-overlay">
                            SOLD
                        </div>
                    }

                        <img
                            src={car.image}
                            alt={car.name}
                        />
        
                    </div>
        
                    <div className="premium-car-content">

                    <p className={
                        car.availability === "Sold"
                        ? "sold-badge"
                        : "available-badge"
                    }>

                        {car.availability}

                    </p>
        
                        <div className="car-top-row">
        
                            <div>
        
                                <h2>{car.name}</h2>
        
                                <p>{car.brand}</p>
        
                            </div>
        
                            <span
                                className={
                                    car.maintenanceStatus === "Good"
                                    ? "status-good"
        
                                    : car.maintenanceStatus === "Service Due"
                                    ? "status-due"
        
                                    : "status-repair"
                                }
                            >
        
                                {car.maintenanceStatus || "Good"}
        
                            </span>
        
                        </div>
        
                        <h1 className="premium-price">
        
                            ₹{Number(car.price)
                                .toLocaleString("en-IN")}
        
                        </h1>

                        <p>Fuel: {car.fuelType}</p>
                        <p>Transmission: {car.transmission}</p>
                        <p>Mileage: {car.mileage}</p>
                        <p>Color: {car.color}</p>
                        <p>Year: {car.year}</p>

                        <p>Stock: {car.stockQuantity}</p>
                        <p>Engine: {car.engineDetails}</p>
                        <p>EMI: ₹{car.emiPrice}/month</p>
        
                        <div className="vehicle-actions">
        
                        <button
    onClick={() =>
        startEdit(car)
    }
>

    Edit

</button>    

<button
    onClick={() =>
        deleteCar(car._id)
    }
>
    Delete
</button>
        
                        </div>
        
                    </div>
        
                </div>
        
            ))}
        
        </div>
        
        </>

    );

}

export default Vehicles;