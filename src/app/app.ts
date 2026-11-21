import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <app-navbar [isDarkTheme]="isDarkNav"></app-navbar>
    <main id="main-content" tabindex="-1">
      <router-outlet></router-outlet>
    </main>
    <app-footer [isDark]="isDarkFooter"></app-footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      outline: none;
    }
  `]
})
export class App implements OnInit {
  isDarkNav = true;
  isDarkFooter = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        // On home (/) with warm ivory paper hero, navbar is light theme; on /beyond-the-frame it is dark
        this.isDarkNav = url.startsWith('/beyond-the-frame');
        // PREVIOUS SPOTLIGHT HERO (Uncomment if restoring dark spotlight hero):
        // this.isDarkNav = url === '/' || url === '' || url.startsWith('/beyond-the-frame');
        // Footer styling
        this.isDarkFooter = url.includes('/contact') || url.startsWith('/beyond-the-frame');
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
  }
}
