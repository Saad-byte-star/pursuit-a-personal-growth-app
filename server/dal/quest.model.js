const Quest = require('../models/quest.model');


async function getQuestById(req, res) {
    try {
        const qid = req.params.id;
        const quest = await Quest.findById(qid);
        return res.status(200).json(quest);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `unable to get quest` })
    }
}

async function getAllQuest(req, res) {
    try {
        const quest = await Quest.find();
        return res.status(200).json(quest);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `unable to get quests` })
    }
}

async function getQuestAssignedTo(req, res) {
    try {
        const uid = req.params.id;
        const quests = await Quest.find({ AssignedTo: uid });
        return res.status(200).json(quests);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `unable to get quests assigned to this user` })
    }
}

async function getQuestCreatedBy(req, res) {
    try {
        const uid = req.params.id;
        const quests = await Quest.find({ CreatedBy : uid });
        return res.status(200).json(quests);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `unable to get quests created by this user` })
    }
}

async function addQuest(req, res) {
    try {
        const { Title , Description , Type , Difficulty , Status , CreatedBy , AssignedTo , DueDate } = req.body;
        const added = await Quest.create({ Title , Description , Type , Difficulty , Status , CreatedBy , AssignedTo , DueDate });
        return res.status(201).json(added);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `unable to add quests` });
    }
}


async function updateQuest(req, res) {
    try {
        const { QuestId , Title , Description , Type , Difficulty , Status , CreatedBy , AssignedTo , DueDate } = req.body;
        const updated = await Quest.findByIdAndUpdate( QuestId , { Title , Description , Type , Difficulty , Status , CreatedBy , AssignedTo , DueDate } , { new : true });
        return res.status(201).json(updated);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `unable to add quests` });
    }
}