import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtifactService, Artifact } from 'src/app/services/artifact.service'; 

@Component({
  selector: 'app-artifact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './artifact-edit.component.html',
  styleUrls: ['./artifact-edit.component.css']
})
export class ArtifactEditComponent implements OnInit {

  artifact: Artifact | null = null;
  loading = true;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private artifactService: ArtifactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.artifactService.getById(id).subscribe({
        next: (res: Artifact) => {
          this.artifact = res;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Artifact not found.';
        }
      });
    }
  }

  saveChanges(): void {
    if (!this.artifact) return;

    this.artifactService.update(this.artifact.id, this.artifact).subscribe({
      next: () => {
        this.successMessage = 'Artifact updated successfully!';
        setTimeout(() => this.router.navigate(['/artifacts']), 1200);
      },
      error: () => {
        this.errorMessage = 'Failed to update artifact.';
      }
    });
  }
}