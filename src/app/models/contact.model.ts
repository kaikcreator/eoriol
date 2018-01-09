export enum ContactTopic{
    proposal = "Project/Job proposal",
    training = "Training",
    talks = "Talks",
    jobOffer = "Post job offer",
    courses = "Online Courses",
    help = "I Need Help",
    other = "Other"
};

export class ContactModel {
    constructor(
        public name:string="",
        public email:string="",
        public topic:ContactTopic,
        public message:string
    ){

    }
}
