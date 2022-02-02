import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { ILocationData } from '../../pages';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};

function handleAddDigits(n: number): string {
  return (n < 10 ? '0' : '') + n;
}

export default function BarChart(props: ILocationData) {
  const data = {
    labels: props?.hourly.map((item) => {
      const date = new Date(item.dt * 1000);

      return `${handleAddDigits(date.getHours())} : 00`;
    }),
    datasets: [
      {
        data: props?.hourly.map((item) => {
          return Number(item.humidity?.toString().slice(0, 4));
        }),
        borderColor: 'rgba(187, 241, 255, 0.8)',
        backgroundColor: 'rgba(187, 241, 255, 0.1)',
        borderWidth: 2,
        tenstion: 0.4,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
