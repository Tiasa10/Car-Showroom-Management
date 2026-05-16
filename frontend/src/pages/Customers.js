import "./Customers.css";

import { useEffect, useState }
from "react";

import axios from "axios";

function Customers({ cars }) {

    

    const [customers, setCustomers] =
    useState([]);

    const [name, setName] =
    useState("");

    const [phone, setPhone] =
    useState("");

    const [email, setEmail] =
    useState("");

    const hasUppercase =
/[A-Z]/.test(email);

const hasLowercase =
/[a-z]/.test(email);

const isAlphaNumeric =
/^[A-Za-z0-9@gmail.]+$/
.test(email);

const hasNoSpecialChars =
/^[A-Za-z0-9]+@gmail\.com$/
.test(email);

const hasGmailEnding =
email.endsWith(
"@gmail.com"
);

    const [address, setAddress] =
    useState("");

    const [interestedVehicle,
    setInterestedVehicle] =
    useState("");

    const [purchasedVehicle,
    setPurchasedVehicle] =
    useState("");

    const [wishlist, setWishlist] =
    useState("");

    const [bookingStatus,
    setBookingStatus] =
    useState("Pending");

    const [paymentStatus,
    setPaymentStatus] =
    useState("Pending");

    useEffect(() => {

        fetchCustomers();

    }, []);

    const fetchCustomers =
    async () => {

        try {

            const response =
            await axios.get(
                "http://localhost:5000/customers"
            );

            setCustomers(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    };

    const addCustomer =
    async () => {

        try {

            await axios.post(
                "http://localhost:5000/customers",
                {

                    name,
                    phone,
                    email,
                    address,
                    interestedVehicle,
                    purchasedVehicle,
                    wishlist,
                    bookingStatus,
                    paymentStatus

                }
            );

            fetchCustomers();

            setName("");

        setPhone("");

        setEmail("");

        setAddress("");

        setInterestedVehicle("");

        setPurchasedVehicle("");

        setWishlist("");

        setBookingStatus("Pending");

        setPaymentStatus("Pending");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>

        <div className="customers-header">

            <div>

                <h1>

                    Customer Management

                </h1>

                <p>

                    Manage customer
                    records and bookings

                </p>

            </div>

        </div>

        <div className="customer-form-card">

            <input
                type="text"
                placeholder="Customer Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

<input
    type="text"
    placeholder="Phone"
    value={phone}

    maxLength="10"

    onChange={(e) => {

        const onlyNums =
        e.target.value.replace(
            /\D/g,
            ""
        );

        setPhone(
            onlyNums
        );

    }}
/>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

{
    email.length > 0 && (

<div className="validation-box">

    <p
    className={
        hasUppercase
        ?
        "valid-rule"
        :
        "invalid-rule"
    }
    >

        {

            hasUppercase

            ?

            "✅ Contains uppercase letter"

            :

            "❌ Must contain uppercase letter"

        }

    </p>

    <p
    className={
        hasLowercase
        ?
        "valid-rule"
        :
        "invalid-rule"
    }
    >

        {

            hasLowercase

            ?

            "✅ Contains lowercase letter"

            :

            "❌ Must contain lowercase letter"

        }

    </p>

    <p
    className={
        isAlphaNumeric
        ?
        "valid-rule"
        :
        "invalid-rule"
    }
    >

        {

            isAlphaNumeric

            ?

            "✅ Is alphanumeric"

            :

            "❌ Must be alphanumeric"

        }

    </p>

    <p
    className={
        hasNoSpecialChars
        ?
        "valid-rule"
        :
        "invalid-rule"
    }
    >

        {

            hasNoSpecialChars

            ?

            "✅ No special chars before @"

            :

            "❌ No special chars allowed before @"

        }

    </p>

    <p
    className={
        hasGmailEnding
        ?
        "valid-rule"
        :
        "invalid-rule"
    }
    >

        {

            hasGmailEnding

            ?

            "✅ Ends with @gmail.com"

            :

            "❌ Must end with @gmail.com"

        }

    </p>

</div>
    )
}
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) =>
                    setAddress(e.target.value)
                }
            />

<select
    value={interestedVehicle}

    onChange={(e) =>
        setInterestedVehicle(
            e.target.value
        )
    }
>

    <option value="">

        Select Vehicle

    </option>

    {
         cars &&
         cars.length > 0 &&

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
                placeholder="Purchased Vehicle"
                value={purchasedVehicle}
                onChange={(e) =>
                    setPurchasedVehicle(
                        e.target.value
                    )
                }
            />

            <input
                type="text"
                placeholder="Wishlist"
                value={wishlist}
                onChange={(e) =>
                    setWishlist(
                        e.target.value
                    )
                }
            />

            <select
                value={bookingStatus}
                onChange={(e) =>
                    setBookingStatus(
                        e.target.value
                    )
                }
            >

                <option>
                    Pending
                </option>

                <option>
                    Confirmed
                </option>

                <option>
                    Completed
                </option>

            </select>

            <select
                value={paymentStatus}
                onChange={(e) =>
                    setPaymentStatus(
                        e.target.value
                    )
                }
            >

                <option>
                    Pending
                </option>

                <option>
                    Paid
                </option>

            </select>

            <button
                onClick={addCustomer}
            >

                + Add Customer

            </button>

        </div>

        <div className="customers-grid">

            {

                customers.map((customer) => (

                    <div
                        className="customer-card"
                        key={customer._id}
                    >

                        <h2>

                            {customer.name}

                        </h2>

                        <p>

                            📞
                            {" "}
                            {customer.phone}

                        </p>

                        <p>

                            📧
                            {" "}
                            {customer.email}

                        </p>

                        <p>

                            🚘 Interested:
                            {" "}
                            {customer.interestedVehicle}

                        </p>

                        <p>

                            🛒 Purchased:
                            {" "}
                            {customer.purchasedVehicle}

                        </p>

                        <p>

                            ❤️ Wishlist:
                            {" "}
                            {customer.wishlist}

                        </p>

                        <div className="customer-status-row">

                        <span
className={

    customer.bookingStatus
    === "Confirmed"

    ?

    "confirmed-badge"

    :

    "pending-badge"

}
>

    {customer.bookingStatus}

</span>

                            <span
className={

    customer.paymentStatus
    === "Paid"

    ?

    "paid-badge"

    :

    "pending-badge"

}
>

    {customer.paymentStatus}

</span>

                        </div>

                    </div>

                ))

            }

        </div>

        </>

    );

}

export default Customers;