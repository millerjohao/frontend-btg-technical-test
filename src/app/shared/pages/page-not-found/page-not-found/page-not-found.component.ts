import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  route = inject(ActivatedRoute);
  code = -1;

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    this.code = code && code !== 'not a number' ? Number(code) : -1;
  }
}
