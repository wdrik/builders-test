import { useEffect, useState } from 'react';

export default function Home() {
  const [location, setLocation] = useState<any>();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        const { latitude, longitude } = position.coords;

        console.log(`latitude: `, latitude);
        console.log(`longitude: `, longitude);
      },
      (error: any) => {
        console.log(`error: `, error);
      }
    );
  }, []);

  return (
    <>
      <main>
        <h2>Hello World!</h2>
      </main>
    </>
  );
}
