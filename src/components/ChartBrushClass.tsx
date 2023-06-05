// copied from https://apexcharts.com/react-chart-demos/candlestick-charts/combo/
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import ReactDOM from "react-dom";


// const EventEmitter = require("events")
// class Greeter extends EventEmitter {
//   constructor() {
//   constructor() {
//     this.greeting = "Hello there!";
// }
// }
// const React.Component: any = require('react')

let data = [{
    x: new Date(1538836200000),
    y: [6575.96, 6589, 6571.77, 6588.92]
},
{
    x: new Date(1538838000000),
    y: [6588.92, 6594, 6577.55, 6589.22]
},
{
    x: new Date(1538782200000),
    y: [6630.71, 6648.95, 6623.34, 6635.65]
},
{
    x: new Date(1538784000000),
    y: [6635.65, 6651, 6629.67, 6638.24]
},
{
    x: new Date(1538785800000),
    y: [6638.24, 6640, 6620, 6624.47]
},
{
    x: new Date(1538787600000),
    y: [6624.53, 6636.03, 6621.68, 6624.31]
},
{
    x: new Date(1538789400000),
    y: [6624.61, 6632.2, 6617, 6626.02]
},
{
    x: new Date(1538791200000),
    y: [6627, 6627.62, 6584.22, 6603.02]
},
{
    x: new Date(1538793000000),
    y: [6605, 6608.03, 6598.95, 6604.01]
},
{
    x: new Date(1538794800000),
    y: [6604.5, 6614.4, 6602.26, 6608.02]
},
{
    x: new Date(1538796600000),
    y: [6608.02, 6610.68, 6601.99, 6608.91]
},]
class BrushChartClass extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {

            series: data, //seriesData
            
            options: {
                chart: {
                    type: 'candlestick',
                    height: 290,
                    id: 'candles',
                    toolbar: {
                        autoSelected: 'pan',
                        show: false
                    },
                    zoom: {
                        enabled: false
                    },
                },
                plotOptions: {
                    candlestick: {
                        colors: {
                            upward: '#3C90EB', //blue
                            downward: '#DF7D46' //orange
                        }
                    }
                },
                xaxis: {
                    type: 'datetime'
                }
            },

            seriesBar: [{
                name: 'volume',
                data: data //seriesDataLinear
            }],
            optionsBar: {
                chart: {
                    height: 160,
                    type: 'bar',
                    brush: {
                        enabled: true,
                        target: 'candles'
                    },
                    selection: {
                        enabled: true,
                        xaxis: {
                            min: data[0].x.getTime(),      //new Date('20 Jan 2017').getTime(),
                            max: data[data.length-1].x.getTime()       //new Date('10 Dec 2017').getTime()
                        },
                        fill: {
                            color: '#ccc',
                            opacity: 0.4
                        },
                        stroke: {
                            color: '#0D47A1',
                        }
                    },
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    bar: {
                        columnWidth: '80%',
                        colors: {
                            ranges: [{
                                from: -1000,
                                to: 0,
                                color: '#F15B46'
                            }, {
                                from: 1,
                                to: 10000,
                                color: '#FEB019'
                            }],
                        },
                    }
                },
                stroke: {
                    width: 0
                },
                xaxis: {
                    type: 'datetime',
                    axisBorder: {
                        offsetX: 13
                    }
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                }
            },
        };
    }
    render() {
        return (
            <div className="chart-box">
                <div id="chart-candlestick">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={290} />
                </div>
                <div id="chart-bar">
                    <ReactApexChart options={this.state.optionsBar} series={this.state.seriesBar} type="bar" height={160} />
                </div>
            </div>
        );
    }
}

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(BrushChartClass), domContainer);


export default BrushChartClass 