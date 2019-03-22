import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdsService} from '../ads.service';
import {Ad} from '../interfaces';
import {AuthService} from '../../core/auth/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-ad-show',
  templateUrl: './ad-show.component.html',
  styleUrls: ['./ad-show.component.css']
})
export class AdShowComponent implements OnInit {

  adId: number;
  currentAd: Ad;
  currentUser: string;
  hasAccess = false;

  constructor(private router: Router,
              private location: Location,
              private adsService: AdsService,
              private authService: AuthService) {
    this.adId = +this.router.url.slice(1);
    this.getCurrentUser();
    this.adsService.getAdById(this.adId).subscribe(
      (selectedAd) => {
        if (selectedAd) {
          this.currentAd = selectedAd;
        }
      }
    );
  }

  ngOnInit() {
    if (this.currentAd) {
      this.getCurrentUser();
      this.authService.currentUser.subscribe((user: string) => {
          if (user) {
            this.currentUser = user;
            this.hasAccess = this.currentAd.author === this.currentUser;
          }
        }
      );
    }
  }

  getCurrentUser(): any {
    this.authService.getCurrentUser();
  }

  deleteAd() {
    this.adsService.deleteAd(this.currentAd.id).subscribe(
      () => this.router.navigateByUrl(`/`)
    );
  }

  toPreviousPage(): void {
    this.location.back();
  }

}
