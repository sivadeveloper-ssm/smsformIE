import { Component } from '@angular/core';
import { DataService } from './services/dataservice';
import { Helperclass } from './Class/helperclass';
import {FormControl} from '@angular/forms';

declare var ActiveXObject: (type: string) => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smsform';

  public loading = false;

  
  
  public promotedControl = new FormControl();
  public mandatoryControl = new FormControl();
  private language ;
  private author;
  private geography;
  private type;
  private contentType;
  private templateType;

    //Values from XMETAL
    private attrAuthor;
    private attrLanguage;
    private attrArea;
    private attrTopics;
    private attrCitations;
    private attrType;
    private attrContentType;
    private attrEffectivedate;
    private attrGeography;
    private attrGoverningbody;
    private attrIndustries;
    private attrMandatory;
    private attrPromoted;
    private attrProduct;
    private attrPurgedate;
    private attrTemplatetype;

     // Property of the Collection results 
  public authors: any = [];
  public languages: any = [];
  public areas: any = [];
  public governingBodies: any =[];
  public citations: any = [];
  public fileTypes: any = [];
  public industries: any = [];
  public topics: any = [];
  public products: any = [];
  public sysnonyms: any = [];
  public templateTypes: any = [];
  public types: any = [];
  public contentTypes: any = [];
  public geographies: any = [];

 constructor(private api: DataService,private helper : Helperclass){}


 ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.
    
   this.loading = true;
   this.connectToXmetal();
   this.getResults();
 }


 //Connect to XMETAL APP and read all the Metadata tag attribute values.
 connectToXmetal() {
  var xmlApp = new ActiveXObject("XMetaL.Application");
 this.attrAuthor = xmlApp.Selection.ContainerNode.getAttribute("authoredby");
 this.attrLanguage = xmlApp.Selection.ContainerNode.getAttribute("language");
 this.attrArea = xmlApp.Selection.ContainerNode.getAttribute("area");
 this.attrTopics = xmlApp.Selection.ContainerNode.getAttribute("topic");
 this.attrCitations = xmlApp.Selection.ContainerNode.getAttribute("citations");
 this.attrType = xmlApp.Selection.ContainerNode.getAttribute("type");
 this.attrContentType = xmlApp.Selection.ContainerNode.getAttribute("contenttype");
 this.attrEffectivedate = xmlApp.Selection.ContainerNode.getAttribute("effectivedate");
 this.attrGeography = xmlApp.Selection.ContainerNode.getAttribute("geography");
 this.attrGoverningbody = xmlApp.Selection.ContainerNode.getAttribute("governingbody");
 this.attrIndustries = xmlApp.Selection.ContainerNode.getAttribute("industries");
 this.attrMandatory = xmlApp.Selection.ContainerNode.getAttribute("mandatory");
 this.attrPromoted = xmlApp.Selection.ContainerNode.getAttribute("promoted");
 this.attrProduct = xmlApp.Selection.ContainerNode.getAttribute("product");
 this.attrPurgedate = xmlApp.Selection.ContainerNode.getAttribute("purgedate");
 this.attrTemplatetype = xmlApp.Selection.ContainerNode.getAttribute("templatetype");
 }

  // Get data from the rest API
  getResults() {

    this.api.getData().subscribe(results => {
      // set the results of all the fields from forkjoin api call
     
      this.authors = results[0];
      this.languages = results[1];
      this.areas = results[2];
      this.governingBodies = results[3];
      this.citations = results[4];
      this.fileTypes = results[5];
      this.industries = results[6];
      this.topics = results[7];
      this.products = results[8];
      this.sysnonyms = results[9];
      this.templateTypes = results[10];
      this.types = results[11];
      this.contentTypes = results[12];
      this.geographies = results[13];
       
      

    
       this.helper.setBooleanFieldValue(this.attrPromoted,this.promotedControl);
       this.helper.setBooleanFieldValue(this.attrMandatory,this.mandatoryControl);

       this.loading = false;

    });
  }

}