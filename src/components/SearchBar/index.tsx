import { useState } from 'react';
import { Container } from './styles';

export default function SearchBar() {
  const [text, setText] = useState('');

  return (
    <Container>
      <input type="text" value={text} onChange={() => setText} />
    </Container>
  );
}
