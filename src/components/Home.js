import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    Bar,
    LineChart,
    Line
} from "recharts";
import moment from "moment";
import numeral from "numeral";
import cubejs from "@cubejs-client/core";
import Chart from "./Chart.js";
import CustomizedLabel from "./CustomLabel.js";

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
    apiUrl: process.env.REACT_APP_API_URL
});
const numberFormatter = item => numeral(item).format("0,0");
const dateFormatter = item => moment(item).format("MMM YY");

const renderSingleValue = (resultSet, key) => (
    <h1 height={300}>{numberFormatter(resultSet.chartPivot()[0][key])}</h1>
);


class App extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm="6">
                        <Chart
                            cubejsApi={cubejsApi}
                            title="Total deaths"
                            query={{ measures: ["DeathHistory.totalAmount"] }}
                            render={resultSet => renderSingleValue(resultSet, "DeathHistory.totalAmount")}
                        />
                    </Col>
                    <Col sm="6">
                        <Chart
                            cubejsApi={cubejsApi}
                            title="Total injured"
                            query={{ measures: ["History.totalAmount"] }}
                            render={resultSet => renderSingleValue(resultSet, "History.totalAmount")}
                        />
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col sm="6">
                        <Chart
                            cubejsApi={cubejsApi}
                            title="Injured over time"
                            query={{
                                measures: ["History.totalAmount"],
                                timeDimensions: [
                                    {
                                        dimension: "History.date",
                                        granularity: "month"
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
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        />
                    </Col>
                    <Col sm="6">
                        <Chart
                            cubejsApi={cubejsApi}
                            title="Deaths over time"
                            query={{
                                measures: ["DeathHistory.totalAmount"],
                                timeDimensions: [
                                    {
                                        dimension: "DeathHistory.date",
                                        granularity: "month"
                                    }
                                ]
                            }}
                            render={resultSet => (
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={resultSet.chartPivot()}>
                                        <XAxis dataKey="category" tickFormatter={dateFormatter} />
                                        <YAxis tickFormatter={numberFormatter} />
                                        <Tooltip labelFormatter={dateFormatter} />
                                        <Area
                                            type="monotone"
                                            dataKey="DeathHistory.totalAmount"
                                            name="DeathHistory"
                                            stroke="rgb(165, 9, 9)"
                                            fill="rgba(187, 7, 7, 0.51)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;