import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
var tableData;
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent  {
    value: any = [];
    datacolumns;
    displayedColumns: any[] = [];

    manualPage = null;
    totalPagesNumber: number;


    exampleDatabase: ExampleHttpDatabase | null;
    expandedElement: GithubIssue | null;
    data: GithubIssue[] = [];
    dataSource = new MatTableDataSource<GithubIssue[]>();
    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    url: string;

    filterString:string="";

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    @Input('dataUrl') dataUrl: string;
    @Input('headerColumns') headerColumns: any[];
    @Input('search') searchEnable: boolean=false;
    @Output() outData = new EventEmitter();


    constructor(private _httpClient: HttpClient,
      private _service: DataServiceService, private router: Router) {

      this.value = [];

    }
    ngOnInit(): void {

      this.headerColumns.forEach(el => {
        if (el.active) {
          this.value.push(el.displayName);
          this.displayedColumns.push(el.columnName);
        }
      });
      this.datacolumns = new FormControl(this.value);

    }


    sendOutData(id) {
      this.outData.emit({ code: id })
    }


    ngAfterViewInit() {


      this.exampleDatabase = new ExampleHttpDatabase(this._httpClient, this._service, this.router);

      // If the user changes the sort order, reset back to the first page.
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      console.log(this.filterString);


      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.exampleDatabase!.getRepoIssues(this.dataUrl,
              this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize,this.filterString);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.totalElements;
            this.totalPagesNumber = data.totalPages;
            this.dataSource.paginator = this.paginator;
            return data.content;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            // Catch if the GitHub API has reached its rate limit. Return empty data.
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        ).subscribe(data => this.dataSource = data);

    }
    selection = new SelectionModel<GithubIssue>(true, []);

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      // this.isAllSelected() ?
      //     this.selection.clear() :
      //     this.dataSource.itemsforEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: GithubIssue): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.number + 1}`;
    }
    updateColumn(event: Event) {

      this.displayedColumns = [];
      this.headerColumns.forEach(el => {
        this.datacolumns.value.forEach(ele => {
          if (el.displayName == ele) {
            this.displayedColumns.push(el.columnName);
          }
        });
      });


    }
    addColumn(event: Event) {/*  */
      this.displayedColumns = [];

    }
    getColumnValue(id, columnName) {

      this.outData.emit({ columnName: columnName, columnValue: id })
    }
    applyFilter(filterValue: string) {
     // this.dataSource.filter = filterValue.trim().toLowerCase();
     this.filterString=filterValue.trim().toUpperCase();
      this.ngAfterViewInit();

    }
    sendMail(data) {

    }

    updateManualPage(index) {
      this.manualPage = index;
      this.paginator.pageIndex = index - 1;
      this.paginator.nextPage();

    }

    clearManualPage() {
      this.manualPage = null;
    }

    counter(i: number) {
      return new Array(i);
    }

    animal: string;
    name: string;


  }



  export interface GithubApi {
    items: GithubIssue[];
    total_count: number;
  }

  export interface GithubIssue {
    created_at: string;
    number: string;
    state: string;
    title: string;
  }

  /** An example database that the data source uses to retrieve data for the table. */
  export class ExampleHttpDatabase {
    constructor(private _httpClient: HttpClient, private _service: DataServiceService,
      private router: Router) { }
    getRepoIssues(data_url: string, sort: string, order: string, page: number, size: number,filter:string): Observable<any> {

      var href = "";

      href = data_url;
      const requestUrl =
        `${href}?sort=${sort}&order=${order}&page=${page}&size=${size}&filter=${filter}`;

      return this._httpClient.get<any>(requestUrl);
    }
  }

