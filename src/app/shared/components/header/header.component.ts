import { Component, OnInit, Input } from '@angular/core';
import { faHome, faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() activeTab = 'home';

  public faHome = faHome;
  public faTasks = faTasks;

  constructor() { }

  ngOnInit(): void {
  }

}
