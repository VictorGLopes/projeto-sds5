import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then(response => {
                const data = response.data as SaleSum[];
                const myLabales = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);


                setChartData({ labels: myLabales, series: mySeries });
            });
    }, []);

    //FORMA ERRADA
    //let chartData : ChartData = {labels: [], series: []};

    //FORMA ERRADA
    //axios.get(`${BASE_URL}/sales/amount-by-seller`)
    //    .then(response => {
    //        const data = response.data as SaleSum[];
    //        const myLabales = data.map(x => x.sellerName);
    //        const mySeries = data.map(x => x.sum);

    //        //chartData = {labels: myLabales, series: mySeries};
    //        setChartData({labels: myLabales, series: mySeries});
    //        console.log(chartData);
    //    });
    
    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}
export default DonutChart;