const router = require("express").Router();
const controllerRegisters = require("../controllers/regiterController");


router.get("/Allregistros", controllerRegisters.getAllRegiters);
router.get("/registros/:placa", controllerRegisters.getAllRegistersByPlaca);
router.post("/AddRegister", controllerRegisters.addRegister );
router.delete("/deleteRegister/:id", controllerRegisters.deleteRegisterById);



module.exports = router;