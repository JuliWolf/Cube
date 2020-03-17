import React, {Component} from "react";

class CustomizedLabel extends Component {
    render () {
        const {x, y, stroke, value} = this.props;

        return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>
    }
}

export default CustomizedLabel;