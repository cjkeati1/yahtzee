import React, {Component} from 'react';
import './RuleRow.css'

class RuleRow extends Component {
    constructor(props) {
        super(props);
        this.state = {completed: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({completed: true});
        this.props.doScore();
    }

    render() {
        return (
            <tr className={`RuleRow ${this.state.completed ? 'RuleRow-disabled' : 'RuleRow-active'} ${!this.props.hasStarted || this.props.isRolling ? 'RuleRow-unclickable' : ''}`}
                onClick={this.state.completed || !this.props.hasStarted || this.props.isRolling ? null : this.handleClick}>
                <td className="RuleRow-name">{this.props.name}</td>
                <td className="RuleRow-score">{this.state.completed ? this.props.score : this.props.description}</td>
            </tr>
        )
    }
}

export default RuleRow;
