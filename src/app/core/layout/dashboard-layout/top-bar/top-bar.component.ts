import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  imports: [BreadcrumbModule],
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  items = signal<MenuItem[]>([]);

  home: MenuItem = { label: 'Home', routerLink: '/' };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.items.set(this.createBreadcrumbs(this.route.root));
    });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children = route.children;

    if (!children.length) return breadcrumbs;

    for (const child of children) {
      const routeURL = child.snapshot.url.map((s) => s.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
        const label = child.snapshot.data['breadcrumb'];

        if (label) {
          breadcrumbs.push({
            label,
            routerLink: url,
          });
        }
      }
      this.createBreadcrumbs(child, url, breadcrumbs);
    }

    breadcrumbs.forEach((b, i) => {
      b.styleClass = i === breadcrumbs.length - 1 ? 'active-breadcrumb' : 'breadcrumb-item';
    });

    return breadcrumbs;
  }
}
