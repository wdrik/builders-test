import { render, screen } from '@testing-library/react';

describe('Teste Component', () => {
  it('renders correctly', () => {
    render(<h1>teste</h1>);

    expect(screen.getByText('teste')).toBeInTheDocument();
  });
});
