module.exports =   { query :(`
        INSERT INTO places(
            url,
            entidade,
            adress,
            number,
            state,
            city,
            itens
        ) VALUES (?,?,?,?,?,?,?);`),
    create:` (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT,
        entidade TEXT,
        adress TEXT,
        number TEXT,
        state TEXT,
        itens TEXT,
        city TEXT
    )`
    }

//     url:
//     'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1474&q=80',
//    entidade: 'Coletora de lixo 3000',
//    adress: 'Rua Depu',
//    number: '300',
//    state: 'SP',
//    itens: 'Sla',
//    city: 'São Paulo'