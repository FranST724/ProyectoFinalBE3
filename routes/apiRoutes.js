import Router from 'express';
const mainScript = 'public/index.js';

const router = Router();

router.get('*', (req, res) => {
	res.json({
		apiDefaultResponse: 'Default!',
		url: req.url
	});
});

export default router;
