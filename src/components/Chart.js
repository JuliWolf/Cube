import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import { QueryRenderer } from "@cubejs-client/react";

const Chart = ({ cubejsApi, title, query, render }) => (
    <Card>
        <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
            <QueryRenderer
                query={query}
                cubejsApi={cubejsApi}
                render={({ resultSet }) => {
                    if (!resultSet) {
                        return <div className="loader" />;
                    }

                    return render(resultSet);
                }}
            />
        </CardBody>
    </Card>
);

export default Chart;