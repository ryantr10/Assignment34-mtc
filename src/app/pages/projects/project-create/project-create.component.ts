import { Component } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {

  title = '';
  description = '';
  errorMessage = '';
  successMessage = '';

  constructor(private projectService: ProjectService, private router: Router) {}

  createProject() {
    const data = {
      title: this.title,
      description: this.description
    };

    this.projectService.create(data).subscribe({
      next: () => {
        this.successMessage = 'Project created successfully!';
        setTimeout(() => this.router.navigate(['/projects']), 1200);
      },
      error: () => {
        this.errorMessage = 'Failed to create project.';
      }
    });
  }
}
