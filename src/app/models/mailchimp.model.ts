export enum MailchimpSubscriptionStatus {
    subscribed = "subscribed",
    pending = "pending"
}

export enum MailchimpSubscriptionResults {
    success = "success",
    error = "error"
}


export class MailchimpProfileModel {
    constructor(
        public email:string="",
        public name:string="",
        public status:string=MailchimpSubscriptionStatus.pending
    ){

    }
}


export interface MailchimpSubscribeHttpResponse {
    result:MailchimpSubscriptionResults;
    msg:string;
}
