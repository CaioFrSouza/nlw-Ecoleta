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