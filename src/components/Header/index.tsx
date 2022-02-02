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
  temperature: number;
  humidity: number;
  min: number;
  max: number;
  icon: string;
}

export default function Header({ location }: ILocationProps) {
  const [locationData, setLocationData] = useState<ILocationData>(
    {} as ILocationData
  );

  const week = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
  ];

  const date = new Date();

  useEffect(() => {
    async function fetchLocationData() {
      if (!location) return;

      const { data } = await api.get(
        `/weather?lat=${location.latitude}&lon=${location.longitude}&lang=pt_br&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}`
      );

      setLocationData({
        name: data.name,
        country: data.sys.country,
        weatherDescription: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
        humidity: data.main.humidity,
        min: data.main.temp_min.toString().slice(0, 4),
        max: data.main.temp_max.toString().slice(0, 4),
        temperature: data.main.temp.toString().slice(0, 4),
        icon: data.weather[0].icon,
      });
    }

    fetchLocationData();
  }, [location]);

  function handleAddDigits(n: number): string {
    return (n < 10 ? '0' : '') + n;
  }

  return (
    <Container>
      <WeatherInfo>
        <figure>
          <Image
            src={`http://openweathermap.org/img/wn/${locationData.icon}@2x.png`}
            alt="Partly"
            width={64}
            height={48}
            objectFit="cover"
          />
        </figure>

        <strong>{locationData.temperature} °C</strong>

        <div>
          <span>Umidade: {locationData.humidity}%</span>
          <span>Minima: {locationData.min}°</span>
          <span>Máxima: {locationData.max}°</span>
        </div>
      </WeatherInfo>

      <LocationInfo>
        <strong>
          {locationData.name}, {locationData.country}
        </strong>

        <span>
          {week[date.getDay()]},{' '}
          {`${handleAddDigits(date.getHours())}:${handleAddDigits(
            date.getMinutes()
          )}`}
        </span>

        <span className="weather-description">
          {locationData.weatherDescription}
        </span>
      </LocationInfo>
    </Container>
  );
}
