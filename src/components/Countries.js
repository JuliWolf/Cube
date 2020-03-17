import React, {Component} from "react";
import {Col, Row, Input} from "reactstrap";
import cubejs from "@cubejs-client/core";

import { QueryRenderer } from "@cubejs-client/react";
import Country from "./Country";

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
    apiUrl: process.env.REACT_APP_API_URL
});


export default class Countries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCountry: "Afganistan"
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        console.log("Event.target.value is", event.target.value);

        this.setState({selectedCountry: event.target.value});

    }

    render () {
        return (
            <Row>
                <Col sm="3">
                    <Input type="select" name="selectMulti" id="exampleSelectMulti" onChange={this.handleChange}>
                        <QueryRenderer
                            cubejsApi={cubejsApi}
                            query={{
                                dimensions: ["Countries.countryName"]
                            }}
                            render={({resultSet}) => {
                                if (!resultSet) {
                                    return null;
                                }
                                return (
                                    resultSet.loadResponse.data.map((item) => (
                                        <option value={item['Countries.countryName']} key={item['Countries.countryName']}> {item['Countries.countryName']}</option>
                                    ))
                                )
                            }}
                        />
                    </Input>
                </Col>
                <Col sm="9">
                    <Country countryName={this.state.selectedCountry}/>
                </Col>
            </Row>
        )
    }
}