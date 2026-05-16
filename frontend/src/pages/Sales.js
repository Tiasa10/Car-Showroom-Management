import "./Sales.css";

import {
    useEffect,
    useState
}
from "react";

import axios from "axios";

function Sales({ cars }) {

    const [sales,
    setSales] =
    useState([]);

    const [customerName,
    setCustomerName] =
    useState("");

    const [vehicle,
    setVehicle] =
    useState("");

    const [vehiclePrice,
    setVehiclePrice] =
    useState("");

    const [amountPaid,
    setAmountPaid] =
    useState("");

    const [emiMonths,
    setEmiMonths] =
    useState("");

    const [invoiceDate,
    setInvoiceDate] =
    useState("");

    const [emiDate,
        setEmiDate] =
        useState("");

    useEffect(() => {

        fetchSales();

    }, []);

    const fetchSales =
    async () => {

        try {

            const response =
            await axios.get(
                "http://localhost:5000/sales"
            );

            setSales(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    };

    const gstAmount =
    Number(vehiclePrice) * 0.18;

    const totalAmount =
    Number(vehiclePrice) + gstAmount;

    const pendingDue =Math.max(totalAmount-Number(amountPaid),0);

    const emiPerMonth =
    emiMonths > 0 ? Math.floor(pendingDue / emiMonths):0;

    const createSale =
    async () => {

        try {

            console.log({

                customerName,
            
                vehicle,
            
                vehiclePrice,
            
                amountPaid,
            
                emiMonths,
            
                emiDate,
            
                invoiceDate
            
            });

            if (

                !customerName ||
            
                !vehicle ||
            
                !invoiceDate
            
            ) {
            
                alert(
                    "Fill all required fields"
                );
            
                return;
            
            }

            await axios.post(
                "http://localhost:5000/sales",
                {

                    customerName,
                    vehicle,
                    vehiclePrice,
                    gstAmount,
                    totalAmount,
                    amountPaid,
                    pendingDue,
                    emiMonths,
                    emiPerMonth,
                    emiDate,
                    invoiceDate,                
                    paymentStatus:

                    pendingDue > 0

                    ?

                    "Pending"

                    :

                    "Paid"

                }
            );

            fetchSales();

            setCustomerName("");

            setVehicle("");

            setVehiclePrice("");

            setAmountPaid("");

            setEmiMonths("");

            setInvoiceDate("");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>

        <div className="sales-header">

            <h1>

                Sales Management

            </h1>

            <p>

                Generate invoices,
                GST and EMI details

            </p>

        </div>

        <div className="sales-form">

            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) =>
                    setCustomerName(
                        e.target.value
                    )
                }
            />

            <select
 
    value={vehicle}

    onChange={(e) => {

        const selectedVehicle = e.target.value;

        setVehicle(
            selectedVehicle
        );

        const selectedCar =

        cars?.find(
            (car) =>
            car.name ===
            selectedVehicle
        );
        
        if (selectedCar) {
        
            setVehiclePrice(
                selectedCar.price
            );
        
        }

    }}
>

    <option value="">

        Select Vehicle

    </option>

    {

        cars?.map((car) => (

            <option
                key={car._id}
                value={car.name}
            >

                {car.name}

            </option>

        ))

    }

</select>
                        

<input
    type="text"

    placeholder="Vehicle Price"

    value={

        Number(vehiclePrice)
        .toLocaleString("en-IN")

    }

    readOnly
/>


<input
    type="text"

    placeholder="Amount Paid"

    value={

        amountPaid
        ? Number(
            amountPaid
          ).toLocaleString("en-IN")
        : ""

    }

    onChange={(e) => {

        const rawValue =

        e.target.value
        .replace(/,/g, "");

        if (!isNaN(rawValue)) {

            setAmountPaid(
                rawValue
            );

        }

    }}
/>
<div className="small-field">

<label className="field-title">

EMI Months

</label>

    <input
        type="number"

        placeholder="EMI Months (Optional)"

        value={emiMonths}

        onChange={(e) =>
            setEmiMonths(
                e.target.value
            )
        }
    />

</div>

<div className="date-field">

    <label className="field-title">

        Purchase Date

    </label>

    <input
        type="date"

        value={invoiceDate}

        onChange={(e) =>
            setInvoiceDate(
                e.target.value
            )
        }
    />

</div>

            <div className="sales-calculation-box">

                <p>

                    GST (18%):
                    ₹
                    {

                        gstAmount
                        .toLocaleString("en-IN")

                    }

                </p>

                <p>

                    Total Amount:
                    ₹
                    {

                        totalAmount
                        .toLocaleString("en-IN")

                    }

                </p>

                <p>

                    Pending Due:
                    ₹
                    {

                        pendingDue
                        .toLocaleString("en-IN")

                    }

                </p>

                <p>

                    EMI Per Month:
                    ₹
                    {

                        emiPerMonth
                        .toFixed(0)

                    }

                </p>

            </div>

            <div className="date-field">

<label className="field-title">

    EMI Payment Date

</label>


<input
    type="date"

    value={emiDate}

    onChange={(e) =>
        setEmiDate(
            e.target.value
        )
    }
/>

</div>

            <button
                onClick={createSale}
            >


                Generate Invoice

            </button>

        </div>

        <div className="sales-grid">

            {

                sales.map((sale) => (

                    <div
                        className="sale-card"
                        key={sale._id}
                    >

<p>

🗓 Purchase Date:
{" "}
{sale.invoiceDate}

</p>

                        <h2>

                            {sale.customerName}

                        </h2>

                        <p>

                            🚗
                            {" "}
                            {sale.vehicle}

                        </p>

                        <p>

                            💰 Total:
                            ₹
                            {" "}
                            {

                                Number(
                                    sale.totalAmount
                                )
                                .toLocaleString("en-IN")

                            }

                        </p>

                        <p>

                            📉 Due:
                            ₹
                            {" "}
                            {

                                Number(
                                    sale.pendingDue
                                )
                                .toLocaleString("en-IN")

                            }

                        </p>

                        <p>

                            📆 EMI:
                            <p>
                                🗓 Purchased On:
                                 {" "}
                                {sale.invoiceDate}

                            </p>
                            ₹
                            {" "}
                            {

                                Number(
                                    sale.emiPerMonth
                                )
                                .toFixed("en-IN")

                            }

                            /month

                        </p>

                        <div className="sale-bottom">

                            <span
                            className={

                                sale.paymentStatus
                                === "Paid"

                                ?

                                "paid-badge"

                                :

                                "pending-badge"

                            }
                            >

                                {

                                    sale.paymentStatus

                                }

                            </span>

                        </div>

                    </div>

                ))

            }

        </div>

        </>

    );

}

export default Sales;