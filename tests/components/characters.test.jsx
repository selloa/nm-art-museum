import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../src/i18n/config'
import Characters from '../../src/components/Characters'

describe('Characters Component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  const renderWithI18n = () => {
    return render(
      <I18nextProvider i18n={i18n}>
        <Characters />
      </I18nextProvider>
    )
  }

  it('should render section title and description in English', () => {
    i18n.changeLanguage('en')
    renderWithI18n()
    
    expect(screen.getByText('Characters')).toBeInTheDocument()
    expect(screen.getByText(/Meet the cast of Night of the Meteor/)).toBeInTheDocument()
  })

  it('should render character names in English', () => {
    i18n.changeLanguage('en')
    renderWithI18n()
    
    expect(screen.getByText('Dave')).toBeInTheDocument()
    expect(screen.getByText('Bernard')).toBeInTheDocument()
  })

  it('should render character names in French', () => {
    i18n.changeLanguage('fr')
    renderWithI18n()
    
    expect(screen.getByText('Dave')).toBeInTheDocument()
    expect(screen.getByText('Bernard')).toBeInTheDocument()
  })

  it('should render section title in French', () => {
    i18n.changeLanguage('fr')
    renderWithI18n()
    
    expect(screen.getByText('Personnages')).toBeInTheDocument()
  })
})









