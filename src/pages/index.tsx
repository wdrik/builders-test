import { useEffect, useState } from 'react';

import DailyTemperatureList from '../components/DailyTemperatureList';
import Header from '../components/Header';
import { Container, Main, Tab, TabContent, TabHeader, TabItem } from './styles';
import { api } from '../services/api';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

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
  humidity: number;
  temp: number;
  dt: number;
};

export interface ILocationData {
  alerts: IAlert[];
  daily: IDaily[];
  hourly: IHourly[];
}

export default function Home() {
  const [location, setLocation] = useState<ILocation>();
  const [locationData, setLocationData] = useState<ILocationData>();
  const [chartType, setChartType] = useState<'temp' | 'humidity'>('temp');

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
        `/onecall?lat=${location.latitude}&lon=${location.longitude}&lang=pt_br&exclude=minutely&units=metric&appid=${process.env.OPEN_WEATHER_KEY}`
      );

      setLocationData(data);
    }

    fetchLocationData();
  }, [location]);

  return (
    <Main>
      <Container>
        {location && <Header location={location} />}

        <Tab>
          <TabHeader>
            <TabItem
              type="button"
              onClick={() => setChartType('temp')}
              className={`${chartType === 'temp' && 'active'}`}
            >
              Temperatura
            </TabItem>
            |
            <TabItem
              type="button"
              onClick={() => setChartType('humidity')}
              className={`${chartType === 'humidity' && 'active'}`}
            >
              Umidade
            </TabItem>
          </TabHeader>

          <TabContent>
            {chartType === 'temp' ? (
              <>{locationData && <LineChart {...locationData} />}</>
            ) : (
              <>{locationData && <BarChart {...locationData} />}</>
            )}
          </TabContent>
        </Tab>

        {locationData && <DailyTemperatureList {...locationData} />}
      </Container>
    </Main>
  );
}
