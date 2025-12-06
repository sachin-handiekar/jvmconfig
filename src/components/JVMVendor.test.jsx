import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JVMVendor from './JVMVendor';
import data from '../data/data.json';

describe('JVMVendor Component', () => {
    test('renders JVM Vendor label', () => {
        render(<JVMVendor vendors={data.JVMVendor} />);
        expect(screen.getByText('JVM Vendor:')).toBeInTheDocument();
    });

    test('renders select dropdown', () => {
        render(<JVMVendor vendors={data.JVMVendor} />);
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
    });

    test('renders Oracle as vendor option', () => {
        render(<JVMVendor vendors={data.JVMVendor} />);
        expect(screen.getByText('Oracle')).toBeInTheDocument();
    });

    test('select has correct id', () => {
        render(<JVMVendor vendors={data.JVMVendor} />);
        const select = screen.getByRole('combobox');
        expect(select).toHaveAttribute('id', 'jvmVendor');
    });

    test('can select a vendor', () => {
        render(<JVMVendor vendors={data.JVMVendor} />);
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'oracle' } });
        expect(select.value).toBe('oracle');
    });
});
