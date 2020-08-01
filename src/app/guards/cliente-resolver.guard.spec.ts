import { TestBed } from '@angular/core/testing';

import { ClienteResolverGuard } from './cliente-resolver.guard';

describe('ClienteResolverGuard', () => {
  let guard: ClienteResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClienteResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
