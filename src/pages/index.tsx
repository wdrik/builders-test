import { useEffect, useState } from 'react';

import DailyTemperatureList from '../components/DailyTemperatureList';
import Header from '../components/Header';
import { Container, Main } from './styles';
import { api } from '../services/api';
import LineChart from '../components/LineChart';

const apiKey = 'ea3f03f9a628d010be779f05595d5c49';

export interface ILocation {
  latitude: number;
  longitude: number;
}

type IAlert = {
  sender_name: string;
  event: string;
  description: string;
};

type IWeather = {
  description: string;
  icon: string;
};

export type IDaily = {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: IWeather[];
};

export type IHourly = {
  humidity?: number;
  temp?: number;
};

export interface ILocationData {
  alerts: IAlert[];
  daily: IDaily[];
  hourly: IHourly[];
}

export default function Home() {
  const [location, setLocation] = useState<ILocation>();
  const [locationData, setLocationData] = useState<ILocationData>();

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

  useEffect(() => {
    async function fetchLocationData() {
      if (!location) return;

      const { data } = await api.get(
        `/onecall?lat=${location.latitude}&lon=${location.longitude}&lang=pt_br&exclude=minutely&units=metric&appid=${apiKey}`
      );

      setLocationData(data);
    }

    fetchLocationData();
  }, [location]);

  return (
    <Main>
      <Container>
        {location && <Header location={location} />}

        {locationData && <LineChart {...locationData} />}

        {locationData && <DailyTemperatureList {...locationData} />}
      </Container>
    </Main>
  );
}
