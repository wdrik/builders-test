import { useEffect, useState } from 'react';

import DailyTemperatureList from '../components/DailyTemperatureList';
import Header from '../components/Header';
import {
  Container,
  Main,
  Tab,
  TabContent,
  TabHeader,
  TabItem,
} from '../styles/styles';
import { api } from '../services/api';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

import { Rings } from 'react-loader-spinner';

export interface ILocation {
  latitude: number;
  longitude: number;
}

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
  daily: IDaily[];
  hourly: IHourly[];
}

interface IHeaderLocationData {
  name: string;
  country: string;
  weatherDescription: string;
  weatherIcon: string;
  temperature: number;
  humidity: number;
  min: number;
  max: number;
  icon: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<ILocation>();
  const [locationData, setLocationData] = useState<ILocationData>(
    {} as ILocationData
  );
  const [headerLocationData, setHeaderLocationData] =
    useState<IHeaderLocationData>({} as IHeaderLocationData);

  const [chartType, setChartType] = useState<'temp' | 'humidity'>('temp');

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported.');

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

      const headerResponse = await api.get(
        `/weather?lat=${location.latitude}&lon=${location.longitude}&lang=pt_br&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}`
      );

      const response = await api.get(
        `/onecall?lat=${location.latitude}&lon=${location.longitude}&lang=pt_br&exclude=minutely&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}`
      );

      setLocationData(response.data);

      setHeaderLocationData({
        name: headerResponse.data.name,
        country: headerResponse.data.sys.country,
        weatherDescription: headerResponse.data.weather[0].description,
        weatherIcon: headerResponse.data.weather[0].icon,
        humidity: headerResponse.data.main.humidity,
        min: headerResponse.data.main.temp_min.toString().slice(0, 4),
        max: headerResponse.data.main.temp_max.toString().slice(0, 4),
        temperature: headerResponse.data.main.temp.toString().slice(0, 4),
        icon: headerResponse.data.weather[0].icon,
      });

      setIsLoading(false);
    }

    fetchLocationData();
  }, [location]);

  return (
    <Main>
      <Container>
        {isLoading ? (
          <Rings color="#fff6a8" height={80} width={80} />
        ) : (
          <>
            <Header {...headerLocationData} />

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
                  <LineChart {...locationData} />
                ) : (
                  <BarChart {...locationData} />
                )}
              </TabContent>
            </Tab>

            <DailyTemperatureList {...locationData} />
          </>
        )}
      </Container>
    </Main>
  );
}
