const router = require('express').Router();
const template = require('../../controllers/Scrapbooks/TemplateController.js');
const category = require('../../controllers/Scrapbooks/categoryController.js');

//template routes
router.post('/createTemplate', template.createTemplate);
router.get('/getTemplateById/:templateId', template.getTemplateById);
router.get('/getAllTemplates', template.getAllTemplates);
router.patch('/updateTemplate/:templateId', template.updateTemplate);
router.delete('/deleteTemplate/:templateId', template.deleteTemplate);

//category routes
router.post('/createCategory', category.createCategory);
router.get('/getCategory/:categoryId', category.getCategory);
router.get('/getAllCategories', category.getAllCategories);
router.patch('/updateCategory/:categoryId', category.updateCategory);
router.delete('/deleteCategory/:categoryId', category.deleteCategory);

module.exports = router;