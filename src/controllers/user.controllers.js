const catchError = require('../utils/catchError');
const User = require('../models/User');

// Get all users.
const getAll = catchError(async(req, res) => {
    const result = await User.findAll(req.body)
    return res.status(200).json(result)
});

// Create a new user in our database.
const create = catchError(async(req,res) => {
    const result = await User.create(req.body)
    return res.status(201).json(result)
})

// Get some user for its id property.
const getOne = catchError(async(req,res) => {
    const { id } = req.params
    const result = await User.findByPk(id)
    
    if(!result) return res.sendStatus(404)
    
    return res.json(result)
})

// Delete some user for its id property.
const destroy = catchError(async(req,res) => {
    const { id } = req.params
    const result = await User.destroy({where:{id}})

    if(!result) return res.sendStatus(404)
    
    return res.sendStatus(204)
})

// Update some information from users.
const update = catchError(async(req,res) => {
    const { id } = req.params
    const user = await User.update(
        req.body,
        {
            where: {id},
            returning: true,
        }
    )
    if(user[0] === 0) return res.sendStatus(404)
    return res.status(200).json(user[1][0])
})



module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}