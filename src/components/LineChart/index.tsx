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

export default function LineChart(locationData: ILocationData) {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: locationData?.hourly.map((item) => {
          return item.temp;
        }),
        borderColor: '#fff6a8f2',
        backgroundColor: '#fff6a8f2',
        borderWidth: 2,
        tenstion: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
