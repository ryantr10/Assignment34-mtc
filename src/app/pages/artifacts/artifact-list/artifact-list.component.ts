import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArtifactService } from '../../../services/artifact.service';

@Component({
  selector: 'app-artifact-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.css']
})
export class ArtifactListComponent implements OnInit {

  artifacts: any[] = [];
  loading = true;

  constructor(private artifactService: ArtifactService) {}

  ngOnInit(): void {
    this.artifactService.getAll().subscribe({
      next: (res: any) => {
        console.log(res); 
        this.artifacts = res;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}