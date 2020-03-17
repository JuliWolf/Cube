import React, { Component } from 'react'
import {Col, Container, Row} from "reactstrap";
import Chart from "./Chart";
import {Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import CustomizedLabel from "./CustomLabel";
import cubejs from "@cubejs-client/core";
import numeral from "numeral";
import moment from "moment";


const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
    apiUrl: process.env.REACT_APP_API_URL
});
const numberFormatter = item => numeral(item).format("0,0");
const dateFormatter = item => moment(item).format("MMM YY");

const renderSingleValue = (resultSet, key) => (
    <h1 height={300}>{numberFormatter(resultSet.chartPivot()[0][key])}</h1>
);


export default class Home extends Component {

    render () {
        return (
            <Row>
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
            </Row>
        )
    }
}