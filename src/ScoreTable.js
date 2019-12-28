import React, {Component} from 'react';
import RuleRow from './RuleRow';
import './ScoreTable.css';
import {
    ones,
    twos,
    threes,
    fours,
    fives,
    sixes,
    threeOfKind,
    fourOfKind,
    fullHouse,
    smallStraight,
    largeStraight,
    yahtzee,
    chance
} from './Rules';


class ScoreTable extends Component {

    render() {
        const {scores, doScore} = this.props;

        return (
            <div className="ScoreTable">
                <section className="ScoreTable-section">
                    <h2>Upper</h2>
                    <table cellSpacing="0">
                        <tbody>
                        <RuleRow isRolling={this.props.isRolling} hasStarted={this.props.hasStarted} name="Ones"
                                 score={scores.ones}
                                 doScore={() => doScore("ones", ones.evalRoll)}
                                 description={ones.description}/>
                        <RuleRow  isRolling={this.props.isRolling} hasStarted={this.props.hasStarted} name="Twos"
                                 score={scores.twos}
                                 doScore={() => doScore("twos", twos.evalRoll)}
                                 description={twos.description}/>
                        <RuleRow isRolling={this.props.isRolling} hasStarted={this.props.hasStarted} name="Threes"
                                 score={scores.threes}
                                 doScore={() => doScore("threes", threes.evalRoll)}
                                 description={threes.description}/>
                        <RuleRow  isRolling={this.props.isRolling} hasStarted={this.props.hasStarted} name="Fours"
                                 score={scores.fours}
                                 doScore={() => doScore("fours", fours.evalRoll)}
                                 description={fours.description}/>
                        <RuleRow isRolling={this.props.isRolling} hasStarted={this.props.hasStarted} name="Fives"
                                 score={scores.fives}
                                 doScore={() => doScore("fives", fives.evalRoll)}
                                 description={fives.description}/>
                        <RuleRow  isRolling={this.props.isRolling} hasStarted={this.props.hasStarted} name="Sixes"
                                 score={scores.sixes}
                                 doScore={() => doScore("sixes", sixes.evalRoll)}
                                 description={sixes.description}/>
                        </tbody>
                    </table>
                </section>
                <section className="ScoreTable-section ScoreTable-section-lower">
                    <h2>Lower</h2>
                    <table cellSpacing="0">
                        <tbody>
                        <RuleRow key={this.props.val} isRolling={this.props.isRolling} hasStarted={this.props.hasStarted}
                                 name="Three of a Kind" score={scores.threeOfKind}
                                 doScore={() => doScore("threeOfKind", threeOfKind.evalRoll)}
                                 description={threeOfKind.description}/>
                        <RuleRow isRolling={this.props.isRolling} hasStarted={this.props.hasStarted}
                                 name="Four of a Kind" score={scores.fourOfKind}
                                 doScore={() => doScore("fourOfKind", fourOfKind.evalRoll)}
                                 description={fourOfKind.description}/>
                        <RuleRow isRolling={this.props.isRolling} hasStarted={this.props.hasStarted} name="Full House"
                                 score={scores.fullHouse}
                                 doScore={evt => doScore("fullHouse", fullHouse.evalRoll)}
                                 description={fullHouse.description}/>
                        <RuleRow isRolling={this.props.isRolling} hasStarted={this.props.hasStarted}
                                 name="Small Straight" score={scores.smallStraight}
                                 doScore={() => doScore("smallStraight", smallStraight.evalRoll)}
                                 description={smallStraight.description}/>
                        <RuleRow isRolling={this.props.isRolling} hasStarted={this.props.hasStarted}
                                 name="Large Straight" score={scores.largeStraight}
                                 doScore={() => doScore("largeStraight", largeStraight.evalRoll)}
                                 description={largeStraight.description}/>
                        <RuleRow isRolling={this.props.isRolling} hasStarted={this.props.hasStarted} name="Yahtzee"
                                 score={scores.yahtzee}
                                 doScore={() => doScore("yahtzee", yahtzee.evalRoll)}
                                 description={yahtzee.description}/>
                        <RuleRow isRolling={this.props.isRolling} hasStarted={this.props.hasStarted} name="Chance"
                                 score={scores.chance}
                                 doScore={() => doScore("chance", chance.evalRoll)}
                                 description={chance.description}/>
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}

export default ScoreTable;
