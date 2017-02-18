import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import isOnline from 'is-online';

const options = {
  hostnames: ['www.cloudflare.com']
}
const observable = Observable.interval(5000);
export default observable.switchMap(() => Observable.fromPromise(isOnline(options)))
                         .distinctUntilChanged();

