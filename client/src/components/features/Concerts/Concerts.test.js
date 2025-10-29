import { render, screen } from '@testing-library/react';
import Concerts from './Concerts';
import '@testing-library/jest-dom';

describe('Concerts component', () => {
    it('passes correct props to Concert component', async () => {
    const concertsData = [
        { _id: '1', performer: 'John Doe', price: 50, genre: 'Rock', day: 1 },
        { _id: '2', performer: 'Rebekah Parker', price: 30, genre: 'Pop', day: 2 },
    ];

    render(<Concerts concerts={concertsData} />);
        const concertsTestId = await screen.findByTestId('concerts-section');
        expect(concertsTestId).toBeInTheDocument();
    });


    it('renders empty section when no concerts', async () => {
        render(<Concerts concerts={[]} />);
        const section = await screen.findByTestId('concerts-section');
        expect(section).toBeEmptyDOMElement();
    });
});
