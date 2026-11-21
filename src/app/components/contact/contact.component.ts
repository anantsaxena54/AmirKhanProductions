import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-page">
      <div class="contact-container">
        <!-- Left Editorial Column -->
        <div class="contact-editorial">
          <div class="eyebrow">CONTACT THE STUDIO</div>
          <h1 class="contact-headline">
            Let's make<br>
            <em class="font-serif">space</em><br>
            for stories<span class="red-dot">.</span>
          </h1>

          <p class="contact-lead">
            For professional inquiries, festival invitations, press correspondence, and archive inquiries, please communicate using the structured form alongside.
          </p>

          <div class="contact-info-blocks">
            <div class="info-block">
              <span class="info-label">STUDIO HEADQUARTERS</span>
              <p class="info-val">
                Aamir Khan Productions Pvt. Ltd.<br>
                Bandra West, Mumbai 400 050<br>
                Maharashtra, India
              </p>
            </div>

            <div class="info-block">
              <span class="info-label">SUBMISSION PROTOCOL</span>
              <p class="info-val info-muted">
                Please note that AKP does not review unsolicited scripts or treatments sent without registered WGAI or legal representation.
              </p>
            </div>
          </div>

          <div class="brand-lockup-watermark">
            <img 
              src="assets/brand/Aamir_khan_productions.png" 
              alt="AKP Emblem" 
              class="watermark-logo"
            />
            <span class="watermark-txt">AAMIR KHAN PRODUCTIONS PVT. LTD.</span>
          </div>
        </div>

        <!-- Right Form Column -->
        <div class="contact-form-col">
          <div class="form-wrapper">
            <div class="form-header">
              <h2 class="form-title">Send an inquiry<span class="red-dot">.</span></h2>
              <span class="required-note">* Required fields</span>
            </div>

            <!-- Success State Message -->
            <div class="status-box success" *ngIf="submitted" role="status" aria-live="polite">
              <span class="success-icon">✓</span>
              <div>
                <strong>Message Dispatched to AKP Studio</strong>
                <p>Thank you, {{ formData.name }}. Your correspondence has been logged by the production desk. A team member will respond to legitimate inquiries within 3–5 working days.</p>
                <button class="akp-link" (click)="resetForm()">Send another message ↗</button>
              </div>
            </div>

            <!-- Inquiry Form -->
            <form (ngSubmit)="onSubmit()" #contactForm="ngForm" *ngIf="!submitted" class="inquiry-form">
              <!-- Name Field -->
              <div class="form-field">
                <label for="name" class="field-label">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  [(ngModel)]="formData.name" 
                  #nameField="ngModel" 
                  required 
                  placeholder="e.g. Maya Sharma" 
                  class="field-input"
                  [class.error]="nameField.invalid && (nameField.dirty || nameField.touched)"
                />
                <span class="field-error" *ngIf="nameField.invalid && (nameField.dirty || nameField.touched)">
                  Please provide your name.
                </span>
              </div>

              <!-- Email Field -->
              <div class="form-field">
                <label for="email" class="field-label">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  [(ngModel)]="formData.email" 
                  #emailField="ngModel" 
                  required 
                  email 
                  placeholder="name@organization.com" 
                  class="field-input"
                  [class.error]="emailField.invalid && (emailField.dirty || emailField.touched)"
                />
                <span class="field-error" *ngIf="emailField.invalid && (emailField.dirty || emailField.touched)">
                  A valid email address is required.
                </span>
              </div>

              <!-- Inquiry Type Field -->
              <div class="form-field">
                <label for="reason" class="field-label">Inquiry Classification</label>
                <select 
                  id="reason" 
                  name="reason" 
                  [(ngModel)]="formData.reason" 
                  class="field-select">
                  <option value="General Studio Inquiry">General Studio Inquiry</option>
                  <option value="Press & Media Relations">Press & Media Relations</option>
                  <option value="Film Festivals & Retrospectives">Film Festivals & Retrospectives</option>
                  <option value="Rights, Distribution & Licensing">Rights, Distribution & Licensing</option>
                  <option value="Archive & 35mm Restoration">Archive & 35mm Restoration</option>
                </select>
              </div>

              <!-- Message Field -->
              <div class="form-field">
                <div class="label-row">
                  <label for="message" class="field-label">Your Message *</label>
                  <span class="char-count">{{ formData.message.length }} / 1000</span>
                </div>
                <textarea 
                  id="message" 
                  name="message" 
                  [(ngModel)]="formData.message" 
                  #messageField="ngModel" 
                  required 
                  maxlength="1000"
                  rows="5" 
                  placeholder="Please describe the context of your inquiry with clarity..."
                  class="field-textarea"
                  [class.error]="messageField.invalid && (messageField.dirty || messageField.touched)">
                </textarea>
                <span class="field-error" *ngIf="messageField.invalid && (messageField.dirty || messageField.touched)">
                  Please enter your message.
                </span>
              </div>

              <!-- Submit Button -->
              <div class="form-actions">
                <button 
                  type="submit" 
                  class="cta-pill submit-btn" 
                  [disabled]="contactForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">Send Inquiry</span>
                  <span *ngIf="isSubmitting">Transmitting...</span>
                  <span aria-hidden="true">↗</span>
                </button>
                <span class="privacy-note">Official presentation prototype · Encrypted dispatch</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
      background-color: var(--paper);
      min-height: calc(100vh - var(--header-height));
      display: flex;
      align-items: center;
      padding: 70px 0 100px;
    }

    .contact-container {
      max-width: var(--max-content);
      margin: 0 auto;
      padding: 0 var(--gutter);
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 80px;
      width: 100%;
    }

    /* Left Editorial */
    .contact-headline {
      font-size: clamp(48px, 6.2vw, 92px);
      letter-spacing: -0.06em;
      line-height: 0.94;
      margin: 20px 0 28px;
    }

    .contact-headline em {
      color: var(--red);
      font-weight: 400;
    }

    .red-dot {
      color: var(--red);
    }

    .contact-lead {
      font-size: 17px;
      line-height: 1.65;
      color: var(--ink-secondary);
      max-width: 480px;
      margin-bottom: 40px;
    }

    .contact-info-blocks {
      display: flex;
      flex-direction: column;
      gap: 24px;
      border-top: 1px solid var(--line);
      padding-top: 30px;
      margin-bottom: 40px;
    }

    .info-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.16em;
      color: var(--red);
      display: block;
      margin-bottom: 6px;
    }

    .info-val {
      font-size: 14px;
      color: var(--ink);
      line-height: 1.6;
    }

    .info-muted {
      color: var(--ink-muted);
      font-size: 13px;
    }

    .brand-lockup-watermark {
      display: flex;
      align-items: center;
      gap: 14px;
      opacity: 0.7;
    }

    .watermark-logo {
      height: 36px;
      width: auto;
    }

    .watermark-txt {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.16em;
    }

    /* Right Form */
    .form-wrapper {
      background: #FFFFFF;
      border: 1px solid var(--line);
      padding: 50px 48px;
      box-shadow: 0 16px 40px rgba(16, 22, 27, 0.05);
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid var(--line);
      padding-bottom: 18px;
      margin-bottom: 32px;
    }

    .form-title {
      font-size: 32px;
      letter-spacing: -0.035em;
    }

    .required-note {
      font-size: 11px;
      color: var(--ink-light);
    }

    .inquiry-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .field-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--ink-secondary);
      text-transform: uppercase;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .char-count {
      font-size: 10px;
      color: var(--ink-light);
    }

    .field-input,
    .field-select,
    .field-textarea {
      padding: 13px 16px;
      font-size: 14px;
      font-family: inherit;
      border: 1px solid var(--line);
      background: var(--paper);
      color: var(--ink);
      border-radius: 4px;
      transition: border-color 0.2s, background 0.2s;
      outline: none;
    }

    .field-input:focus,
    .field-select:focus,
    .field-textarea:focus {
      border-color: var(--red);
      background: #FFFFFF;
    }

    .field-input.error,
    .field-textarea.error {
      border-color: var(--red);
      background: #FFF8F7;
    }

    .field-error {
      font-size: 11px;
      color: var(--red);
      font-weight: 500;
    }

    .form-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .submit-btn {
      cursor: pointer;
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    .privacy-note {
      font-size: 11px;
      color: var(--ink-light);
    }

    /* Success State */
    .status-box.success {
      background: #FAF8F5;
      border: 1px solid var(--line);
      padding: 30px;
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      animation: fadeIn 0.3s ease;
    }

    .success-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--red);
      color: #FFFFFF;
      display: grid;
      place-items: center;
      font-size: 18px;
      flex-shrink: 0;
    }

    .status-box strong {
      font-size: 18px;
      display: block;
      margin-bottom: 8px;
    }

    .status-box p {
      font-size: 14px;
      color: var(--ink-secondary);
      line-height: 1.6;
      margin-bottom: 18px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 990px) {
      .contact-container {
        grid-template-columns: 1fr;
        gap: 50px;
      }
      .form-wrapper {
        padding: 32px 24px;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    reason: 'General Studio Inquiry',
    message: ''
  };

  isSubmitting = false;
  submitted = false;

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;
    this.isSubmitting = true;

    // Simulate reliable dispatch
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitted = true;
    }, 800);
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      reason: 'General Studio Inquiry',
      message: ''
    };
    this.submitted = false;
  }
}
