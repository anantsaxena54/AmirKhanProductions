import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import WavingPortfolioLanding from '../../../components/ui/waving-portfolio-landing';

@Component({
  selector: 'app-waving-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #reactContainer class="waving-hero-host"></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100svh;
      min-height: 700px;
      background: #F7F3ED;
      overflow: hidden;
      position: relative;
    }
    .waving-hero-host {
      width: 100%;
      height: 100%;
    }
  `]
})
export class WavingHeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('reactContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  private root: Root | null = null;
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngAfterViewInit(): void {
    if (this.isBrowser && this.containerRef?.nativeElement) {
      this.root = createRoot(this.containerRef.nativeElement);
      this.root.render(
        React.createElement(WavingPortfolioLanding, {
          name: 'Aamir Khan Productions',
          year: 'Est. 1999',
          roles: ['Cinema & Stories', 'Independent Film'],
          lettersLeft: ['P', 'F'],
          giantLetter: 'O',
          lettersRight: ['RT', 'LIO'],
          title: 'Aamir Khan Productions — Stories that stay with us',
          signature: 'AAMIR/KHAN',
          greeting: 'Namaste!',
          accent: '#E5262C',
          paper: '#F7F3ED',
          ink: '#141414',
          intro: true,
          height: '100%'
        })
      );
    }
  }

  ngOnDestroy(): void {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}
