export interface IComment{
    id:number;
    post:number;
    parent:number;
    author:number;
    author_name:string;
    author_url:string;
    date:string;
    date_gmt:string;
    content:any;
    link:string;
    status:string;
    type:string;
    author_avatar_urls:any;
    meta:any;
    _links:any;
}