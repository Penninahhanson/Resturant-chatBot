const products =[]

class Foodstore {
    constructor(id, title, price,currency) {
        this.id = id;
        this.title = title;
        this.price = new Number(price);
        this.currency = currency
    }

    save() {
        products.push(this);
    }
    static findById(prodId) {
        return products.filter(p => p.id == prodId);
    }
}


const afiaefereandPoundedyam = new Foodstore("11",'afia efere and Pounded yam',3000)
const edikanikongandFufu = new Foodstore("12",'edikan ikong and fufu',2500)
const afangandEba = new Foodstore("13",'afang and Eba',2500)

module.exports= {
    afiaefereandPoundedyam,
    edikanikongandFufu,
    afangandEba
}