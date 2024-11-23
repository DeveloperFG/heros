import cors from 'cors'
import express, { json } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// const express = require('express');

const server = express();


server.use(express.json())

server.use(cors())

// const heros = []


// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend' }


// exempo de middleware global
server.use((req, res, next)=>{
  console.log(`URL CHAMADA: ${req.url}`)

  return next();
})


// middleware para alguns casos
 function checkHerois(req, res, next){
  if(!req.body.nome){
    return res.status(400).json({erro:'Nome do heroi é obrigatorio!'})
  }

  return next()
 }

 // middleware para alguns casos
 function checkHeroisIndex(req, res, next){
  const hero = heros[req.params.index];

  console.log(hero)

  if(!hero){
    return res.status(400).json({erro:'Esse heroi não existe!'})
  }

  return next()
 }


//  // buscar por id
//  function buscarHerosPorId(id){
//   return heros.filter( heros => heros.id == id)
//  }

//   // buscar por index heros
//   function buscarHerosPorId(id){
//     return heros.findIndex( heros => heros.id == id)
//    }
  

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


//exemplo 2 lista todos os herois
server.get(('/lista'), async (req, res)=>{

   const hero = await prisma.heros.findMany()

   res.status(200).json(hero)
})



//exemplo 5 listar 1 heroi
server.get('/lista/:index',(req, res)=>{
    const {index} = req.params;

    return res.json(heros[index])
})



//selecionar por id
// server.get('/lista/:index', (req, res)=>{
//   // const { index } = req.params;

//   res.json(buscarHerosPorId(req.params.index))

// })



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