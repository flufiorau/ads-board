import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdsService} from '../ads.service';
import {Ad} from '../interfaces';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'app-ad-show',
  templateUrl: './ad-show.component.html',
  styleUrls: ['./ad-show.component.css']
})
export class AdShowComponent implements OnInit {

  currentAd: Ad;
  currentUser: string;
  hasAccess = false;

  constructor(private router: Router,
              private adsService: AdsService,
              private authService: AuthService) {
    this.getCurrentUser();
    this.adsService.getAdById(+this.router.url.slice(1)).subscribe(
      (selectedAd) => {
        this.currentAd = selectedAd;
      }
    );
  }

  ngOnInit() {
    this.getCurrentUser();
    this.authService.currentUser.subscribe((user: string) => {
        if (user) {
          this.currentUser = user;
          this.hasAccess = this.currentAd.author === this.currentUser;
        }
      }
    );
  }

  getCurrentUser(): any {
    this.authService.getCurrentUser();
  }

  deleteAd() {
    this.adsService.deleteAd(this.currentAd.id).subscribe(
      () => this.router.navigateByUrl(`/`)
    );
  }

}
