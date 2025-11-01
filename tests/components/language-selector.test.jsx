import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../src/i18n/config'
import LanguageSelector from '../../src/components/LanguageSelector'

describe('LanguageSelector Component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
    // Clear localStorage
    localStorage.clear()
  })

  const renderWithI18n = () => {
    return render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    )
  }

  it('should render language selector', () => {
    renderWithI18n()
    const select = screen.getByRole('combobox', { name: /select language/i })
    expect(select).toBeInTheDocument()
  })

  it('should have all 5 languages as options', () => {
    renderWithI18n()
    const select = screen.getByRole('combobox')
    
    expect(select).toHaveValue('en')
    expect(select.querySelector('option[value="en"]')).toBeInTheDocument()
    expect(select.querySelector('option[value="fr"]')).toBeInTheDocument()
    expect(select.querySelector('option[value="it"]')).toBeInTheDocument()
    expect(select.querySelector('option[value="de"]')).toBeInTheDocument()
    expect(select.querySelector('option[value="es"]')).toBeInTheDocument()
  })

  it('should change language when selection changes', async () => {
    const user = userEvent.setup()
    renderWithI18n()
    
    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('en')
    
    await user.selectOptions(select, 'fr')
    expect(i18n.language).toBe('fr')
  })

  it('should persist language choice in localStorage', async () => {
    const user = userEvent.setup()
    renderWithI18n()
    
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'de')
    
    // Check localStorage was updated (i18n config handles this)
    expect(localStorage.getItem('i18nextLng')).toBe('de')
  })
})




