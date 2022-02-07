import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DailyTemperature from '.';
import theme from '../../styles/theme';

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

const mock = {
  weather: {
    icon: '10bn',
    day: 1643817380,
    min: 20,
    max: 30,
  },
};

describe('DailyTemperature Component', () => {
  it('renders correctly min temperature', () => {
    const { debug } = render(
      <ThemeProvider theme={theme}>
        <DailyTemperature {...mock} />
      </ThemeProvider>
    );

    debug();

    expect(screen.getByText('20°')).toBeInTheDocument();
  });

  it('renders correctly max temperature', () => {
    const { debug } = render(
      <ThemeProvider theme={theme}>
        <DailyTemperature {...mock} />
      </ThemeProvider>
    );

    debug();

    expect(screen.getByText('30° -')).toBeInTheDocument();
  });

  it('renders correctly day', () => {
    const { debug } = render(
      <ThemeProvider theme={theme}>
        <DailyTemperature {...mock} />
      </ThemeProvider>
    );

    debug();

    expect(screen.getByText('Qua.')).toBeInTheDocument();
  });
});
