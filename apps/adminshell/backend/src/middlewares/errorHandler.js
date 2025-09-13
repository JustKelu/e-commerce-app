const errorHandler = (err, req, res, next) => {
    console.log('--------------------------------');
    console.log('Error:', err);
    console.log('Message:', err.message);
    console.log('--------------------------------');
    
    // Invia risposta di errore
    res.status(400).json({
        success: false,
        message: err.message || 'Errore interno del server'
    });
}

module.exports = errorHandler;