export class CommentModel{
    constructor(
        public author:string="",
        public content:string="",
        public date:string="",
        public id:number=0,
        public parent:number=0,        
        public replies:CommentModel[]=[],
        public avatar?:string,
        public email?:string
    ){}

}
