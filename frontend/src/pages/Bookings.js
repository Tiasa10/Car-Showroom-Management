import "./Bookings.css";

import {
    useEffect,
    useState
}
from "react";

import axios from "axios";

function Bookings({ cars }) {

    const [bookings,
    setBookings] =
    useState([]);

    const [customerName,
    setCustomerName] =
    useState("");

    const [phone,
    setPhone] =
    useState("");

    const [vehicle,
    setVehicle] =
    useState("");

    const [bookingDate,
    setBookingDate] =
    useState("");

    const [bookingTime,
    setBookingTime] =
    useState("");

    const [bookingType,
    setBookingType] =
    useState("Vehicle Booking");

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings =
    async () => {

        try {

            const response =
            await axios.get(
                "http://localhost:5000/bookings"
            );

            setBookings(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    };

    const createBooking =
    async () => {

        try {

            await axios.post(
                "http://localhost:5000/bookings",
                {

                    customerName,
                    phone,
                    vehicle,
                    bookingDate,
                    bookingTime,
                    bookingType

                }
            );

            fetchBookings();

            setCustomerName("");

            setPhone("");

            setVehicle("");

            setBookingDate("");

            setBookingTime("");

            setBookingType(
                "Vehicle Booking"
            );

        } catch (error) {

            console.log(error);

        }

    };

    const cancelBooking =
    async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/bookings/${id}`
            );

            fetchBookings();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>

        <div className="bookings-header">

            <h1>

                Booking Center

            </h1>

            <p>

                Manage bookings
                and test drives

            </p>

        </div>

        <div className="booking-form">

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

            <input
                type="text"
                placeholder="Phone"
                value={phone}
                maxLength="10"
                onChange={(e) =>
                    setPhone(
                        e.target.value
                        .replace(/\D/g, "")
                    )
                }
            />

            <select
                value={vehicle}
                onChange={(e) =>
                    setVehicle(
                        e.target.value
                    )
                }
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
                type="date"
                value={bookingDate}
                onChange={(e) =>
                    setBookingDate(
                        e.target.value
                    )
                }
            />

            <input
                type="time"
                value={bookingTime}
                onChange={(e) =>
                    setBookingTime(
                        e.target.value
                    )
                }
            />

            <select
                value={bookingType}
                onChange={(e) =>
                    setBookingType(
                        e.target.value
                    )
                }
            >

                <option>

                    Vehicle Booking

                </option>

                <option>

                    Test Drive

                </option>

            </select>

            <button
                onClick={createBooking}
            >

                + Create Booking

            </button>

        </div>

        <div className="bookings-grid">

            {

                bookings.map((booking) => (

                    <div
                        className="booking-card"
                        key={booking._id}
                    >

                        <h2>

                            {

                                booking.customerName

                            }

                        </h2>

                        <p>

                            📞
                            {" "}
                            {booking.phone}

                        </p>

                        <p>

                            🚗
                            {" "}
                            {booking.vehicle}

                        </p>

                        <p>

                            📅
                            {" "}
                            {booking.bookingDate}

                        </p>

                        <p>

                            ⏰
                            {" "}
                            {booking.bookingTime}

                        </p>

                        <div className="booking-bottom">

                            <span className="booking-type">

                                {

                                    booking.bookingType

                                }

                            </span>

                            <span className="confirmed-badge">

                                Confirmed

                            </span>

                        </div>

                        <button
                            className="cancel-btn"
                            onClick={() =>
                                cancelBooking(
                                    booking._id
                                )
                            }
                        >

                            Cancel Booking

                        </button>

                    </div>

                ))

            }

        </div>

        </>

    );

}

export default Bookings;