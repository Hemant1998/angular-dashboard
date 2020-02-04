import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef
} from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, BehaviorSubject, of as observableOf } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { DataServiceService } from "src/app/services/data-service.service";
import {
  animateText,
  onSideNavChange,
  onMainContentChange,
  onMainContentChangec
} from "../animation/animations";
import { AuthguardServiceService } from "src/app/services/authguard-service.service";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  MatTreeFlattener,
  MatTreeFlatDataSource
} from "@angular/material/tree";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  animations: [
    onSideNavChange,
    animateText,
    onMainContentChange,
    onMainContentChangec
  ]
})
export class NavbarComponent implements OnInit {
  profileName: Observable<string>;
  url: Observable<any>;
  isLoggedIn: Observable<boolean>;
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  public maincontent: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  appropriateClass: string = "";

  @HostListener("window:resize", ["$event"])
  getScreenHeight(event?) {
    //console.log(window.innerHeight);
    if (window.innerHeight <= 412) {
      this.appropriateClass = "bottomRelative";
    } else {
      this.appropriateClass = "bottomStick";
    }
  }
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _router: Router,
    private sanitizer: DomSanitizer,
    private routes: Router,
    private service: DataServiceService,
    private authService: AuthguardServiceService
  ) {
    this.getScreenHeight();
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.service.isLogged();
    if (this.isLoggedIn) this._router.navigate(["/admin"]);
  }

  @ViewChild("myclass", { static: false }) el: ElementRef;
  @ViewChild("sidenav", null) sidenav: any;
  toggleSidenav() {
    this.sideNavState = !this.sideNavState;
    // this.sidenav.toggle();
    setTimeout(() => {
      this.linkText = this.sideNavState;
      this.maincontent = this.sideNavState;
    }, 200);
    this.authService.sideNavState$.next(this.sideNavState);
  }

  logout() {
    localStorage.removeItem("loggedIn");
    this.isLoggedIn = this.service.isLogged();
    this._router.navigate(["/login"]);
  }

  transform(base64Image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon: node.icon,
      navigate_url: node.navigate_url,
      active: node.active,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

interface FoodNode {
  name: string;
  navigate_url: string;
  active?: boolean;
  icon?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: "Users",
    icon: "assignment_ind",
    navigate_url: "",
    active: true,
    children: [
      { name: "List Users", navigate_url: "/admin", icon: "list" },
      { name: "Create New Users", navigate_url: "/userForm", icon: "create" },
      { name: "Assign Roles", navigate_url: "#", icon: "assignment_turned_in" }
    ]
  },
  {
    name: "Roles",
    icon: "people",
    navigate_url: "#",
    active: true,
    children: [
      { name: "List Role", navigate_url: "#", icon: "list" },
      { name: "Create New Role", navigate_url: "#", icon: "create" }
    ]
  },
  {
    name: "Document Type",
    icon: "assignment",
    navigate_url: "#",
    active: true,
    children: [
      {
        name: "List Document Type",
        navigate_url: "document-type-listing",
        icon: "list"
      },
      {
        name: "New Document Type",
        navigate_url: "document-form",
        icon: "create"
      }
    ]
  },
  {
    name: "Document Template",
    navigate_url: "#",
    icon: "check_box_outline_blank",
    active: true,
    children: [
      { name: "List Doc Template", navigate_url: "#", icon: "list" },
      {
        name: "New Doc Template",
        navigate_url: "document-template-form",
        icon: "create"
      }
    ]
  },
  {
    name: "Dashboard",
    active: false,
    navigate_url: "#",
    icon: "home",
    children: [{ name: "List Doc Template", navigate_url: "#", icon: "list" }]
  },
  {
    name: "Documents",
    active: false,
    navigate_url: "#",
    icon: "work",
    children: [{ name: "List Doc Template", navigate_url: "#", icon: "list" }]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  navigate_url: string;
  icon: string;
  active: boolean;
  level: number;
}
