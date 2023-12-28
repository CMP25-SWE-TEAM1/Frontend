import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DetailsNoChat from './DetailsNoChat';

describe('DetailsNoChat', () => {
  test('renders correctly, new message clicking', () => {
    // Mock function for handleComposeModalOpen
    const handleComposeModalOpen = jest.fn();

    // Render the component
    render(
      <Router>
        <DetailsNoChat handleComposeModalOpen={handleComposeModalOpen} />
      </Router>
    );

    // Assert component is rendered
    expect(screen.getByText('Select a message')).toBeInTheDocument();
    expect(screen.getByText('Choose from your existing conversations, start a new one, or just keep swimming.')).toBeInTheDocument();
    expect(screen.getByText('New message')).toBeInTheDocument();

    // Simulate a click on the "New message" link
    fireEvent.click(screen.getByText('New message'));

    // Assert that handleComposeModalOpen is called
    expect(handleComposeModalOpen).toHaveBeenCalled();
  });
});
