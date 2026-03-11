const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");
const config = require("../config/config");

let db;

/*
============================
SQLITE IMPLEMENTATION
============================
*/

if (config.dbType === "sqlite") {

    db = new sqlite3.Database("./database/database.sqlite");

    const schema = fs.readFileSync(
        path.join(__dirname, "sql/schema.sql"),
        "utf8"
    );

    db.exec(schema);

}

/*
============================
SUPABASE IMPLEMENTATION
============================

Para usar Supabase:

1️⃣ instalar
npm install @supabase/supabase-js

2️⃣ importar:

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_KEY
);

3️⃣ reemplazar queries sqlite por:

supabase.from("users").select("*")
supabase.from("users").insert({...})

============================
*/

module.exports = db;