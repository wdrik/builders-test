import Image from 'next/image';
import { ILocation } from '../../pages';
import { Container } from './styles';

interface IDailyTemperatureProps {
  location: ILocation;
}

export default function DailyTemperature() {
  return (
    <Container>
      <span className="day">ter.</span>

      <figure>
        <Image
          src="/images/partly_cloudy.png"
          alt="Partly"
          width={48}
          height={48}
          objectFit="cover"
        />
      </figure>

      <div>
        <span className="min">29°</span>
        <span className="max">22°</span>
      </div>
    </Container>
  );
}
