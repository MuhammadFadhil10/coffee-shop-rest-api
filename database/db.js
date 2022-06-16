import mysql2 from 'mysql2';

export default mysql2
	.createPool({
		user: 'root',
		password: 'Fadhil1010',
		database: `rent_shop`,
		host: `localhost`,
	})
	.promise();
