import React, {Component} from 'react';
import './ScoreDisplay.css'

class ScoreDisplay extends Component {
    render() {
        return (
            <div className={'ScoreDisplay'}>
                {this.props.gameOver && <p>Game Over</p>}
                <p>Total Score: {this.props.totalScore}</p>
            </div>
        );
    }
}

export default ScoreDisplay;
