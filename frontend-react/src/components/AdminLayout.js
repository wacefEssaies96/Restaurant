import { Outlet } from "react-router-dom";
import '../styles/adminLayout.css'

export default function AdminLayout() {
    return (
        <>
            <div className="image"></div>
            <div className="text">
                <div className="container-xxl p-2">
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="display-4">Administration</h1>
                            <p className="lead">Cette page est seulement pour l'administrateur</p>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>

        </>
    )
}