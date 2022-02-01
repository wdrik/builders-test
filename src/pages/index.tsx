import { useEffect, useState } from 'react';

import DailyTemperatureList from '../components/DailyTemperatureList';
import Header from '../components/Header';
import { Container, Main } from './styles';

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

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [120, 110, 120, 130, 138, 120, 124],
      borderColor: 'rgb(255, 239, 99)',
      backgroundColor: 'rgb(255, 239, 99)',
    },
  ],
};

export interface ILocation {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [location, setLocation] = useState<ILocation>();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported.');

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;

        setLocation({
          latitude,
          longitude,
        });
      },
      (error: any) => {
        console.log(`error: `, error);
      }
    );
  }, []);

  return (
    <Main>
      <Container>
        {location && <Header location={location} />}

        <Line options={options} data={data} />

        <DailyTemperatureList />
      </Container>
    </Main>
  );
}
