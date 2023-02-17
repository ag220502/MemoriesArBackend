const queries = require("../../../crudOperations/Users/Profile/ProfilePage.js")

const getUserProfileData = async (req, res) => {
    const id  = req.body.id;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    try{
        const result = await queries.getProfileData(id)
        if(result)
        {
            return res.status(200).json(result)
        }
    }
    catch(err){
        return res.status(400).json(err)
    }

}

const getPersonalData = async (req, res) => {
    const id  = req.body.id;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    try{
        const result = await queries.getPersonalData(id)
        if(result)
        {
            return res.status(200).json(result)
        }
    }
    catch(err){
        return res.status(400).json(err)
    }

}

const updateProfileData = async (req, res) => {
    const id  = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const bio = req.body.bio;
    const profilePhoto = req.body.profilePhoto;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    if (!firstName || !lastName || !bio || !profilePhoto) {
        return res.status(400).json({ error: ' firstName or lastName or bio or profilePhoto is not provided' });
    }
    try{
        const result = await queries.updateProfileData(id,firstName,lastName,bio,profilePhoto)
        if(result)
        {
            return res.status(200).json('Profile Updated')
        }
    }
    catch(err){
        return res.status(400).json(err)
    }

}

const updatePersonalData = async (req, res) => {
    const id  = req.body.id;
    const dob = req.body.dob;
    const countryCode = req.body.countryCode;
    const mobile = req.body.mobile;
    const gender = req.body.gender;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    if (!dob || !countryCode || !mobile || !gender || !address || !city || !state || !country) {
        return res.status(400).json({error: 'all fields are required'});
    }
    try{
        const result = await queries.updatePersonalData(id, gender, mobile, dob, countryCode, address, city, state, country)
        if(result)
        {
            return res.status(200).json('Personal Data Updated')
        }
    }
    catch(err){
        return res.status(400).json(err)
    }

}


const deactivateAccount = async (req, res) => {
    const id  = req.body.id;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    try{
        const result = await queries.deactivateAccount(id)
        if(result.affectedRows)
        {
            return res.status(200).json('Account Deactivated')
        }
    }
    catch(err){
        return res.status(400).json(err)
    }

}

const activateAccount = async (req, res) => {
    const id  = req.body.id;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    try{
        const result = await queries.activateAccount(id)
        if(result.affectedRows)
        {
            return res.status(200).json('Account Activated')
        }
    }
    catch(err){
        return res.status(400).json(err)
    }

}

const deleteAccount = async (req, res) => {
    const id  = req.body.id;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    try{
        const result = await queries.deleteAccount(id)
        if(result.affectedRows)
        {
            return res.status(200).json('Account Deleted')
        }
    }
    catch(err){
        return res.status(400).json(err)
    }

}

module.exports = {getUserProfileData, getPersonalData, updateProfileData, updatePersonalData, deactivateAccount, activateAccount, deleteAccount};