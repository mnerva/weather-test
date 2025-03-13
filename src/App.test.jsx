import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
});