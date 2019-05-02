import { Component } from '@angular/core';
import { DataService } from './services/dataservice';
import { ArrayClass } from './Class/ArrayClass';

declare var ActiveXObject: (type: string) => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smsform';

  public loading = false;

  
  
  public promoted;
  public mandatory;
  public languageModel;
  public authorModel;
  public geographyModel ;
  public typeModel;
  public contentTypeModel;
  public templateTypeModel;
  public citation;
  public area;
  public product;
  public industry;
  public topic;
  public governingBody;
  public purgeDate;
  public effectiveDate;

  public xmetalCitation;
  public xmetalArea;
  public xmetalTopic;
  public xmetalIndustries;
  public xmetalProduct;
  public xmetalGoverningbody;
  public xmetalType;
  public xmetalContentType;
  public xmetalAuthor;
  public xmetalTemplatetype;
  public xmetalLanguage;
  public xmetalGeography;
  public xmetalMandatory;
  public xmetalPromoted;

  

//Multiselect settings
public citationSettings;
public dropdownSettings;
public singleDropdownSettings;

    //Values from XMETAL
    public attrAuthor;
    public attrLanguage;
    public attrArea;
    public attrTopics;
    public attrCitations;
    public attrType;
    public attrContentType;
    public attrEffectivedate;
    public attrGeography;
    public attrGoverningbody;
    public attrIndustries;
    public attrMandatory;
    public attrPromoted;
    public attrProduct;
    public attrPurgedate;
    public attrTemplatetype;

    //wait till all the data loaded from web service
    public isDataLoaded = false;

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

 constructor(private api: DataService,
             private arrayClass : ArrayClass){}


 ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.
    
   this.loading = true;
   this.connectToXmetal();
   this.getResults();
   this.setHiddenValues();
   this.multiSelectSettings();   
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
       
      this.isDataLoaded = true;
       this.loading = false;

    

     

      //call to set the selected value based on xmetal app values
      setTimeout(() => {
        this.setSingleSeletedValue();
        this.setMultipleSelectedValues();
        this.setDateFieldValues();
        this.setBooleanFieldValue();
      });
     
    });
  }

  setMadatoryRadioButton(){
     this.xmetalMandatory = this.mandatory;
  }

  setPromotedRadioButton(){
    this.xmetalPromoted = this.promoted;
  }

   //Set date on date fields with the dates from XMETAL App.

   public setDateFieldValues()
   {
     if(this.attrPurgedate)
       this.purgeDate = this.attrPurgedate;
     if(this.attrEffectivedate)
        this.effectiveDate = this.attrEffectivedate;
   }
public setDateFieldValue(xmetalAttr : string,attribute : any){
  if(xmetalAttr){
    alert(xmetalAttr);
    var selectedDate = new Date(xmetalAttr);
    alert(selectedDate);
    attribute = xmetalAttr;
    alert(attribute);
  }
}


// Set Seleted value for multi select field with the values from XMETAL App.
public setMultipleSelectedValues(){

    if(this.attrCitations){
     let arrString =   this.attrCitations.split(" ");
     this.citation = arrString.map( res => {
      return this.citations.find(o => o.id == res);
       });
    }
    if(this.attrArea){
      let arrString =   this.attrArea.split(" ");
      this.area = arrString.map( res => {
       return this.areas.find(o => o.id == res);
        });
    }
    if(this.attrTopics){
      let arrString =   this.attrTopics.split(" ");
      this.topic = arrString.map( res => {
       return this.topics.find(o => o.id == res);
        });
    }
    if(this.attrProduct){
       let arrString =   this.attrProduct.split(" ");
      this.product = arrString.map( res => {
       return this.products.find(o => o.id == res);
        });
    }
    if(this.attrGoverningbody){
      let arrString =   this.attrGoverningbody.split(" ");
      this.governingBody = arrString.map( res => {
       return this.governingBodies.find(o => o.id == res);
        });
    }
   if(this.attrIndustries){
      let arrString = this.attrIndustries.split(" ");
      this.industry= arrString.map( res => {
        return this.industries.find(o => o.id == res);
     });
   }
  }
 //set selected value on the web App with values from xmetal app
 public setSingleSeletedValue()
 {
    if(this.attrAuthor)
    this.authorModel = this.authors.find( o => o.id == this.attrAuthor);
    if(this.attrLanguage)
      this.languageModel = this.languages.find( o => o.id == this.attrLanguage);
    if(this.attrContentType)
    this.contentTypeModel = this.contentTypes.find( o => o.id == this.attrContentType);
    if(this.attrType)
    this.typeModel=  this.types.find( o => o.id == this.attrType);
    if(this.attrGeography)
    this.geographyModel = this.geographies.find( o => o.id == this.attrGeography);
    if(this.attrTemplatetype)
    this.templateTypeModel = this.templateTypes.find( o => o.id == this.attrTemplatetype);
    console.log(this.languageModel);
 }

   // Set boolean field values from XMETAL APP.
