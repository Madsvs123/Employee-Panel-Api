import Jop from '../models/Jop.js'



export const getAllJops = async (req, res) => {
    try {
        const jops = await Jop.find();
        res.json(jops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getJop = async (req, res) => {
    try {
        const {id} = req.params
        const job = await Jop.findById(id);
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const addJop = async (req, res) => {
    try {
        const {code, title, description, salary} = req.body;
        const jopExist = await Jop.findOne({code})
        if(jopExist) {
            return res.status(400).json({message : 'Jop already exists'})
        }
        
        const jop = new Jop({
            code,
            title,
            description,
            salary
        }) 
        
        await jop.save()
        
        res.status(200).json({user: 'Added new Jop successfully'})
        
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
};




export const editJop = async(req, res) => {

    try {
        const { id } = req.params
        const {code, title, description, salary} = req.body

        const updateJop = await Jop.findByIdAndUpdate(id, {
            code,
            title,
            description,
            salary
        }, {new : true})
        
        updateJop.save()

        res.status(200).json({message : 'Jop Updated Successfully'})

    } catch (err) {
        res.status(500).json({error : err.message})
    }

}


export const deleteJop = async (req, res) => {
    try {

        await Jop.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Jop deleted' });
        
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};