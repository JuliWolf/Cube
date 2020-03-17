import React, {Component} from "react";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import CustomizedLabel from "./CustomLabel";
import Chart from "./Chart";
import numeral from "numeral";
import moment from "moment";
import cubejs from "@cubejs-client/core";

const numberFormatter = item => numeral(item).format("0,0");
const dateFormatter = item => moment(item).format("MMM YY");
const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
    apiUrl: process.env.REACT_APP_API_URL
});

export default class Country extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Chart
                cubejsApi={cubejsApi}
                title={"Injured in " + this.props.countryName}
                query={{
                    measures: ["Countries.deathStatus", "Countries.infectedStatus"],
                    timeDimensions: [
                        {
                            dimension: "History.date"
                        }
                    ]
                }}
                render={resultSet => (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={resultSet.chartPivot()}>
                            <XAxis dataKey="category" tickFormatter={dateFormatter} />
                            <YAxis tickFormatter={numberFormatter} />
                            <Tooltip labelFormatter={dateFormatter} />
                            <Line type="monotone" dataKey="History.totalAmount" name="History" stroke="rgb(106, 110, 229)" label={<CustomizedLabel />}/>
                            <Line type="monotone" dataKey="DeathHistory.totalAmount" name="DeathHistory" stroke="rgb(106, 110, 229)" label={<CustomizedLabel />}/>
                        </LineChart>
                    </ResponsiveContainer>
                )}
            />
        )
    }
}