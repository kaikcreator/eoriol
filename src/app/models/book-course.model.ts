import { ReviewModel } from './review.model';

export enum BookCourseType {
    COURSE= 'course',
    BOOK= 'book'
}

export enum Language {
    ES= 'Spanish',
    EN= 'English'
}

export class BookCourseModel {
    public image:string;
    public type:BookCourseType;
    public lang:Language;
    public title:string;
    public description:string;
    public price:string;
    public old_price:string;
    public link:string;
    public reviews:ReviewModel[];
    public attributionMsg:string;
    public attributionLink:string;
}
