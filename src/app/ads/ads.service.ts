import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Ad, AdsDataSource, Page} from './interfaces';
import 'rxjs-compat/add/operator/max';


@Injectable({
  providedIn: 'root'
})
export class AdsService {
  adsPageableList = new BehaviorSubject<AdsDataSource>(undefined);

  constructor() {
    this.getAdsDataFromStorage();
  }

  getAdById(id: number): Observable<Ad> {
    const allAds: Array<Ad> = JSON.parse(localStorage.getItem(`allAds`));
    return of(allAds.find((ad) => ad.id === id));
  }

  getAdsDataFromStorage(): any {
    if (localStorage.getItem(`allAds`)) {
      this.adsFromStorageToPageableList(JSON.parse(localStorage.getItem(`allAds`)));
    }
  }

  adsFromStorageToPageableList(adsList: Array<Ad>): void {
    const numberOfPages = adsList.length / 5;
    const result: Array<Page> = [];
    for (let i = 0; i <= numberOfPages; i++) {
      const page: Page = {
        ads: []
      };
      page.ads = adsList.slice(i * 5, i * 5 + 5);
      result.push(page);
    }
    const dataSource: AdsDataSource = {
      content: result,
      first: true,
      last: false,
      pageNumber: 0,
      size: 5,
      totalElements: adsList.length,
      totalPages: numberOfPages
    };
    this.adsPageableList.next(dataSource);
  }

  addNewAd(ad: Ad): Observable<number> {
    let adsList = [];
    let maxId = 0;
    if (this.adsPageableList.value) {
      adsList = JSON.parse(localStorage.getItem(`allAds`));
      if (adsList.length) {
        maxId = Math.max.apply(Math, (adsList.map((someAd: Ad) => someAd.id)));
      }
    }
    ad.id = maxId + 1;
    ad.createdDate = new Date().getTime();
    ad.author = localStorage.getItem(`currentUser`);
    adsList.push(ad);
    localStorage.setItem(`allAds`, JSON.stringify(adsList));
    this.getAdsDataFromStorage();
    return of(ad.id);
  }

  deleteAd(id: number): Observable<boolean> {
    const listOfAds = JSON.parse(localStorage.getItem(`allAds`));
    localStorage.removeItem(`allAds`);
    const result: Array<Ad> = [];
    for (const ad of listOfAds) {
      if (ad.id !== id) {
        result.push(ad);
      }
    }
    localStorage.setItem(`allAds`, JSON.stringify(result));
    this.getAdsDataFromStorage();
    return of(true);
  }

  updateAd(changeableAd: Ad): Observable<boolean> {
    const listOfAds = JSON.parse(localStorage.getItem(`allAds`));
    const result: Array<Ad> = listOfAds.map((ad) => {
      if (ad.id === changeableAd.id) {
        return changeableAd;
      } else {
        return ad;
      }
    });
    localStorage.setItem(`allAds`, JSON.stringify(result));
    return of(true);
  }
}
