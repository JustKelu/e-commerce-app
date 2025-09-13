const form = document.getElementById('keygen-form');
const selectInput = document.getElementById('card-format');
const giftTable = document.getElementById('giftTable');

let giftCards = [];

function formatString(str) {
    return str.replace(/(\w{4})(?=\w)/g, '$1-');
}

const renderTable = () => {
    giftTable.innerHTML = "";
    giftCards.forEach(gc => {
        const row = document.createElement("tr");
        const statusClass = gc.used ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
        const statusText = gc.used ? "Usata" : "Valida";
        
        row.innerHTML = `
            <td class="border px-4 py-2 font-mono text-sm">${formatString(gc.code)}</td>
            <td class="border px-4 py-2">€${gc.value}</td>
            <td class="border px-4 py-2">
                <span class="px-2 py-1 rounded-full text-xs font-semibold ${statusClass}">
                    ${statusText}
                </span>
            </td>
            <td class="border px-4 py-2">${gc.created_at ? gc.created_at.split('T')[0] : new Date().toISOString().split('T')[0]}</td>
        `;
        giftTable.appendChild(row);
    });
};

const loadAllGiftCards = async () => {
    try {
        const response = await fetch(('http://localhost:5001/get-all-keys'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            giftCards = result.giftCards || [];
            renderTable();
        } else {
            console.error('Errore nel caricamento delle gift card');
        }
    } catch (error) {
        console.error('Errore:', error);
    }
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const value = selectInput.value;
    
    if (!value) {
        alert('Seleziona un valore per la gift card');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5001/generate-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: value
            })
        });
        
        if (!response.ok) {
            throw new Error('Errore nella generazione della gift card');
        }
        
        const result = await response.json();
        
        giftCards.unshift(result.key);

        renderTable();
        
        selectInput.value = '';
        
    } catch (error) {
        console.error('Errore:', error);
        alert('Errore nella generazione della gift card');
    }
};

form.addEventListener('submit', handleSubmit);

window.addEventListener('load', loadAllGiftCards);