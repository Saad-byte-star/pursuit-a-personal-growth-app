const Role = require('../models/role.model');

async function getRoleById(req, res) {
    try {
        const rid = req.params.id;
        const role = await Role.findById(rid);
        if (!role) {
            return res.status(404).json({ msg: `role not found against id : ${rid}` });
        }
        return res.status(200).json(role);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `failed to get role` });
    }
}

async function getAllRole(req, res) {
    try {
        const allRole = await Role.find();
        if (!allRole) {
            return res.status(404).json({ msg: `no roles exist` });
        }
        return res.status(200).json(allRole);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `failed to get roles` });
    }
}

async function addRole(req, res) {
    try {
        const { Id, Title } = req.body;
        const alreadyExists = await Role.findOne({ Id, Title });
        if (!alreadyExists) {
            const added = await Role.create({ Id, Title });
            return res.status(201).json(added);
        }
        return res.status(400).json({ msg: `user already exists with the Title : ${Title}` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `failed to add role` });
    }
}


async function updateRole(req, res) {
    try {
        const { Id, newId, newTitle } = req.body;
        const updated = await Role.findByIdAndUpdate(Id, { newId, newTitle }, { new: true });
        return res.status(200).json(updated);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `failed to update role` });
    }
}


async function deleteRole(req, res) {
    try {
        const Id = req.params.Id;
        const deleted = await Role.findByIdAndDelete(Id);
        return res.status(200).json(deleted);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `failed to delete role` });
    }
}

module.exports = {
    getRoleById,
    getAllRole,
    addRole,
    updateRole,
    deleteRole
}
