import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    router.navigate.and.resolveTo(true);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useValue: router }]
    });
    service = TestBed.inject(AuthService);
    service.clearSession();
  });

  afterEach(() => service.clearSession());

  function token(expiresInSeconds: number): string {
    const payload = JSON.stringify({
      id: 12, name: 'João Álvares', role: 'USER', sub: 'joao', exp: Date.now() / 1000 + expiresInSeconds
    });
    const encoded = btoa(String.fromCharCode(...new TextEncoder().encode(payload)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `header.${encoded}.signature`;
  }

  it('decodes UTF-8 JWT claims and keeps an unchecked session in this tab', () => {
    service.storeSession(token(30), false);
    expect(service.getLoggedUser()?.name).toBe('João Álvares');
    expect(localStorage.getItem('token')).toBeNull();
    expect(sessionStorage.getItem('token')).not.toBeNull();
  });

  it('clears both token stores on logout', () => {
    service.storeSession(token(30), true);
    expect(localStorage.getItem('token')).not.toBeNull();
    service.logout();
    expect(service.getToken()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('rejects expired or malformed tokens', () => {
    service.storeSession(token(-30), false);
    expect(service.getLoggedUser()).toBeNull();
    service.storeSession('invalid', false);
    expect(service.getLoggedUser()).toBeNull();
  });
});
