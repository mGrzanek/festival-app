import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './../../../redux/store';
import { loadConcerts } from '../../../redux/concertsRedux';
import Lineup from './Lineup';

describe("Lineup component", () => {
    it("should render without crashing if concerts data exist", async () => {
        store.dispatch(loadConcerts([
            { _id: '1', performer: 'John Doe', price: 50, genre: 'Rock', day: 1 },
        { _id: '2', performer: 'Rebekah Parker', price: 30, genre: 'Pop', day: 2 },
        ]));

        render(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <Lineup />
                </Provider>
            </MemoryRouter>

        
        )
    })
})


