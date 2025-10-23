import Logo from './Logo';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

describe('Logo component', () => {
    it('should render without crashing', () => {
        render(<Logo />);
        
        const logoText = screen.getByText('Blog.app');

        expect(logoText).toBeInTheDocument();
    })
})