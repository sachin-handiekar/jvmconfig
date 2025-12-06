import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider, Consumer } from './context';

describe('Context Provider', () => {
    test('provides default JDKVersion value', () => {
        render(
            <Provider>
                <Consumer>
                    {value => <span data-testid="jdk-version">{value.JDKVersion}</span>}
                </Consumer>
            </Provider>
        );
        expect(screen.getByTestId('jdk-version')).toHaveTextContent('6/7');
    });

    test('provides handleJDKVersion function', () => {
        let contextValue;
        render(
            <Provider>
                <Consumer>
                    {value => {
                        contextValue = value;
                        return null;
                    }}
                </Consumer>
            </Provider>
        );
        expect(typeof contextValue.handleJDKVersion).toBe('function');
    });

    test('provides handleInput function', () => {
        let contextValue;
        render(
            <Provider>
                <Consumer>
                    {value => {
                        contextValue = value;
                        return null;
                    }}
                </Consumer>
            </Provider>
        );
        expect(typeof contextValue.handleInput).toBe('function');
    });

    test('provides default empty heap size values', () => {
        render(
            <Provider>
                <Consumer>
                    {value => (
                        <>
                            <span data-testid="min-heap">{value.minHeapSize || 'empty'}</span>
                            <span data-testid="max-heap">{value.maxHeapSize || 'empty'}</span>
                        </>
                    )}
                </Consumer>
            </Provider>
        );
        expect(screen.getByTestId('min-heap')).toHaveTextContent('empty');
        expect(screen.getByTestId('max-heap')).toHaveTextContent('empty');
    });

    test('handleJDKVersion updates JDKVersion state', () => {
        const TestComponent = () => (
            <Consumer>
                {value => (
                    <>
                        <span data-testid="jdk-version">{value.JDKVersion}</span>
                        <button onClick={() => value.handleJDKVersion('17 (LTS)')}>
                            Change Version
                        </button>
                    </>
                )}
            </Consumer>
        );

        render(
            <Provider>
                <TestComponent />
            </Provider>
        );

        expect(screen.getByTestId('jdk-version')).toHaveTextContent('6/7');
        fireEvent.click(screen.getByText('Change Version'));
        expect(screen.getByTestId('jdk-version')).toHaveTextContent('17 (LTS)');
    });

    test('handleInput updates state dynamically', () => {
        const TestComponent = () => (
            <Consumer>
                {value => (
                    <>
                        <span data-testid="min-heap">{value.minHeapSize || 'empty'}</span>
                        <button onClick={() => value.handleInput('minHeapSize', '512')}>
                            Set Heap
                        </button>
                    </>
                )}
            </Consumer>
        );

        render(
            <Provider>
                <TestComponent />
            </Provider>
        );

        expect(screen.getByTestId('min-heap')).toHaveTextContent('empty');
        fireEvent.click(screen.getByText('Set Heap'));
        expect(screen.getByTestId('min-heap')).toHaveTextContent('512');
    });
});
