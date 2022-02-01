import { ILocation } from '../../pages';
import DailyTemperature from '../DailyTemperature';
import { Container } from './styles';

interface IDailyTemperatureListProps {
  location: ILocation;
}

export default function DailyTemperatureList() {
  return (
    <Container>
      <DailyTemperature active={true} />
      <DailyTemperature />
      <DailyTemperature />
      <DailyTemperature />
      <DailyTemperature />
    </Container>
  );
}