public setBooleanFieldValue() {
    if(this.attrPromoted)
        this.promoted = this.attrPromoted;
    if(this.attrMandatory)
        this.mandatory = this.attrMandatory;
 }




  multiSelectSettings() {

    this.citationSettings = {
      singleSelection : false,
      idField : 'id',
      textField : 'cfrId',
      itemsShowLimit : 3,
      enableCheckAll : false,
      allowSearchFilter : true
    };
    this.dropdownSettings = {
      singleSelection : false,
      idField : 'id',
      textField : 'description',
      itemsShowLimit : 3,
      enableCheckAll : false,
      allowSearchFilter : true
    };

    this.singleDropdownSettings = {
      singleSelection : true,
      idField : 'id',
      textField : 'description',
      itemsShowLimit : 3,
      enableCheckAll : false,
      allowSearchFilter : true
    }
  }


  setContentAndTemplateType(){
    
    if(this.typeModel){
            this.xmetalType = this.typeModel.id;
            let contentTypeObj = this.contentTypes.find( o => o.id == this.typeModel.contentId);
            let templateTypeObj = this.templateTypes.find( o => o.id == this.typeModel.templateId );
            this.contentTypeModel = contentTypeObj;
            this.xmetalContentType = this.contentTypeModel.id;
            this.templateTypeModel = templateTypeObj;
            this.xmetalTemplatetype = this.templateTypeModel.id;
    }
    else{
       this.contentTypeModel = '';
       this.templateTypeModel = '';
    }
  }

  onAreaSelect(){
    this.xmetalArea = this.arrayClass.setMultivalues(this.area);
  }
  onTopicSelect(){
    this.xmetalTopic = this.arrayClass.setMultivalues(this.topic);
  }
  onProductSelect(){
    this.xmetalProduct = this.arrayClass.setMultivalues(this.product);
  }
  onGoverningBodySelect(){
    this.xmetalGoverningbody = this.arrayClass.setMultivalues(this.governingBody);
  }
  onIndustrySelect(){
    this.xmetalIndustries = this.arrayClass.setMultivalues(this.industry);
  }

  onAuthorSelect(){
   this.xmetalAuthor = this.authorModel.id;
 }

 onGeographySelect(){
   this.xmetalGeography = this.geographyModel.id;
 }

 onLanguageSelect() {
   this.xmetalLanguage = this.languageModel.id;
 }
 


  setXmetalAndCitationRelatedFields(){
  
    if(this.citation !=null && this.citation !="undefined" && this.citation !=''){
  
      this.xmetalCitation = this.arrayClass.setMultivalues(this.citation);
    
    let areasObjectArray : any = [];
    let governingBodiesObjArray : any = [];
    let industriesObjectArray : any = [];
    let productsObjectArray : any = [];
    let topicsObjectArray : any = [];

    let cfrareaArray : any = [];
    let cfrgoverningBodiesArray : any = [];
    let cfrindustriesArray : any = [];
    let cfrproductArray : any = [];
    let cfrTopicsArray : any = [];

    let listofIds = this.arrayClass.createArrayofIds(this.citation);
    this.api.getCFRRelatedIDs("cfrareas",listofIds).subscribe( cfrarea => {
      this.loading = true;
       cfrareaArray = Array.from(new Set(cfrarea));
       cfrareaArray.forEach( areaId => {
          areasObjectArray.push(this.areas.find(o => o.id == areaId));
       });
       this.area = areasObjectArray;
       this.xmetalArea = this.arrayClass.setMultivalues(areasObjectArray); 
       this.loading  = false;
    });

    this.api.getCFRRelatedIDs("cfrgoverningbodies",listofIds).subscribe(cfrGovBody => {
      this.loading = true;
      cfrgoverningBodiesArray = Array.from(new Set(cfrGovBody));
      cfrgoverningBodiesArray.forEach( govId => {
        governingBodiesObjArray.push(this.governingBodies.find(o => o.id == govId));
      });
      this.governingBody = governingBodiesObjArray;
      this.xmetalGoverningbody = this.arrayClass.setMultivalues(governingBodiesObjArray);
      this.loading = false;
    });

    this.api.getCFRRelatedIDs("cfrindustries", listofIds).subscribe(cfrindustry => {
      this.loading = true;
      cfrindustriesArray = Array.from(new Set(cfrindustry));
      cfrindustriesArray.forEach( indId => {
        industriesObjectArray.push(this.industries.find( o=> o.id == indId));
      });

      this.industry = industriesObjectArray;
      this.xmetalIndustries = this.arrayClass.setMultivalues(industriesObjectArray);
      this.loading = false;
    })

    this.api.getCFRRelatedIDs("cfrproducts", listofIds).subscribe(cfrproduct => {
      this.loading = true;
      cfrproductArray = Array.from(new Set(cfrproduct));
      cfrproductArray.forEach( prdId => {
        productsObjectArray.push(this.products.find(o => o.id == prdId));
      });

      this.product = productsObjectArray;
      this.xmetalProduct = this.arrayClass.setMultivalues(productsObjectArray);
      this.loading = false;
    })


    this.api.getCFRRelatedIDs("cfrtopics", listofIds).subscribe( cfrtopic => {
      this.loading = true;
      cfrTopicsArray = Array.from(new Set(cfrtopic));
      cfrTopicsArray.forEach( topicId => {
          topicsObjectArray.push(this.topics.find( o=> o.id == topicId));
      });
      this.topic = topicsObjectArray;
      this.xmetalTopic = this.arrayClass.setMultivalues(topicsObjectArray);
      this.loading = false;
    })

  }
  else{
    this.area = '';
    this.governingBody = '';
    this.industry = '';
    this.topic = '';
    this.product = '';
    this.xmetalCitation = '';
    this.xmetalArea = '';
    this.xmetalGoverningbody = '';
    this.xmetalIndustries = '';
    this.xmetalProduct = '';
    this.xmetalTopic = '';
  }
  }


  //This fun will set values from xmetal to the hidden input values to later assign back to xmetal
