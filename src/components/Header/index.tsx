import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ILocation } from '../../pages';
import { api } from '../../services/api';
import { Container, LocationInfo, WeatherInfo } from './styles';

interface IHeaderLocationDataProps {
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

export default function Header(headerLocationData: IHeaderLocationDataProps) {
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

  function handleAddDigits(n: number): string {
    return (n < 10 ? '0' : '') + n;
  }

  return (
    <Container>
      <WeatherInfo>
        <figure>
          <Image
            src={`http://openweathermap.org/img/wn/${headerLocationData.icon}@2x.png`}
            alt="Partly"
            width={64}
            height={48}
            objectFit="cover"
          />
        </figure>

        <strong>{headerLocationData.temperature} °C</strong>

        <div>
          <span>Umidade: {headerLocationData.humidity}%</span>
          <span>Minima: {headerLocationData.min}°</span>
          <span>Máxima: {headerLocationData.max}°</span>
        </div>
      </WeatherInfo>

      <LocationInfo>
        <strong>
          {headerLocationData.name}, {headerLocationData.country}
        </strong>

        <span>
          {week[date.getDay()]},{' '}
          {`${handleAddDigits(date.getHours())}:${handleAddDigits(
            date.getMinutes()
          )}`}
        </span>

        <span className="weather-description">
          {headerLocationData.weatherDescription}
        </span>
      </LocationInfo>
    </Container>
  );
}
