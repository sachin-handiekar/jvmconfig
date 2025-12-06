import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from '../context';
import JDKVersion from './JDKVersion';
import data from '../data/data.json';

// Wrapper to provide context
const renderWithProvider = (component) => {
    return render(
        <Provider>
            {component}
        </Provider>
    );
};

describe('JDKVersion Component', () => {
    test('renders JDK Version label', () => {
        renderWithProvider(<JDKVersion versions={data.JDKVersion} />);
        expect(screen.getByText('JDK Version:')).toBeInTheDocument();
    });

    test('renders select dropdown', () => {
        renderWithProvider(<JDKVersion versions={data.JDKVersion} />);
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
    });

    test('renders all JDK version options', () => {
        renderWithProvider(<JDKVersion versions={data.JDKVersion} />);
        const options = screen.getAllByRole('option');
        expect(options.length).toBe(data.JDKVersion.children.length);
    });

    test('includes LTS versions in options', () => {
        renderWithProvider(<JDKVersion versions={data.JDKVersion} />);
        expect(screen.getByText('11 (LTS)')).toBeInTheDocument();
        expect(screen.getByText('17 (LTS)')).toBeInTheDocument();
        expect(screen.getByText('21 (LTS)')).toBeInTheDocument();
    });

    test('default value is 6/7', () => {
        renderWithProvider(<JDKVersion versions={data.JDKVersion} />);
        const select = screen.getByRole('combobox');
        expect(select.value).toBe('6/7');
    });

    test('can change JDK version', () => {
        renderWithProvider(<JDKVersion versions={data.JDKVersion} />);
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: '17 (LTS)' } });
        expect(select.value).toBe('17 (LTS)');
    });
});