setHiddenValues(){
  if(this.attrArea)
      this.xmetalArea = this.attrArea;
  if(this.attrTopics)
      this.xmetalTopic = this.attrTopics;
  if(this.attrCitations)
      this.xmetalCitation = this.attrCitations;
  if(this.attrType)
      this.xmetalType = this.attrType;
  if(this.attrContentType)
      this.xmetalContentType = this.attrContentType;
  if(this.attrGeography)
    this.xmetalGeography = this.attrGeography;
  if(this.attrGoverningbody)
    this.xmetalGoverningbody = this.attrGoverningbody;
  if(this.attrIndustries)
    this.xmetalIndustries = this.attrIndustries;
  if(this.attrProduct)
  this.xmetalProduct = this.attrProduct;
  if(this.attrTemplatetype)
    this.xmetalTemplatetype = this.attrTemplatetype;
  if(this.attrAuthor)
      this.xmetalAuthor = this.attrAuthor;
    if(this.attrCitations)
       this.xmetalCitation = this.attrCitations;
       if(this.attrEffectivedate)
        this.effectiveDate = this.attrEffectivedate;
        if(this.attrPurgedate)
        this.purgeDate = this.attrPurgedate;
    if(this.attrMandatory)
      this.xmetalMandatory = this.attrMandatory;
    if(this.attrPromoted)
      this.xmetalPromoted = this.attrPromoted;
}

}