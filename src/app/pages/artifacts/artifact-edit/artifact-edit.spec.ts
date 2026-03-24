import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactEdit } from './artifact-edit.component';

describe('ArtifactEdit', () => {
  let component: ArtifactEdit;
  let fixture: ComponentFixture<ArtifactEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
