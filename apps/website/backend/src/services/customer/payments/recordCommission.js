module.exports = async function recordCommission(client, commission) {
    const commissionQuery = `UPDATE commission_account SET balance = balance + $1::NUMERIC`;
    const commissionParams = [commission];

    const result = await client.query(commissionQuery, commissionParams);
    return result;
};