import React, {Component} from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import ScoreDisplay from "./ScoreDisplay";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dice: [1, 2, 3, 4, 5],
            locked: Array(NUM_DICE).fill(false),
            rollsLeft: NUM_ROLLS,
            scores: {
                ones: undefined,
                twos: undefined,
                threes: undefined,
                fours: undefined,
                fives: undefined,
                sixes: undefined,
                threeOfKind: undefined,
                fourOfKind: undefined,
                fullHouse: undefined,
                smallStraight: undefined,
                largeStraight: undefined,
                yahtzee: undefined,
                chance: undefined
            },
            hasStarted: false,
            isRolling: false,
            totalScore: 0,
            scoresLeft: 13,
            gameOver: false
        };
        this.roll = this.roll.bind(this);
        this.doScore = this.doScore.bind(this);
        this.toggleLocked = this.toggleLocked.bind(this);
        this.restartGame = this.restartGame.bind(this);

    }

    restartGame() {
        this.setState({
            dice: [1, 2, 3, 4, 5],
            locked: Array(NUM_DICE).fill(false),
            rollsLeft: NUM_ROLLS,
            scores: {
                ones: undefined,
                twos: undefined,
                threes: undefined,
                fours: undefined,
                fives: undefined,
                sixes: undefined,
                threeOfKind: undefined,
                fourOfKind: undefined,
                fullHouse: undefined,
                smallStraight: undefined,
                largeStraight: undefined,
                yahtzee: undefined,
                chance: undefined
            },
            hasStarted: false,
            isRolling: false,
            totalScore: 0,
            scoresLeft: 13,
            gameOver: false
        });
    }

    roll(evt) {
        // roll dice whose indexes are in reroll
        this.setState(st => ({
            isRolling: true,
            hasStarted: true,
            dice: st.dice.map((d, i) =>
                st.locked[i] ? d : Math.ceil(Math.random() * 6) // if the dice is locked, keep as it is
            ),
            rollsLeft: st.rollsLeft - 1
        }));
        setTimeout(() => {
            this.setState((st) => ({
                isRolling: false,
                locked: st.rollsLeft >= 1 ? st.locked : Array(NUM_DICE).fill(true)
            }));
        }, 1000);
    }

    toggleLocked(idx) {
        // toggle whether idx is in locked or not
        if (this.state.rollsLeft > 0)
            this.setState(st => ({
                locked: [
                    ...st.locked.slice(0, idx),
                    !st.locked[idx],
                    ...st.locked.slice(idx + 1)
                ]
            }));
    }

    doScore(rulename, ruleFn) {
        // evaluate this ruleFn with the dice and score this rulename
        let points = ruleFn(this.state.dice);
        this.setState(st => ({
            scores: {...st.scores, [rulename]: points},
            rollsLeft: NUM_ROLLS,
            locked: Array(NUM_DICE).fill(false),// When a score is chosen, reset all dices to unlocked
            totalScore: st.totalScore + points,
            scoresLeft: st.scoresLeft - 1,
            gameOver: st.scoresLeft <= 1
        }));
        this.roll(); // re-roll automatically when a score is chosen
    }

    render() {
        return (
            <div className='Game'>
                <header className='Game-header'>
                    <h1 className='App-title'>Yahtzee!</h1>

                    <section className='Game-dice-section'>
                        <Dice
                            dice={this.state.dice}
                            locked={this.state.locked}
                            handleClick={this.toggleLocked}
                            hasStarted={this.state.hasStarted}
                            isRolling={this.state.isRolling}
                        />
                        <div className='Game-button-wrapper'>
                            <button
                                className='Game-reroll'
                                disabled={(this.state.locked.every(x => x) ||
                                    this.state.rollsLeft <= 0) && !this.state.gameOver}
                                onClick={this.state.isRolling ? null : (this.state.gameOver ? this.restartGame : this.roll)}
                            >
                                {this.state.gameOver ? "Play Again?" : !this.state.hasStarted ? "Roll To Start!" : this.state.isRolling ?
                                    "Rolling..." : this.state.rollsLeft + ` Roll${this.state.rollsLeft !== 1 ? 's' : ''} Left`}
                            </button>
                        </div>
                    </section>
                </header>
                <ScoreTable isRolling={this.state.isRolling} hasStarted={this.state.hasStarted} doScore={this.doScore}
                            scores={this.state.scores}/>
                <ScoreDisplay
                    totalScore={this.state.totalScore}
                    gameOver={this.state.gameOver}/>
            </div>
        );
    }
}

export default Game;