import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from './App';
import { describe, it, expect, afterEach } from 'vitest';
import { createMockServer } from './createMockServer';

describe('Weather app tests', () => {
    let server;
    beforeEach(() => {
        server = createMockServer();
    })
    afterEach(() => {
        server.shutdown();
    })
    it('renders weather application title', () => {
        render(<App />);
        const linkElement = screen.getByText(/Weather Application/i);
        expect(linkElement).toBeInTheDocument();
    });

    it('shows city search results', async () => {
        render(<App />);
        const input = screen.getByTestId('seacrh-input')
        userEvent.type(input, 'Melbourne')
        const button = screen.getByTestId('search-button')
        userEvent.click(button)
        await waitFor(() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5))
    });

    it('shows city search result details', async () => {
        render(<App />);

        const input = screen.getByTestId('seacrh-input')
        userEvent.type(input, 'Melbourne')
        
        const button = screen.getByTestId('search-button')
        userEvent.click(button)
        
        await waitFor(() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5))
        expect(screen.getByText(/Melbourne, -37.8141705, 144.9655616/i)).toBeInTheDocument()
    });

    it('add search result to my weather list', async () => {
        render(<App />);
        
        const input = screen.getByTestId('seacrh-input')
        userEvent.type(input, 'Melbourne')
        
        const button = screen.getByTestId('search-button')
        userEvent.click(button)
        
        await waitFor(() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5))
        
        const selected = screen.getAllByText(/Melbourne/i)[3]
        act(() => {
            userEvent.click(selected)
        })
        
        expect(within(screen.getByTestId('my-weather-list')).getByText(/Melbourne/i)).toBeInTheDocument()
    });
});