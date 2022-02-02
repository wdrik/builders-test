import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { ILocationData } from '../../pages';

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

function handleAddDigits(n: number): string {
  return (n < 10 ? '0' : '') + n;
}

export default function LineChart(props: ILocationData) {
  const data = {
    labels: props?.hourly
      .map((item) => {
        const date = new Date(item.dt * 1000);

        return `${handleAddDigits(date.getHours())} : 00`;
      })
      .slice(0, 20),
    datasets: [
      {
        data: props?.hourly
          .map((item) => {
            return Number(item.temp?.toString().slice(0, 4));
          })
          .slice(0, 20),
        borderColor: '#fff6a8',
        backgroundColor: '#fff6a8',
        borderWidth: 2,
        tenstion: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
