import { ILocationData } from '../../pages';
import DailyTemperature from '../DailyTemperature';
import { Container } from './styles';

export default function DailyTemperatureList(props: ILocationData) {
  const daily = props.daily.slice(0, 5);

  return (
    <Container>
      {daily.map((item) => (
        <DailyTemperature
          key={item.dt}
          active={true}
          weather={{
            icon: item.weather[0].icon,
            day: item.dt,
            min: item.temp.min,
            max: item.temp.max,
          }}
        />
      ))}
    </Container>
  );
}
