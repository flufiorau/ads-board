import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdsService} from '../ads.service';
import {Router} from '@angular/router';
import {Ad} from '../interfaces';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.css']
})
export class AdEditComponent implements OnInit {

  AdForm: FormGroup;
  editAdMode: boolean;
  currentAd: Ad;
  title = new BehaviorSubject<string>('');
  description = new BehaviorSubject<string>('');
  areCreateAd = true;
  pageTitle = 'New ad creation form';

  constructor(private adsService: AdsService,
              private router: Router) {
  }

  ngOnInit() {
    this.checkMaybeEditAdMode();
  }

  checkMaybeEditAdMode(): any {
    if (this.router.url !== '/edit') {
      const listOfRoute = this.router.url.split('/');
      const id = parseFloat(listOfRoute[listOfRoute.length - 1]);
      this.adsService.getAdById(id).subscribe(
        (selectedAd: Ad) => {
          if (selectedAd) {
            this.areCreateAd = false;
            this.pageTitle = 'Edit existing ad form';
            this.currentAd = selectedAd;
            this.title.next(selectedAd.title);
            this.description.next(selectedAd.description);
            this.editAdMode = true;
          } else {
            this.router.navigateByUrl('/edit');
          }
        }
      );
    }
    this.AdForm = new FormGroup({
      title: new FormControl(this.title.value, [Validators.required]),
      description: new FormControl(this.description.value, [Validators.required])
    });
  }

  createAd() {
    this.adsService.addNewAd(this.AdForm.value).subscribe(
      (createdAdId) => {
        this.AdForm.reset();
        this.router.navigateByUrl(`${createdAdId}`);
      }
    );
  }

  updateAd() {
    const ad = {...this.currentAd, ...this.AdForm.value};
    this.adsService.updateAd(ad).subscribe(
      () => {
        this.AdForm.reset();
        this.router.navigateByUrl(`${this.currentAd.id}`);
      }
    );
  }

}
