import React, {Component} from 'react';
import './RuleRow.css'

class RuleRow extends Component {
    render() {
        const completed = this.props.score !== undefined;

        return (
            <tr className={`RuleRow ${completed ? 'RuleRow-disabled' : 'RuleRow-active'} ${!this.props.hasStarted || this.props.isRolling ? 'RuleRow-unclickable' : ''}`}
                onClick={completed || !this.props.hasStarted || this.props.isRolling ? null : this.props.doScore}>
                <td className="RuleRow-name">{this.props.name}</td>
                <td className="RuleRow-score">{completed ? this.props.score : this.props.description}</td>
            </tr>
        )
    }
}

export default RuleRow;
