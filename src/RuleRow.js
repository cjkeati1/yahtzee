import React, {Component} from 'react';
import './RuleRow.css'

class RuleRow extends Component {
    render() {
        const {hasStarted, isRolling, doScore, description, name, score} = this.props;
        const completed = score !== undefined;

        return (
            <tr className={`RuleRow ${completed ? 'RuleRow-disabled' : 'RuleRow-active'} ${!hasStarted || isRolling ? 'RuleRow-unclickable' : ''}`}
                onClick={completed || !hasStarted || isRolling ? null : doScore}>
                <td className="RuleRow-name">{name}</td>
                <td className="RuleRow-score">{completed ? score : description}</td>
            </tr>
        )
    }
}

export default RuleRow;
