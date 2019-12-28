import React, {Component} from 'react';
import './ScoreDisplay.css'

class ScoreDisplay extends Component {
    render() {
        const {gameOver, totalScore} = this.props;

        return (
            <div className={'ScoreDisplay'}>
                {gameOver && <p>Game Over</p>}
                <p>{gameOver ? 'Final' : 'Total'} Score: {totalScore}</p>
            </div>
        );
    }
}

export default ScoreDisplay;
