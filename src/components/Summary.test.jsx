import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from '../context';
import Summary from './Summary';
import data from '../data/data.json';

// Wrapper to provide context
const renderWithProvider = (component) => {
    return render(
        <Provider>
            {component}
        </Provider>
    );
};

describe('Summary Component', () => {
    test('renders JVM Flags label', () => {
        renderWithProvider(<Summary data={data} />);
        expect(screen.getByText('JVM Flags')).toBeInTheDocument();
    });

    test('renders textarea with default server flag', () => {
        renderWithProvider(<Summary data={data} />);
        const textarea = screen.getByPlaceholderText('JVM Options Summary');
        expect(textarea).toBeInTheDocument();
        expect(textarea.value).toContain('-server');
    });

    test('renders Copy To Clipboard button', () => {
        renderWithProvider(<Summary data={data} />);
        expect(screen.getByText('Copy To Clipboard')).toBeInTheDocument();
    });

    test('renders Download as text button', () => {
        renderWithProvider(<Summary data={data} />);
        expect(screen.getByText('Download as text')).toBeInTheDocument();
    });

    test('Copy button has correct id for accessibility', () => {
        renderWithProvider(<Summary data={data} />);
        const copyButton = screen.getByRole('button', { name: /copy to clipboard/i });
        expect(copyButton).toHaveAttribute('id', 'copy');
    });

    test('Download button has correct id for accessibility', () => {
        renderWithProvider(<Summary data={data} />);
        const downloadButton = screen.getByRole('button', { name: /download as text/i });
        expect(downloadButton).toHaveAttribute('id', 'download');
    });

    test('textarea is readonly', () => {
        renderWithProvider(<Summary data={data} />);
        const textarea = screen.getByPlaceholderText('JVM Options Summary');
        expect(textarea).toHaveAttribute('readonly');
    });
});
