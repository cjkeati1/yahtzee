import React, {Component} from "react";
import "./Die.css";

class Die extends Component {
    render() {
        const {val, locked, isRolling, hasStarted, handleClick, gameOver, idx} = this.props;
        return (
            <div
                className={`fas fa-dice-${
                    val === 1 ? "one" : val === 2 ? "two" :
                        val === 3 ? "three" : val === 4 ? "four" :
                            val === 5 ? "five" : val === 6 ? "six" : null}
                            Die ${locked ? 'Die-locked' : null} 
                            ${!hasStarted || isRolling ? 'Die-unclickable' : null}
                            ${(isRolling) && !locked ? 'Die-rolling' : null}
                             ${gameOver ? "Die-rotating-forever" : null}`}
                onClick={() => !hasStarted || isRolling ? null : handleClick(idx)}
            />

        );
    }
}

export default Die;
