const express=require('express');
const authController=require('../Controllers/interviewController');
const router=express.Router();


router.route('/add-candidate').post(authController.addCandidate);
router.route('/get-candidates').get(authController.getCandidates);
router.route('/delete-candidate/:id').delete(authController.deleteCandidate)


module.exports=router;