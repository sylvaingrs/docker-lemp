import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

describe('Home component', () => {
  it('renders the home title', () => {
    render(<Home />);
    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
  });
});
