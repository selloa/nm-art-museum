import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../src/i18n/config'
import App from '../../src/App'

describe('i18n Integration', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
    localStorage.clear()
  })

  const renderWithI18n = () => {
    return render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    )
  }

  it('should render app with default language', () => {
    renderWithI18n()
    expect(screen.getByText('Night of the Meteor')).toBeInTheDocument()
  })

  it('should update all components when language changes', async () => {
    const user = userEvent.setup()
    renderWithI18n()
    
    // Initially in English
    expect(screen.getByText('Characters')).toBeInTheDocument()
    
    // Change to French
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'fr')
    
    // Should now show French text
    expect(screen.getByText('Personnages')).toBeInTheDocument()
    expect(screen.getByText("Nuit de la Météorite")).toBeInTheDocument()
  })

  it('should persist language across page loads', async () => {
    const user = userEvent.setup()
    renderWithI18n()
    
    // Change to Italian
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'it')
    
    expect(localStorage.getItem('i18nextLng')).toBe('it')
    
    // Simulate page reload by re-rendering
    renderWithI18n()
    expect(i18n.language).toBe('it')
  })

  it('should update HTML lang attribute', () => {
    renderWithI18n()
    
    i18n.changeLanguage('de')
    expect(document.documentElement.lang).toBe('de')
    
    i18n.changeLanguage('es')
    expect(document.documentElement.lang).toBe('es')
  })
})



