import cors from 'cors'
import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const server = express();


server.use(express.json())

server.use(cors())




// Rota principal
server.get('/', (req, res) => {
  res.send('Bem-vindo à API!');
  // return res.json(usuarios);
});


//exemplo 2 lista todos os herois
server.get(('/lista'), async (req, res)=>{

  const hero = await prisma.heros.findMany()

  res.status(200).json(hero)
})



//exemplo 1 criar novo heroi
server.post('/lista', async (req, res)=>{

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
server.get('/lista/:index',(req, res)=>{
    const {index} = req.params;

    return res.json(heros[index])
})



//exemplo 3 editar heroi
server.put('/lista/:id', async (req, res)=>{

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
server.delete('/lista/:id', async (req, res)=>{
    await prisma.heros.delete({
      where: {
        id : req.params.id
      }

    })

  return res.status(200).json({messagem: 'Uuário deletado com sucesso!'})

})


server.listen(3000);