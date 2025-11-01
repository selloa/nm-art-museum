import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../src/i18n/config'
import Hero from '../../src/components/Hero'

describe('Hero Component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  const renderWithI18n = () => {
    return render(
      <I18nextProvider i18n={i18n}>
        <Hero />
      </I18nextProvider>
    )
  }

  it('should render with English translations', () => {
    i18n.changeLanguage('en')
    renderWithI18n()
    
    expect(screen.getByText('Night of the Meteor')).toBeInTheDocument()
    expect(screen.getByText('A Maniac Mansion Fan Remake')).toBeInTheDocument()
  })

  it('should render with French translations', () => {
    i18n.changeLanguage('fr')
    renderWithI18n()
    
    expect(screen.getByText("Nuit de la Météorite")).toBeInTheDocument()
  })

  it('should render with Italian translations', () => {
    i18n.changeLanguage('it')
    renderWithI18n()
    
    expect(screen.getByText("Notte della Meteora")).toBeInTheDocument()
  })

  it('should render with German translations', () => {
    i18n.changeLanguage('de')
    renderWithI18n()
    
    expect(screen.getByText("Nacht des Meteoriten")).toBeInTheDocument()
  })

  it('should render with Spanish translations', () => {
    i18n.changeLanguage('es')
    renderWithI18n()
    
    expect(screen.getByText("Noche del Meteorito")).toBeInTheDocument()
  })

  it('should have music button with translated aria-label', () => {
    i18n.changeLanguage('en')
    renderWithI18n()
    
    const button = screen.getByRole('button', { name: /play background music/i })
    expect(button).toBeInTheDocument()
  })
})









