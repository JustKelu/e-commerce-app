const transactionRepo = async (checkoutTotal, commissionTotal, customersTotals, cartItems, shipmentData) => {
        if (!customersTotals || customersTotals.length === 0) {
            throw new Error('No customers to update');
        }

        const debitQuery = `UPDATE users SET balance = balance - $1::NUMERIC WHERE id = $2 AND balance >= $1::NUMERIC`;
        const debitParams = [checkoutTotal, userId];
        
        const commissionQuery = `UPDATE commission_account SET balance = balance + $1::NUMERIC`;
        const commissionParams = [commissionTotal];

        let creditQuery = "UPDATE users SET balance = balance + CASE ";
        let whereClause = "WHERE id IN (";
        let creditParams = [];
        let paramIndex = 1;
        
        let notificationsQuery = "INSERT INTO notifications (seller_id, message) VALUES ";
        const notificationsParams = [];
        paramIndex = 1;

        customersTotals.forEach((seller, index) => {
            creditQuery += `WHEN id = $${paramIndex} THEN $${paramIndex + 1}::NUMERIC `;
            whereClause += `$${paramIndex}`;

            creditParams.push(seller.seller_id, seller.amount);
            paramIndex += 2;
            
            if (index < customersTotals.length - 1) {
                whereClause += ", ";
            }
        });

        creditQuery += "ELSE 0 END " + whereClause + ")";
        
        paramIndex = 1;

        const orderQuery = `
            INSERT INTO orders (user_id, total_amount, status, created_at)
            VALUES ($1, $2, 'pending', NOW())
            RETURNING id;
        `;
        const orderValues = [userId, checkoutTotal];

        let orderItemsQuery = "INSERT INTO order_items (order_id, product_id, seller_id, quantity, price, status) VALUES ";
        const orderItemsParams = [];

        const initOrderItems = (orderId) => {
            cartItems.forEach((item, i) => {
                orderItemsQuery += `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, 'pending')`;
                orderItemsParams.push(orderId, item.id, item.sellerId, item.quantity, item.price);
                paramIndex += 5;
                if (i < cartItems.length - 1) orderItemsQuery += ", ";
            });
        };

        cartItems.forEach((item, i) => {
            notificationsQuery += `($${paramIndex}, $${paramIndex + 1})`;
            notificationsParams.push(item.sellerId, `Hai venduto ${item.quantity} unità di ${item.name}.`);

            paramIndex += 2;

            if (i < cartItems.length - 1) notificationsQuery += ", ";
        });

        console.log(notificationsQuery, notificationsParams)
        
        paramIndex = 1

        let shipmentQuery;
        let shipmentParams;

        const initShipment = (orderId) => {
            shipmentQuery = `
                INSERT INTO shipments 
                (order_id, full_name, street_address, city, province, postal_code, phone_number, notes)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `;
            shipmentParams = [
                orderId,
                `${shipmentData.name} ${shipmentData.surname}`,
                `${shipmentData.address_street} ${shipmentData.address_number}`,
                shipmentData.address_city,
                shipmentData.province,
                shipmentData.address_zip,
                shipmentData.phone_number,
                shipmentData.notes,
            ];
        }

        await pool.query('BEGIN');
        try {
            const result = await pool.query(debitQuery, debitParams);
            if (result.rowCount === 0) {
                throw new Error('Insufficient funds or user not found');
            }
            
            await pool.query(creditQuery, creditParams);
            await pool.query(commissionQuery, commissionParams);

            const orderResult = await pool.query(orderQuery, orderValues);
            const orderId = orderResult.rows[0].id;

            initOrderItems(orderId);
            await pool.query(orderItemsQuery, orderItemsParams);

            initShipment(orderId);
            await pool.query(shipmentQuery, shipmentParams);

            await pool.query(notificationsQuery, notificationsParams);

            await pool.query('COMMIT');
        } catch (error) {
            await pool.query('ROLLBACK');
            throw error;
        }
    };