import React, {Component} from "react";
import "./Die.css";

class Die extends Component {
    render() {
        let val = this.props.val;
        return (
            <div
                className={`fas fa-dice-${
                    val === 1 ? "one" : val === 2 ? "two" :
                        val === 3 ? "three" : val === 4 ? "four" :
                            val === 5 ? "five" : val === 6 ? "six" : null}
                            Die ${this.props.locked ? 'Die-locked' : null} 
                            ${!this.props.hasStarted || this.props.isRolling ? 'Die-unclickable' : null}
                            ${this.props.isRolling && !this.props.locked ? 'Die-rolling' : null}`}
                onClick={() => !this.props.isRolling && this.props.hasStarted ? this.props.handleClick(this.props.idx) : null}
            />

        );
    }
}

export default Die;
