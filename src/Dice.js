import React, {Component} from 'react';
import Die from './Die';
import './Dice.css';

class Dice extends Component {
    render() {
        const {dice, handleClick, locked, hasStarted, isRolling, gameOver} = this.props;
        return <div className="Dice">
            {dice.map((d, idx) =>
                <Die handleClick={handleClick}
                     val={d}
                     locked={locked[idx]}
                     idx={idx}
                     key={idx}
                     hasStarted={hasStarted}
                     isRolling={isRolling}
                     gameOver={gameOver}/>
            )}
        </div>
    }
}

export default Dice;
