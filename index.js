
import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json())
app.use(cors());


// Rota principal
app.get('/', (req, res) => {
  res.send('Bem-vindo à API!');
  // return res.json(usuarios);
});


//exemplo 2 lista todos os herois
app.get(('/lista'), async (req, res)=>{

  const hero = await prisma.heros.findMany()

  res.status(200).json(hero)
})



//exemplo 1 criar novo heroi
app.post('/lista', async (req, res)=>{

  await prisma.heros.create({
      data: {
        nome: req.body.nome,
        atk: req.body.atk,
        avatar: req.body.avatar
      }
    })

    res.status(201).json(req.body)
  
  // res.status(201).send('Cadastrado com sucesso!')

})



//exemplo 5 listar 1 heroi
app.get('/lista/:index',(req, res)=>{
    const {index} = req.params;

    return res.json(heros[index])
})



//exemplo 3 editar heroi
app.put('/lista/:id', async (req, res)=>{

  await prisma.heros.update({
    where:{
      id: req.params.id
    },
      data: {
        nome: req.body.nome,
        atk: req.body.atk,
        avatar: req.body.avatar
      }
    })

    res.status(201).json(req.body)
  
  // res.status(201).send('Cadastrado com sucesso!')

})

//exemplo 8 deletar um heroi
app.delete('/lista/:id', async (req, res)=>{
    await prisma.heros.delete({
      where: {
        id : req.params.id
      }

    })

  return res.status(200).json({messagem: 'Uuário deletado com sucesso!'})

})


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});