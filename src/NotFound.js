import React, {Component} from "react";
import "./NotFound.css";

class NotFound extends Component {
    onClick = () => {
        console.log("this", this);

    };

    render() {
        return (
            <div className="NotFound">
                <div>
                    <h2>NotFound</h2>
                </div>
            </div>
        );
    }

}

export default NotFound;
