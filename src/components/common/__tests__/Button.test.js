import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from '../Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const {getByText} = render(
      <Button title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <Button title="Test Button" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    const {getByTestId} = render(
      <Button title="Test Button" onPress={() => {}} loading={true} />
    );
    
    // Vérifie que l'indicateur de chargement est présent
    expect(getByTestId('button-loading')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <Button title="Test Button" onPress={onPressMock} disabled={true} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('applies correct variant styles', () => {
    const {getByTestId} = render(
      <Button title="Test Button" onPress={() => {}} variant="secondary" />
    );
    
    const button = getByTestId('button');
    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: 'transparent',
        }),
      ])
    );
  });
});
