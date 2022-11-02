import { TestBed } from '@angular/core/testing';

import { InterceptorCredentialInterceptor } from './interceptor-credential.interceptor';

describe('InterceptorCredentialInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorCredentialInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorCredentialInterceptor = TestBed.inject(InterceptorCredentialInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
