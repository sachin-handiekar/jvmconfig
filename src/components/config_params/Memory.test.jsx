import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Memory from './Memory';
import data from '../../data/data.json';

// Mock mainState for testing  - use JDK version 9 to avoid extra form fields
const createMockMainState = (overrides = {}) => ({
    JDKVersion: '9',
    handleInput: jest.fn(),
    minHeapSize: '',
    maxHeapSize: '',
    heapSizeSelect: '',
    defaultPermSize: '',
    maxPermSize: '',
    permSizeSelect: '',
    defaultMetaSpace: '',
    maxMetaSpace: '',
    metaSpaceSelect: '',
    ...overrides
});

describe('Memory Component', () => {
    test('renders Heap Size label', () => {
        const mainState = createMockMainState();
        render(<Memory configuration={data.configuration} activeNavbar="memory" mainState={mainState} />);
        expect(screen.getByText('Heap Size')).toBeInTheDocument();
    });

    test('renders min and max heap size inputs', () => {
        const mainState = createMockMainState();
        render(<Memory configuration={data.configuration} activeNavbar="memory" mainState={mainState} />);
        expect(screen.getByPlaceholderText('min')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('max')).toBeInTheDocument();
    });

    test('shows Metaspace for JDK 8', () => {
        const mainState = createMockMainState({ JDKVersion: '8' });
        render(<Memory configuration={data.configuration} activeNavbar="memory" mainState={mainState} />);
        expect(screen.getByText('Metaspace')).toBeInTheDocument();
    });

    test('shows PermSize for JDK 6/7', () => {
        const mainState = createMockMainState({ JDKVersion: '6/7' });
        render(<Memory configuration={data.configuration} activeNavbar="memory" mainState={mainState} />);
        expect(screen.getByText('Perm Size')).toBeInTheDocument();
    });

    test('does not show PermSize for JDK 8', () => {
        const mainState = createMockMainState({ JDKVersion: '8' });
        render(<Memory configuration={data.configuration} activeNavbar="memory" mainState={mainState} />);
        expect(screen.queryByText('Perm Size')).not.toBeInTheDocument();
    });

    test('does not show Metaspace for JDK 6/7', () => {
        const mainState = createMockMainState({ JDKVersion: '6/7' });
        render(<Memory configuration={data.configuration} activeNavbar="memory" mainState={mainState} />);
        expect(screen.queryByText('Metaspace')).not.toBeInTheDocument();
    });

    test('calls handleInput when min heap size changes', () => {
        const mockHandleInput = jest.fn();
        const mainState = createMockMainState({ handleInput: mockHandleInput });
        render(<Memory configuration={data.configuration} activeNavbar="memory" mainState={mainState} />);

        const minHeapInput = screen.getByPlaceholderText('min');
        fireEvent.change(minHeapInput, { target: { value: '512' } });

        expect(mockHandleInput).toHaveBeenCalledWith('minHeapSize', '512');
    });

    test('calls handleInput when max heap size changes', () => {
        const mockHandleInput = jest.fn();
        const mainState = createMockMainState({ handleInput: mockHandleInput });
        render(<Memory configuration={data.configuration} activeNavbar="memory" mainState={mainState} />);

        const maxHeapInput = screen.getByPlaceholderText('max');
        fireEvent.change(maxHeapInput, { target: { value: '2048' } });

        expect(mockHandleInput).toHaveBeenCalledWith('maxHeapSize', '2048');
    });

    test('is hidden when activeNavbar is not memory', () => {
        const mainState = createMockMainState();
        const { container } = render(
            <Memory configuration={data.configuration} activeNavbar="debugging" mainState={mainState} />
        );
        const memoryDiv = container.querySelector('#memory');
        expect(memoryDiv).toHaveClass('hide');
    });

    test('is active when activeNavbar is memory', () => {
        const mainState = createMockMainState();
        const { container } = render(
            <Memory configuration={data.configuration} activeNavbar="memory" mainState={mainState} />
        );
        const memoryDiv = container.querySelector('#memory');
        expect(memoryDiv).toHaveClass('active');
    });
});
