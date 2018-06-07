import { PostMetaTagsModel } from "./post-meta-tags.model";

 
export class PostModel {
    public date:string;
    public title:string;
    public slug:string;//unique name as identifier of the article
    public path:string;//local path to the post
    public link:string;//absolute path to the post in wordpress site
    public image:string;
    public content?:string;
    public metas:PostMetaTagsModel
}
