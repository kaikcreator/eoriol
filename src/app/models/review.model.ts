export class ReviewModel {
    constructor(
        public user:string ="",
        public content:string ="",
        public rating:number=5,
        public user_img_50x50:string = ""
    ){}
}
