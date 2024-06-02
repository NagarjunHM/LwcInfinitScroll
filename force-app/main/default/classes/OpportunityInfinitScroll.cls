public without sharing class OpportunityInfinitScroll {
    @AuraEnabled
    public static List<Opportunity> getOpportunity(Integer rowOffset,Integer rowLimit){
        return [SELECT Id, Name ,LeadSource ,Amount ,ExpectedRevenue ,CloseDate ,StageName ,Probability from Opportunity LIMIT :rowLimit OFFSET :rowOffset];
    }

    @AuraEnabled
    public static Integer getRecordCount(){
        AggregateResult[] ar = [Select count(Id) recordcount from Opportunity];
        return (Integer)ar[0].get('recordcount');
    }
}