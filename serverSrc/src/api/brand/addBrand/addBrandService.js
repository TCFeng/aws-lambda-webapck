const addBrandService = async (client) => {
    const data = await client.query('SELECT * FROM machine_model limit 1');
    return data;
}

module.exports = addBrandService;