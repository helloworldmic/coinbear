// this is copied from google combined chart, original name: GoogleChart.tsx

import React, { useState } from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import { GoogleDataTableColumnType } from "react-google-charts/dist/types";

const columns
    // : {
    //     type: GoogleDataTableColumnType,
    //     label: string}[] 
    = [
        {
            type: "date",
            label: "Date"
        },
        {
            type: "number",
            label: "Kepler-22b mission"
        },
        {
            type: "string",
            label: "Kepler title"
        },
        {
            type: "string",
            label: "Kepler text"
        },
        {
            type: "number",
            label: "Gliese 163 mission"
        },
        {
            type: "string",
            label: "Gliese title"
        },
        {
            type: "string",
            label: "Gliese text"
        }
    ];
const rows = [
    [
        new Date(2021, 2, 15),
        12400,
        "demo",
        "demo",
        10645,
        "demo",
        "demo"
    ],
    [
        new Date(2021, 2, 16),
        24045,
        "Lalibertines",
        "First encounter",
        12374,
        "demo",
        "demo"
    ],
    [
        new Date(2021, 2, 17),
        35022,
        "Lalibertines",
        "They are very tall",
        15766,
        "Gallantors",
        "First Encounter"
    ],
    [
        new Date(2021, 2, 18),
        12284,
        "Lalibertines",
        "Attack on our crew!",
        34334,
        "Gallantors",
        "Statement of shared principles"
    ],
    [
        new Date(2021, 2, 19),
        8476,
        "Lalibertines",
        "Heavy casualties",
        66467,
        "Gallantors",
        "Mysteries revealed"
    ],
    [
        new Date(2021, 2, 20),
        0,
        "Lalibertines",
        "All crew lost",
        79463,
        "Gallantors",
        "Omniscience achieved"
    ]
];

export default function ChartLine() {

    // const [chartImageURI, setChartImageURI] = useState('')   //no need here 

    return (
        <div className="GoogleChart">
            <Chart
                chartType="AnnotationChart"
                width="80%"
                height="300px"
                legendToggle
                rows={rows}
                columns={columns as any}
            // why doesn't work ---> columns ={columns} 
            />
        </div>
    );
}