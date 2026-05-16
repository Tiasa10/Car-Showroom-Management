import "./Settings.css";

function Settings() {

    return (

<>

<div className="settings-header">

    <h1>

        System Settings

    </h1>

    <p>

        Manage admin preferences
        and application controls

    </p>

</div>

<div className="settings-grid">

    <div className="settings-card">

        <h2>

            Admin Profile

        </h2>

        <div className="settings-form">

            <input
                type="text"
                placeholder="Admin Name"
            />

            <input
                type="email"
                placeholder="Admin Email"
            />

            <button>

                Update Profile

            </button>

        </div>

    </div>

    <div className="settings-card">

        <h2>

            Security

        </h2>

        <div className="settings-form">

            <input
                type="password"
                placeholder="New Password"
            />

            <input
                type="password"
                placeholder="Confirm Password"
            />

            <button>

                Change Password

            </button>

        </div>

    </div>

    <div className="settings-card">

        <h2>

            Notifications

        </h2>

        <div className="toggle-group">

            <div className="toggle-row">

                <p>

                    Service Alerts

                </p>

                <input type="checkbox" />

            </div>

            <div className="toggle-row">

                <p>

                    Maintenance Updates

                </p>

                <input type="checkbox" />

            </div>

            <div className="toggle-row">

                <p>

                    Inventory Notifications

                </p>

                <input type="checkbox" />

            </div>

        </div>

    </div>

    <div className="settings-card">

        <h2>

            Appearance

        </h2>

        <div className="theme-buttons">

            <button>Dark Mode</button>

            <button>Cyber Blue</button>

            <button>Neon Theme</button>

        </div>

    </div>

</div>

</>


);

}

export default Settings;