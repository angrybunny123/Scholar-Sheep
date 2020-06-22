import React from 'react';
import { Table } from 'react-bootstrap';

const rankings = (props) => {
    return (
        <div>
        <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
            {props.rankingtitle}
        </p>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th></th>
                <th>Scholar Sheep</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>10/10</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Kenneth</td>
                <td>8/10</td>
            </tr>
            <tr>
                <td>3</td>
                {/* <td colSpan="2">Penn Han</td> */}
                <td>Penn Han</td>
                <td>7/10</td>
            </tr>
            </tbody>
        </Table>
        </div>
    );
}

export default rankings;