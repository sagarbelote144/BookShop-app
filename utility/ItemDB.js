var Item = require('../model/item');
let UserItem=require('../model/userItem');
// const rp = require('request-promise');
const Promise = require('bluebird');


exports.getItems = (req, res, next) => {
    return new Promise((resolve, reject) => {
        Item.find({}, function(err, data) {
            console.log("Mongo data");
            // console.log(data);
            if(err){
                return next(err)
            }
            resolve(data)
        })

    })
    
}
exports.getItem = (req, res, next) => {
    return new Promise((resolve, reject) => {
        console.log("tension");
    console.log(req);
    Item.find({itemCode: req}, function(err, data){
        // console.log(data);
        if(err){
            return next(err)
        }
        resolve(data)
    })

    })
    
}

exports.getUserItemsfromdb = (req, res, next) => {
    return new Promise((resolve, reject) => {

    // console.log(req);
    UserItem.find({}, function(err, data){
        console.log("useritems rate it k liye");
        // console.log(data);
        if(err){
            reject(err);
        }
        resolve(data);
    });
});
}

exports.getUserItemfromdb = (req, res, next) => {
    return new Promise((resolve, reject) => {
        UserItem.find({userId: req}, function(err, statusData){
            console.log("avengers 4");
            // console.log(statusData);
    // console.log(data);
            if(err){
                reject(err);
            }
            resolve(statusData);
        });
    });
}

exports.getUserItembyEmail = (req, res, next) => {
    return new Promise((resolve, reject) => {
        UserItem.find({emailId: req}, function(err, statusData){
            console.log("avengers 4");
            // console.log(statusData);
    // console.log(data);
            if(err){
                reject(err);
            }
            resolve(statusData);
        });
    });
}

exports.postNewItem = (req, res, next) => {
    return new Promise((resolve, reject) => {
        var newItem = new Item ({
           itemCode: req.body.itemCode,
           itemName: req.body.itemName,
           catalogCategory: req.body.catalogCategory,
           author: req.body.author,
           note: req.body.note,
           description: req.body.description,
           rating: req.body.rating,
           emailId: req.body.emailId,
           imgUrl: req.body.imgUrl
        });
        newItem.save(function(err){
            if(err){
                reject(err)
            }
            console.log("Item Created");
            resolve({msg: "Item saved"});
        });
    });
}

exports.editNewItem = (req, res, next) => {
    return new Promise((resolve, reject) =>{
        let set = {
            itemCode: req.body.itemCode,
            itemName: req.body.itemName,
            catalogCategory: req.body.catalogCategory,
            author: req.body.author,
            note: req.body.note,
            description: req.body.description,
            rating: req.body.rating,
            emailId: req.body.emailId,
            imgUrl: req.body.imgUrl
        }
        let filter = {
            itemCode: req.body.itemCode
        }
        Item.findOneAndUpdate(filter, set, (err, data) => {
            if(err){
                reject(err);
            }
            Item.find({itemCode: req.body.itemCode}, function(err, itemData){
                if(err){
                    reject(err);
                }
                resolve(itemData);
            });
        });
    });
}



//jaadu//
// var data = [
//     {
//         itemCode: 1,
//         itemName: "Information technology and project management",
//         catalogCategory: "Academic Books",
//         author: "John Snow",
//         // note: "Golding's iconic 1954 novel, now with a new foreword by Lois Lowry, remains one of the greatest books ever written for young adults and an unforgettable classic for readers of any age.",
//         description: "This edition includes new Suggestions forFurther Reading by Jennifer Buehler. At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate. This far from civiliztion they can do anything they want. Anything. But order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far removed from reality as the hope of being resuced.",
//         rating: 5,
//         // imgUrl: "/assets/images/Acadbooks1.jpg",
//         imgUrl:"https://andwhattodowiththebooks.files.wordpress.com/2013/02/cropped-library-books-copy.jpg"
//         // imgUrl: "https://www.google.com/search?q=books+images&tbm=isch&source=lnms&sa=X&ved=0ahUKEwj98MHezNPgAhXGVt8KHU79AqwQ_AUICigB&biw=1440&bih=789&dpr=1#imgrc=C6pYPylghNz_KM:",
        
