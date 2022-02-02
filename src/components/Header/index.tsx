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

  useEffect(() => {
    async function fetchLocationData() {
      if (!location) return;

      const { data } = await api.get(
        `/weather?lat=${location.latitude}&lon=${location.longitude}&lang=pt_br&units=metric&appid=${process.env.OPEN_WEATHER_KEY}`
      );

      console.log(`header`, data);

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

        <span>Terça-feira, 09:11</span>
        <span>{locationData.weatherDescription}</span>
      </LocationInfo>
    </Container>
  );
}
