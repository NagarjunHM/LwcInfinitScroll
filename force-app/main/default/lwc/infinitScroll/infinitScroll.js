import { LightningElement } from 'lwc';
import getOpportunity from '@salesforce/apex/OpportunityInfinitScroll.getOpportunity';
import getRecordCount from '@salesforce/apex/OpportunityInfinitScroll.getRecordCount';

const columns = [
    {label:'Name',fieldName:'Name'},
    {label:'LeadSource',fieldName:'LeadSource'},
    {label:'Amount',fieldName:'Amount'},
    {label:'ExpectedRevenue',fieldName:'ExpectedRevenue'},
    {label:'CloseDate',fieldName:'CloseDate'},
    {label:'StageName',fieldName:'StageName'},
    {label:'Probability',fieldName:'Probability'},
];

export default class InfinitScroll extends LightningElement {
    data = [];
    columns = columns;
    loading = false;
    recordCount = 0;
    limit=15;
    offset=0;

    // to fetch 
    async loadObjectSize(){
        this.loading = true;
        try{
            const recordCount = await getRecordCount();
            this.recordCount = recordCount;
        }
        catch(err)
        {
            console.log(err);
        }
       
    }
    
    // to fetch record details
    async loadData(){
        this.loading = true;
        try {
            this.loadObjectSize();
            const result = await getOpportunity({ rowOffset: this.offset, rowLimit: this.limit });            
            this.data = [...this.data, ...result];
            
        } catch(error) {
            console.error(error);
        } finally {
            this.loading = false;
        }
    }


    connectedCallback(){
        this.loadData();
    }

    
    async loadTrigger(){
    try {
        this.offset += this.limit;
        console.log(this.offset);
        console.log(this.limit);

        if(this.offset < this.recordCount){
            await this.loadData();
        }
        
        } catch(error) {
        console.error(error);
        }
    }
}