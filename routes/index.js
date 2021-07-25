var Middleware = require('../utils/Middleware');
var Loc_wards = require('./loc_wards');
var Loc_districts = require('./loc_districts');
var Loc_provinces = require('./loc_provinces');
const path = require('path');

exports.assignAPIRoutes = function (app) {
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + '/../public/index.html'));
	});

	//#region Loc_wards route
	app.get('/wards/getAll', Loc_wards.getAll);
	app.get('/wards/getById', Loc_wards.getById);
	app.get('/wards/getByDistrict', Loc_wards.getByDistrict);
	// app.post('/loc_wards/create', Loc_wards.create);
	// app.put('/loc_wards/update', Loc_wards.update);
	// app.delete('/loc_wards/delete', Loc_wards.delete);

	//#region Loc_districts route
	app.get('/districts/getAll', Loc_districts.getAll);
	app.get('/districts/getById', Loc_districts.getById);
	app.get('/districts/getByProvince', Loc_districts.getByProvince);
	// app.post('/loc_districts/create', Loc_districts.create);
	// app.put('/loc_districts/update', Loc_districts.update);
	// app.delete('/loc_districts/delete', Loc_districts.delete);

	//#region Loc_provinces route
	app.get('/provinces/getAll', Loc_provinces.getAll);
	app.get('/provinces/getById', Loc_provinces.getById);
	// app.post('/provinces/create', Middleware.authorized, Loc_provinces.create);
	// app.put('/loc_provinces/update', Loc_provinces.update);
	// app.delete('/loc_provinces/delete', Loc_provinces.delete);
}