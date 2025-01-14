import { users } from "../infra/bd.js"
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

function UsuarioController(app) {
    app.get('/usuario', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })

            const sql = 'SELECT * FROM Usuario'
            db.each(sql,(err, row)); {
                if (err) {
                    throw err;
                }
                res.send(`${row.nome} ${row.email} - ${row.senha}`);
            }

        }

        )()
    }
    app.get('/usuario/email/:email', buscar)
    function buscar(req, res) {
        const usuario = users.find(usuario =>
            usuario.email === req.params.email)
        if (usuario) {
            res.send(`<b><p>nome: ${usuario.nome}</p></b>
            <p>email: ${usuario.email}</p>
            <p>senha: ${usuario.senha}</p>`)
        } else {
            res.send(`Usuário: ${req.params.email} não encontrado.`)
        }
    }
    app.post('/usuario', inserir)
    function inserir(req, res) {
        res.send('Inserindo Usuários')
        users.push(req.body)
        console.log(req.body)
    }
    app.delete('/usuario/email/:email', deletar)
    function deletar(req, res) {
        const usuario = users.find(usuario =>
            usuario.email === req.params.email)
        if (usuario) {
            res.send(`Usuário: ${usuario.nome} deletado`)
            const index = users.indexOf(usuario)
            users.splice(index, 1)
        } else {
            res.send(`Usuário com email: ${req.params.email} não encontrado.`)
        }
    }
    app.put('/usuario/email/:email', Atualizar)
    function Atualizar(req, res) {
        const usuario = users.find(usuario =>
            usuario.email === req.params.email)
        if (usuario) {
            res.send(`Usuário: ${usuario.nome} deletado`)
            const index = users.indexOf(usuario)
            users[index].nome = req.body.nome
            users[index].email = req.body.email
            users[index].senha = req.body.senha
        } else {
            res.send(`Usuário com email: ${req.params.email} não encontrado.`)
        }
    }
}
export default UsuarioController