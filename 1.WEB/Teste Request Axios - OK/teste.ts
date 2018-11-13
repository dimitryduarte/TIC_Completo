import axios from 'axios';

axios.get('/api/candidatura/get', {
		headers: {
			'Authorization': 'aaaa'
		},
		proxy: {
			host: 'localhost',
			port: 3001
		}
	})
	.then(function (res)
	{
		console.log(res.data);
	})
	.catch(function (err)
	{
		console.log(err.message);
	});

axios.get('/api/matriculadoGrad/20000', {
		proxy: {
			host: 'dev2.unifacef.com.br',
			port: 8000
		}
	})
	.then(function (res)
	{
		console.log(res.data);
	})
	.catch(function (err)
	{
		console.log(err.message);
	});