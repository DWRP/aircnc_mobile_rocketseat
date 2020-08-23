class Components{
    cardLeveis({index,img,level}){
        return `<button class="card_leveis" onClick="loadProjects('${index}')">
                    <img src="./src/assets/images/image/${img}" alt="${level}">
                    <h1>${level.toUpperCase()}</h1>
                </button>`
    }
    cardProjects({name, image, path}){
        return `<button class="card_projects" onClick="changeFrame('${path}')">
                    <img src="./src/assets/images/image/${image}" alt="">
                    <h1>${name}</h1>
                </button>`
    }
}