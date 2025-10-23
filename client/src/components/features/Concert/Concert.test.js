import { render, screen } from '@testing-library/react';
import Concert from './Concert';

const testProps = {
  performer: 'John Doe',
  price: 50,
  genre: 'Rock',
  day: 1,
  image: 'test-image.jpg'
};

describe('Concert component', () => {
  it('should render with given props', () => {
    render(<Concert {...testProps} />);

    expect(screen.getByText(testProps.performer)).toBeInTheDocument();
    expect(screen.getByText(testProps.genre)).toBeInTheDocument();
    expect(screen.getByText(`Day: ${testProps.day}, Price: ${testProps.price}$`)).toBeInTheDocument();

    const images = screen.getAllByAltText(testProps.performer);
    expect(images).toHaveLength(2);
    images.forEach(img => {
      expect(img).toHaveAttribute('src', testProps.image);
    });
  });
});