//     },
//     {
//         itemCode: 2,
//         itemName: "System Integration",
//         catalogCategory: "Academic Books",
//         author: "Rob Stark",
//         note: "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature..",
//         description: "This edition includes new Suggestions forFurther Reading by Jennifer Buehler. At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate. This far from civiliztion they can do anything they want. Anything. But order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far removed from reality as the hope of being resuced.",
//         rating: 3,
//         imgUrl: "/assets/images/Acadbooks1.jpg"
//         // imgUrl: "https://books.google.com/books/content?id=AK1JswEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70FRlmP5on0acL4XnKu-c0MZ3WsleM8_s1pMnENvsrZ1nlJHpYWU3E0T_qtRSMiLHG31EQ6qQAgiAKic0Sqeimen79904L7V0RJY-RrKyqPl32yrFSNod_vmnb0Yad1lZoykH5c",
//     },
    
    
//     {
//         itemCode: 3,
//         itemName: "Network based application development",
//         catalogCategory: "Academic Books",
//         author: "Harper Lee",
//         note: "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on Lee's observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was 10 years old. The story is told by the six-year-old Jean Louise Finch.",
//         description: "This edition includes new Suggestions forFurther Reading by Jennifer Buehler. At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate. This far from civiliztion they can do anything they want. Anything. But order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far removed from reality as the hope of being resuced.",
//         rating: 3,
//         imgUrl: "/assets/images/Acadbooks1.jpg"
//     },
    
    
//     {
//         itemCode: 4,
//         itemName: "The Descent of Monsters",
//         catalogCategory: "Novels",
//         author: "JY Yang",
//         note: "JY Yang continues to redefine the limits of silkpunk fantasy with their Tensorate novellas, which the New York Times lauded as joyously wild. In this third volume, an investigation into atrocities committed at a classified research facility threaten to expose secrets that the Protectorate will do anything to keep hidden.",
//         description: "This edition includes new Suggestions forFurther Reading by Jennifer Buehler. At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate. This far from civiliztion they can do anything they want. Anything. But order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far removed from reality as the hope of being resuced..",
//         rating: 2,
//         imgUrl: "https://books.google.com/books/content?id=AK1JswEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70FRlmP5on0acL4XnKu-c0MZ3WsleM8_s1pMnENvsrZ1nlJHpYWU3E0T_qtRSMiLHG31EQ6qQAgiAKic0Sqeimen79904L7V0RJY-RrKyqPl32yrFSNod_vmnb0Yad1lZoykH5c",
//     },
    
//     {
//         itemCode: 5,
//         itemName: "Norse Mythology ",
//         catalogCategory: "Novels",
//         author: "Anonymous",
//         note: "Ready Player One, BOI!!!!!!!!!!!!!! is a 2011 science fiction novel, and the debut novel of American author Ernest Cline. The story, set in a dystopian 2040s, follows protagonist Wade Watts on his search for an Easter egg in a worldwide virtual reality game, the discovery of which will lead him to inherit the game creator's fortune. Cline sold the rights to publish the novel in June 2010, in a bidding war to the Crown Publishing Group (a division of Random House).",
//         description: "This edition includes new Suggestions forFurther Reading by Jennifer Buehler. At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate. This far from civiliztion they can do anything they want. Anything. But order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far removed from reality as the hope of being resuced.",
//         rating: 3,
//         imgUrl: "https://upload.wikimedia.org/wikipedia/en/a/a4/Ready_Player_One_cover.jpg",
//     },
    
//     {
//         itemCode: 6,
//         itemName: "Ready Player One ",
//         catalogCategory: "Novels",
//         author: "Ernest Cline",
//         note: "Ready Player One, BOI!!!!!!!!!!!!!! is a 2011 science fiction novel, and the debut novel of American author Ernest Cline. The story, set in a dystopian 2040s, follows protagonist Wade Watts on his search for an Easter egg in a worldwide virtual reality game, the discovery of which will lead him to inherit the game creator's fortune. Cline sold the rights to publish the novel in June 2010, in a bidding war to the Crown Publishing Group (a division of Random House).",
//         description: "This edition includes new Suggestions forFurther Reading by Jennifer Buehler. At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate. This far from civiliztion they can do anything they want. Anything. But order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far removed from reality as the hope of being resuced..",
//         rating: 3,
//         imgUrl: "https://upload.wikimedia.org/wikipedia/en/a/a4/Ready_Player_One_cover.jpg",
//     },
//     {
//         itemCode: 7,
//         itemName: "Nineteen Eighty-Four",
//         catalogCategory: "Novels",
//         author: "George Orwell",
//         note: "Nineteen Eighty-Four, often published as 1984, is a dystopian novel published in 1949 by English author George Orwell.[2][3] The novel is set in the year 1984 when most of the world population have become victims of perpetual war, omnipresent government surveillance and propaganda.",
//         description: "This edition includes new Suggestions forFurther Reading by Jennifer Buehler. At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate. This far from civiliztion they can do anything they want. Anything. But order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far removed from reality as the hope of being resuced..",
//         rating: 3,
//         imgUrl: "https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg",
//     },
// ];
// var category = ["Academic Books", "Sci-Fi & Fantasy"];


 