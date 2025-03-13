import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('Weather app tests', () => {
    it('renders weather application title', () => {
        render(<App />);
        const linkElement = screen.getByText(/Weather Application/i);
        expect(linkElement).toBeInTheDocument();
    });
});