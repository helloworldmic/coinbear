// changed name from Chart-candle-brush.tsx(class component)
// series 格式: https://apexcharts.com/docs/options/series/
import React, { Component, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function BrushChart() {
    const data = [{
        x: new Date(1538836200000),  //2018年10月6日星期六 22:30:00
        y: [6575.96, 6589, 6571.77, 6588.92]
    },
    {
        x: new Date(1538838000000), //2018年10月6日星期六 23:00:00
        y: [6588.92, 6594, 6577.55, 6589.22]
    },
    {
        x: new Date(1538782200000), // 2018年10月6日星期六 07:30:00
        y: [6630.71, 6648.95, 6623.34, 6635.65]
    },
    {
        x: new Date(1538784000000),  // 2018年10月6日星期六 08:00:00
        y: [6635.65, 6651, 6629.67, 6638.24]
    },
    {
        x: new Date(1538785800000),  // 2018年10月6日星期六 08:30:00
        y: [6638.24, 6640, 6620, 6624.47]
    },]
    console.log(data[0].x)
    console.log(data[0].x.getTime())
    return (
        <div className="chart-box">
            <div id="chart-candlestick">
                <ReactApexChart options={{
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
                                upward: '#3C90EB',
                                downward: '#DF7D46'
                            }
                        }
                    },
                    xaxis: {
                        type: 'datetime'
                    }
                }}
                    series={[
                        {
                            name: "candlestick-chart-above",
                            data: data
                        }
                    ]}
                    type="candlestick"
                    height={290} />
            </div>
            <div id="chart-bar">
                <ReactApexChart options={{
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
                                max: data[data.length - 1].x.getTime()       //new Date('10 Dec 2017').getTime()

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
                }}
                    series={[{
                        name: 'volume',
                        data: data //seriesDataLinear
                    }]}
                    type="bar"
                    height={160} />
            </div>
        </div>
    );
}
