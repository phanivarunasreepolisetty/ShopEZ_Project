import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
    return (
        <div className="landing">
            <div className="overlay"></div>

            <div className="landing-content">
                <h1>
                    Welcome to <span>SHOPEZ</span>
                </h1>

                <p>
                    Discover trending fashion, electronics, groceries,
                    and everything you love — all in one place.
                </p>

                <Link to="/register">
                    <button className="start-btn">Start Shopping</button>
                </Link>
            </div>
        </div>
    );
}

export default Landing;
