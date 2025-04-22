import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { Observable, Subscription } from 'rxjs';
import { map, filter, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit, OnDestroy {
  observableData !: Observable<number>;
  dataSubscription !: Subscription
  mappedData: number[] = [];
  filteredData: number[] = [];
  reducedData: number = 0;
  originalArray: number[] = []

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.observableData = this.data.getData();
    this.onMapreduceFilter()
  }

  onMapreduceFilter() {
    this.dataSubscription = this.observableData.pipe(
      map((data: number) => {
        this.originalArray.push(data); 
        const mappedValue = data * 2;
        this.mappedData.push(mappedValue);
        return mappedValue;
      }),
      filter((mappedValue: number) => {
        const isEven = mappedValue % 2 === 0;
        if (isEven) this.filteredData.push(mappedValue);
        return isEven;
      }),
      reduce((acc, filteredValue) => acc + filteredValue, 0)
    ).subscribe({
      next: (sum) => {
        this.reducedData = sum;
      },
      complete: () => alert('All operations (map -> filter -> reduce) completed.')
    });
  }
  ngOnDestroy(): void {
    if (this.dataSubscription)
      this.dataSubscription.unsubscribe();
  }
}
