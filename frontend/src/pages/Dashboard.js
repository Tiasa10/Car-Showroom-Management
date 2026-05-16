import "./Dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";


function Dashboard({
    totalCars,
    totalBrands,
    totalValue,
    filteredCars
  }) {
  
    const goodVehicles = filteredCars.filter(

      (car) =>
  
          car.maintenanceStatus === "Good"
  
  ).length;
  
  const dueVehicles = filteredCars.filter(
  
      (car) =>
  
          car.maintenanceStatus === "Service Due"
  
  ).length;
  
  const repairVehicles = filteredCars.filter(
  
      (car) =>
  
          car.maintenanceStatus === "Under Repair"
  
  ).length;
  
  const chartData = [
  
      {
          name: "Good",
          value: goodVehicles
      },
  
      {
          name: "Service Due",
          value: dueVehicles
      },
  
      {
          name: "Under Repair",
          value: repairVehicles
      }
  
  ];
  
  const COLORS = [
  
      "#00C49F",
      "#FFBB28",
      "#FF4444"
  
  ];
  const brandCounts = {};

filteredCars.forEach((car) => {

    if (brandCounts[car.brand]) {

        brandCounts[car.brand]++;

    } else {

        brandCounts[car.brand] = 1;

    }

});

const topBrands = Object.entries(brandCounts);
const recentActivities = filteredCars.slice(0, 5);

const soldCars = filteredCars.filter(
  (car) =>
  car.availability === "Sold"
).length;

const availableCars = filteredCars.filter(
  (car) =>
  car.availability !== "Sold"
).length;

const lowStockCars = filteredCars.filter(
  (car) =>
  car.stockQuantity <= 2
).length;

const totalRevenue = filteredCars
  .filter(
      (car) =>
      car.availability === "Sold"
  )

  .reduce(
      (sum, car) =>
      sum + Number(car.price),
      0
  );
  const totalProfit = Math.floor(
    totalRevenue * 0.18
);

const pendingBookings = 7;

    return (
  
      <>
      

      <div className="dashboard-header">
      
          <div>
      
              <h1 className="dashboard-title">
      
                  DASHBOARD OVERVIEW
      
              </h1>
      
          </div>
      
          <div className="dashboard-search">
      
              <input
                  type="text"
                  placeholder="Search vehicles, brands..."
              />
      
          </div>
      
      </div>
      
      <div className="welcome-banner">
      
          <div>
      
              <h2>
      
                  WELCOME TO THE SHOWROOM
      
              </h2>
      
              <p>
      
                  Your showroom has
                  {" "}
                  {totalCars}
                  {" "}
                  vehicles across
                  {" "}
                  {totalBrands}
                  {" "}
                  premium brands today.
      
              </p>
      
          </div>
      
          <button className="add-vehicle-btn">
      
              + Add New Vehicle
      
          </button>
      
      </div>
      
      <div className="modern-stats-grid">
      
          <div className="modern-stat-card">
      
              <h3>Total Vehicles</h3>
      
              <h1>{totalCars}</h1>
      
          </div>
      
          <div className="modern-stat-card">
      
              <h3>Total Brands</h3>
      
              <h1>{totalBrands}</h1>
      
          </div>
      
          <div className="modern-stat-card">
      
              <h3>Inventory Value</h3>
      
              <h1>
      
                  ₹{totalValue.toLocaleString("en-IN")}
      
              </h1>
      
          </div>
      
          <div className="modern-stat-card">
      
              <h3>Service Due</h3>
      
              <h1>{dueVehicles}</h1>
      
          </div>

          <div className="modern-stat-card">

    <h3>Cars Sold</h3>

    <h1>{soldCars}</h1>

</div>

<div className="modern-stat-card">

    <h3>Available Cars</h3>

    <h1>{availableCars}</h1>

</div>

<div className="modern-stat-card">

    <h3>Pending Bookings</h3>

    <h1>{pendingBookings}</h1>

</div>

<div className="modern-stat-card warning-card">

    <h3>Low Stock Alerts</h3>

    <h1>{lowStockCars}</h1>

</div>

<div className="modern-stat-card revenue-card">
<div className="modern-stat-card profit-card">

<h3>Total Profit</h3>

<h1>

    ₹

    {

        totalProfit
        .toLocaleString("en-IN")

    }

</h1>

</div>

    <h3>Total Revenue</h3>

    <h1>

        ₹

        {

            totalRevenue
            .toLocaleString("en-IN")

        }

    </h1>

</div>
      
      </div>
      
      <div className="analytics-grid">

    <div className="analytics-card">

        <h2 className="widget-title">

            VEHICLE STATUS

        </h2>

        <div className="chart-layout">

            <div className="donut-chart-wrapper">

                <PieChart width={280} height={280}>

                    <Pie
                        data={chartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                    >

                        {chartData.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                </PieChart>

                <div className="chart-center-text">

                    <h1>{totalCars}</h1>

                    <p>vehicles</p>

                </div>

            </div>

            <div className="custom-legend">

                <div>

                    <span
                        className="legend-dot"
                        style={{
                            backgroundColor: "#00E0C6"
                        }}
                    ></span>

                    Good

                    <strong>{goodVehicles}</strong>

                </div>

                <div>

                    <span
                        className="legend-dot"
                        style={{
                            backgroundColor: "#FFB020"
                        }}
                    ></span>

                    Service Due

                    <strong>{dueVehicles}</strong>

                </div>

                <div>

                    <span
                        className="legend-dot"
                        style={{
                            backgroundColor: "#FF4D4D"
                        }}
                    ></span>

                    Under Repair

                    <strong>{repairVehicles}</strong>

                </div>

            </div>

        </div>

    </div>

    <div className="analytics-card">

<h2 className="widget-title">

    TOP VEHICLE BRANDS

</h2>

<div className="brands-widget">

    {topBrands.map(([brand, count]) => (

        <div
            className="brand-row"
            key={brand}
        >

            <div className="brand-info">

                <h3>{brand}</h3>

                <p>

                    {count}
                    {" "}
                    vehicles

                </p>

            </div>

            <div className="brand-bar-wrapper">

                <div
                    className="brand-bar"
                    style={{
                        width: `${count * 20}px`
                    }}
                ></div>

            </div>

        </div>

    ))}

</div>

</div>

      
</div>

<div className="activity-section">
  

    <div className="activity-card">

        <h2 className="widget-title">

            RECENT ACTIVITY

        </h2>

        <div className="activity-list">

            {recentActivities.map((car) => (

                <div
                    className="activity-item"
                    key={car._id}
                >

                    <div className="activity-icon">

                        🚗

                    </div>

                    <div className="activity-content">

                        <h3>

                            {car.name}

                        </h3>

                        <p>

                            {car.brand}
                            {" "}
                            vehicle added to inventory

                        </p>

                    </div>

                </div>

            ))}

        </div>

    </div>

</div>

<div className="dashboard-section">

    <div className="dashboard-panel">

        <h2>

            Low Stock Vehicles

        </h2>

        {

            filteredCars

            .filter(
                (car) =>
                car.stockQuantity <= 2
            )

            .slice(0, 5)

            .map((car) => (

                <div
                    className="activity-item"
                    key={car._id}
                >

                    <p>

                        {car.name}

                    </p>

                    <span>

                        Only
                        {" "}
                        {car.stockQuantity}
                        {" "}
                        left in stock

                    </span>

                </div>

            ))

        }

    </div>

    <div className="dashboard-panel">

        <h2>

            Sold Vehicles

        </h2>

        {

            filteredCars

            .filter(
                (car) =>
                car.availability === "Sold"
            )

            .slice(0, 5)

            .map((car) => (

                <div
                    className="activity-item"
                    key={car._id}
                >

                    <p>

                        {car.name}

                    </p>

                    <span>

                        Sold for
                        {" "}
                        ₹

                        {

                            Number(car.price)
                            .toLocaleString("en-IN")

                        }

                    </span>

                </div>

            ))

        }

    </div>

</div>

</>

);

}

export default Dashboard;