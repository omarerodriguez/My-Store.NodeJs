const {faker} = require('@faker-js/faker');

class CategoryService{
  constructor(){
    this.categories=[];
    this.catgGenerate();
  }

  catgGenerate(){
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.productMaterial()
      });
  }
}

  create(data){
    const newCategory ={
      id:faker.string.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  find(){
    return this.categories;
  }

  findOne(id){
    return this.categories.find(item=>item.id===id);
  }

  update(id,changes){
    const i =  this.categories.findIndex(item=> item.id===id);
    if(i ===-1){
      throw new Error('Category not found');
    }
    const cateory = this.categories[i];
    this.categories[i]={
      ...cateory,
      ...changes
    };
    return this.categories[i];
  }

  delete(id){
    const i =  this.categories.findIndex(item=> item.id===id);
    if(i ===-1){
      throw new Error('Category not found');
    }
    this.categories.splice(i,1);
    return {id};
  }
}

module.exports = CategoryService;
