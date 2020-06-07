const StatesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
const StateInput = $('[name = state]')
const CityInput = $('[name = city]')
const Loading = $('.loading')
let bolRes = false
const ufs = fetch(StatesUrl).then(async(res)=>await res.json())
const objPost = {
    itens:[]
}
const changeState = () => {
    StateInput.change(async(e)=> {
        CityInput.prop('disabled','true')
        CityInput.html('')
        val = StateInput.val()
        const city = await (await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${val}/distritos`).catch(e=>{
            return CityInput.addClass('is-invalid')
        })).json()
        await city.forEach(element => {
            const CityId = element.id
            const name = element.nome
            CityInput.append(`<option value="${CityId}">${name}</option>`)
        })
        CityInput.removeAttr('disabled')
        
    })
}
const resStates = (width) => {
    if(width < 1250)
        bolRes = true
    else bolRes = false
    init(bolRes)
}
    const init = async(boll)=> {
        StateInput.html('<option value="undefined">Selecione o estado</option>')
        if(boll)
            StateInput.html('<option value="undefined">Estado</option>')
        uf = await ufs

        uf.forEach(element => {
            const StatesName = element.nome
            const StatesUf = element.sigla
            if(boll){
                return StateInput.append(`<option value = ${StatesUf}> ${StatesUf}</option>`)}
             StateInput.append(`<option value = ${StatesUf}> ${StatesName}</option>`)

        });
        
    }
    const submit = ()=> {
        $('form').submit(e=> {
            e.preventDefault()
            $('.form-control').each((index,element)=> {
                const el = $(element)
                const val = el.val()
                if(!val) {
                    return el.addClass('is-invalid')
                }

            if(objPost.itens.length <= 0)
                return $('.items-grid li').each((index,element)=>{ $(element).addClass('err')})

            Loading.toggleClass('d-flex')

            el.removeClass('is-invalid')
            $('.items-grid li').each((index,element)=> $(element).removeClass('err'))
        })

    })
}
    $(document).ready(()=> {
        changeState()
        resize(resStates)
        submit()

})

$('.items-grid li').each(async(index,element)=> {
    $(element).click(()=> {
        $(element).toggleClass('Clicked')
        const elementId = element.dataset.id
        const index = objPost.itens.indexOf(elementId)
        let filter
        if(index > -1){
            filter = objPost.itens.filter(filterElement=> elementId != filterElement)
            objPost.itens = filter
        }
        else objPost.itens.push(elementId)
        console.log(objPost)
    })
})