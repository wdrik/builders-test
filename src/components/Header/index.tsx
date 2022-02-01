import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ILocation } from '../../pages';
import { api } from '../../services/api';
import { Container, LocationInfo, WeatherInfo } from './styles';

interface ILocationProps {
  location: ILocation;
}

interface ILocationData {
  name: string;
  country: string;
  weatherDescription: string;
  weatherIcon: string;
}

const apiKey = 'ea3f03f9a628d010be779f05595d5c49';

export default function Header({ location }: ILocationProps) {
  const [locationData, setLocationData] = useState<ILocationData>(
    {} as ILocationData
  );

  useEffect(() => {
    async function fetchLocationData() {
      if (!location) return;

      const { data } = await api.get(
        `/weather?lat=${location?.latitude}&lon=${location?.longitude}&lang=pt_br&appid=${apiKey}`
      );

      console.log(data);

      setLocationData({
        name: data.name,
        country: data.sys.country,
        weatherDescription: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
      });
    }

    fetchLocationData();
  }, [location]);

  return (
    <Container>
      <WeatherInfo>
        <figure>
          <Image
            src="/images/partly_cloudy.png"
            alt="Partly"
            width={64}
            height={48}
            objectFit="cover"
          />
        </figure>

        <strong>26 °C</strong>

        <div>
          <span>Chuva: 10%</span>
          <span>Umidade: 10%</span>
          <span>Vento: 10%</span>
        </div>
      </WeatherInfo>

      <LocationInfo>
        <strong>
          {locationData.name}, {locationData.country}
        </strong>

        <span>Terça-feira, 09:11</span>
        <span>{locationData.weatherDescription}</span>
      </LocationInfo>
    </Container>
  );
}
