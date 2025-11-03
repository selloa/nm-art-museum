import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './InterestForm.css'

function InterestForm() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // 'sending', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset status
    setStatus(null)
    setErrorMessage('')

    // Validate email
    if (!email.trim()) {
      setStatus('error')
      setErrorMessage(t('interestForm.invalidEmail'))
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMessage(t('interestForm.invalidEmail'))
      return
    }

    // Send email
    setStatus('sending')
    
    try {
      const response = await fetch('/api/send-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setEmail('') // Reset form on success
      } else {
        setStatus('error')
        setErrorMessage(data.error || t('interestForm.error'))
      }
    } catch (error) {
      console.error('Error sending interest email:', error)
      setStatus('error')
      setErrorMessage(t('interestForm.error'))
    }
  }

  return (
    <section className="interest-form" id="interest-form">
      <div className="section-header">
        <h2 className="section-title">{t('interestForm.title')}</h2>
        <p className="section-description">
          {t('interestForm.description')}
        </p>
        <p className="section-cta">
          {t('interestForm.cta')}
        </p>
      </div>
      <div className="interest-form-container">
        <form onSubmit={handleSubmit} className="interest-form-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t('interestForm.emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder={t('interestForm.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'sending'}
              required
            />
          </div>
          <button
            type="submit"
            className="form-submit-button"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? t('interestForm.sending') : t('interestForm.submitButton')}
          </button>
          {status === 'success' && (
            <p className="form-message form-message-success">
              {t('interestForm.success')}
            </p>
          )}
          {status === 'error' && (
            <p className="form-message form-message-error">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default InterestForm

