import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FilmsComponent } from './components/films/films.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { BeyondTheFrameComponent } from './components/beyond-the-frame/beyond-the-frame.component';
import { StudioComponent } from './components/studio/studio.component';
import { JournalComponent } from './components/journal/journal.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Aamir Khan Productions · Stories that stay with us' },
  { path: 'films', component: FilmsComponent, title: 'Film Archive · Aamir Khan Productions' },
  { path: 'films/:slug', component: FilmDetailComponent, title: 'Film Details · Aamir Khan Productions' },
  { path: 'beyond-the-frame', component: BeyondTheFrameComponent, title: 'Beyond the Frame · Aamir Khan Talkies · AKP' },
  { path: 'studio', component: StudioComponent, title: 'The Studio · Aamir Khan Productions' },
  { path: 'journal', component: JournalComponent, title: 'Editorial Journal · Aamir Khan Productions' },
  { path: 'contact', component: ContactComponent, title: 'Contact · Aamir Khan Productions' },
  { path: '**', redirectTo: '' }
];
