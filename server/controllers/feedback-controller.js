const Feedback = require("../models/feedback-model")


//O CREATE FEEDBACK 
const feedbackController = async(req, res) =>{
    try {
        const response = req.body;
        await Feedback.create(response);
        return res.status(200).json({success: true, message: "Feedback sent successfully!!!"});
    } catch (error) {
        return res.status(500).json({ message: "Feedback failed to send!!!"});
        // return res.status(500).json(extraDetails);

        // next(error);
    }

};

//O GET FEEDBACK
const getFeedbackController = async(req, res)=>{
    try {
        const feedback = await Feedback.find({});
        if(!feedback){
            return res.status(400).send({
                success: false,
                message: "Unable to fetch feedbacks!"
            });
            
        }
        res.status(200).send({
            success: true,
            message : "feedback fetched!",
            feedback,
        })
        
        }catch(error) {
            console.log(error);
            
        }
    }

module.exports = {feedbackController, getFeedbackController}