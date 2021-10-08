import express from 'express';
import db from '../service/ProfessionalService.js';
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post("/", [//Validações
    body('zipCode').isLength({min: 8, max:8}).withMessage("CEP Inválido"),
    body('zipCode').isNumeric().withMessage("CEP deve conter apenas números"),
    body("streat").isLength({min: 1}).withMessage("Endereço vazio"),
    body("number").isLength({min: 1}).withMessage("Número de Endereço vazio"),
    body("district").isLength({min:1 }).withMessage("Bairro vazio"),
    body("city").isLength({min: 1}).withMessage("Cidade vazia"),
    body("uf").custom((uf) =>{
        const ufAllow = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 
        'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];
        if(!ufAllow.includes(uf.toUpperCase())) return Promise.reject("UF Informado Inválido")
        return true;
    }),
    body('name').isLength({min: 1}).withMessage("Nome Vazio"),
    body('register').isLength({min: 1}).withMessage("Registro Vazio"),
    body('phone').isLength({min: 1}).withMessage("Telefone Vazio"),
    body('phone').isNumeric().withMessage("Telefone Deve Conter Apenas Número"),
    body('cellPhone').isLength({min: 1}).withMessage("Celular Vazio"),
    body('cellPhone').isNumeric().withMessage("Celular Deve Conter Apenas Número"),
    body('email').isLength({min: 1}).withMessage("Email Vazio"),
    body('email').isEmail().withMessage('Informe um email valido'),
    body('profession').isLength({min: 1}).withMessage("Profissão Vazia"),
    body('profession').isNumeric().withMessage("Profissão Deve Conter Apenas Número"),
], async (req, res) => {
    //Cadastra o Profisssional
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({message: errors.array()});
    }
    try{
        await db.insertProfessional(req.body);
        res.status(201).send({message: "Profissional cadastrado corretamente"});
        console.log(req.body)
    }catch{
        res.status(500).send({message: `Internal Error Server`})
    }
})

export default router;