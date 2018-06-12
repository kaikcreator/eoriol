export class CommentModel{
    constructor(
        public author:string,
        public content:string,
        public date:string,
        public avatar?:string,
        public replies?:CommentModel[],
        public email?:string
    ){}

    static getFakeComments(){
        let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Italic Text nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint check here cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        
        let c1 = new CommentModel("Paco Perez", loremIpsum, "June 3");
        let c2 = new CommentModel("Matias PRats", loremIpsum, "June 3");
        let c3_r1 = new CommentModel("Alfonso Roig", loremIpsum, "June 3");
        let c3_r2_r2 = new CommentModel("Enrique Oriol", loremIpsum, "June 3");
        let c3_r2 = new CommentModel("Juan Magán", loremIpsum, "June 3",null, [c3_r2_r2]);
        let c3_r3 = new CommentModel("Lucas Roig", "hola", "June 3");
        let c3 = new CommentModel("Marc Massa", loremIpsum, "June 3", null, [c3_r1, c3_r2, c3_r3]);

        return [c1, c2, c3];
    }
}
