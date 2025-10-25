//Rotas da API  
const router = require("express").Router();
const Person = require("../model/Person");



router.post("/", async (req, res) => {

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    if (!name) {
        res.status(422).json({ error: "Nome é um campo obrigatório" });
        return;
    } else {
        try {
            await Person.create(person)

            res.status(201).json({ message: "Pessoa inserida no sistema com sucesso" });
        }
        catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
})

router.get('/', async(req, res)=>{
    try {
        const people = await Person.find();

        res.status(200).json(people);
    }catch (error) {
        res.status(500).json({error: error})
    }
})

router.get("/:id", async(req, res)=>{

    const id = req.params.id;

    try{
    
        const person = await Person.findOne({_id: id});

        if (!person){
            res.status(422).json({message: "Perfil não encontrado"});

            return;
        }

        res.status(200).json(person);

    }catch(error){
        res.status(500).json({error: error})
    }
})

router.patch("/:id", async (req, res) => {
    const id = req.params.id;

    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved
    };

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person);

        if (updatedPerson.matchedCount === 0) {
            return res.status(422).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json({ message: "Usuário atualizado com sucesso", data: person });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const person = await Person.findOne({ _id: id });

        if (!person) {
            return res.status(422).json({ message: "Usuário não encontrado" });
        }

        await Person.deleteOne({ _id: id });

        res.status(200).json({ message: "Usuário removido" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router