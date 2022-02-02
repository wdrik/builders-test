import Image from 'next/image';
import { Container } from './styles';

type IWeather = {
  icon: string;
  day: number;
  min: number;
  max: number;
};

interface IDailyTemperatureProps {
  active?: boolean;
  weather: IWeather;
}

export default function DailyTemperature(props: IDailyTemperatureProps) {
  const date = new Date(props.weather.day * 1000);

  const week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <Container className={`${props.active && `active`}`}>
      <span className="day">{week[date.getDay()]}.</span>

      <figure>
        <Image
          src={`http://openweathermap.org/img/wn/${props.weather.icon}@2x.png`}
          alt="Partly"
          width={48}
          height={48}
          objectFit="cover"
        />
      </figure>

      <div>
        <span className="max">{props.weather.max}° -</span>
        <span className="min">{props.weather.min}°</span>
      </div>
    </Container>
  );
}
