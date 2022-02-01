import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Container, Main } from './styles';

export default function Home() {
  const [location, setLocation] =
    useState<{ latitude: number; longitude: number }>();

  const apiKey = 'ea3f03f9a628d010be779f05595d5c49';

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
        <SearchBar />

        <h2>latitude: {location?.latitude} </h2>
        <h2>longitude: {location?.longitude} </h2>
      </Container>
    </Main>
  );
}
