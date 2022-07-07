
export default class {
    excerptsData = [
        {
            id : 1,
            uuid : "hajkhajkhajkhajk1",
            adventure_uuid : "uaiouaop1oip1",
            number : 1,
            title : "Titulo 1",
            text : "Se você quiser ir para a direita, vá para a [NUMBER:2]",
            excerpts : "Qualquer coisa"
        },
        {
            id : 2,
            uuid : "hajkhajkhajkhajk2",
            adventure_uuid : "uaiouaop1oip2",
            number : 2,
            title : "Titulo 2",
            text : "Se você quiser ir para a direita, vá para a [NUMBER:5] [NUMBER:10]",
            excerpts : "Qualquer coisa 2"
        }
    ];
    
    
    excerpt = (value) => {
        return excerptsData.find((element) => {
            return element.number == value
        })
    }
    
    matchLink = (value) => {
        return value.match(/\[NUMBER\:[0-9]*\]/g).map(
            (r) => {
                let pageNumber = {};
                pageNumber[r] = `<a href="${r.match(/[0-9]+/i)[0]}"></a>`;
                return pageNumber
            }
        )
    }

    async getExcerpt(){
        console.log("get Excerpt");
    }
}