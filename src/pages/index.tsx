import { useEffect, useState } from 'react';
import DailyTemperatureList from '../components/DailyTemperatureList';
import Header from '../components/Header';
import { Container, Main } from './styles';

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

        <DailyTemperatureList />
      </Container>
    </Main>
  );
}
