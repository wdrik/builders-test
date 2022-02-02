import { ILocationData } from '../../pages';
import DailyTemperature from '../DailyTemperature';
import { Container } from './styles';

export default function DailyTemperatureList(props: ILocationData) {
  const daily = props.daily.slice(1, 6);

  return (
    <Container>
      {daily.map((item) => (
        <DailyTemperature
          key={item.dt}
          active={true}
          weather={{
            icon: item.weather[0].icon,
            day: item.dt,
            min: Number(item.temp.min.toString().slice(0, 4)),
            max: Number(item.temp.max.toString().slice(0, 4)),
          }}
        />
      ))}
    </Container>
  );
}
