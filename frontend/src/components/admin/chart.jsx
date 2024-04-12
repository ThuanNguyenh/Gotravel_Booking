import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import Highcharts from "highcharts/highstock";
import "./admin.scss";

HighchartsMore(Highcharts);
const DonutChart = () => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        size: '85%',
        startAngle: 0,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        data: [
          {
            name: "dashboard.approved" ,
            y: 74.77,
            color: "#5E3FBE",
          },
          {
            name: "duy",
            y: 12.82,
            color: "#F4F0FD",
          },
          {
            name:  "dashboard.failed" ,
            y: 4.63,
            color: "#E5DAFB",
          },
        ],
      },
    ],
  };
  return <HighchartsReact className="highcharts-light" highcharts={Highcharts} options={options} />;
};

export default DonutChart;