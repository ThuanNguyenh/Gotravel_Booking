import { useEffect } from "react";
import "./revenue.css";
import Highcharts from 'highcharts/highstock';


function ManageRevenue() {

    useEffect(() => {
        (async () => {

            const data = await fetch(
                'https://demo-live-data.highcharts.com/aapl-c.json'
            ).then(response => response.json());
        
            // Create the chart with light theme
            Highcharts.stockChart('revenue', {
                rangeSelector: {
                    selected: 1
                },
        
                title: {
                    text: 'Your Revenue'
                },
        
                series: [{
                    name: 'AAPL',
                    data: data,
                    tooltip: {
                        valueDecimals: 2
                    }
                }],

            });
        })();
    })

    return(
        <div>
            <div id="revenue" className="highcharts-light"></div>
        </div>
    )
}

export default ManageRevenue;
