const readline = require('readline');

const denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05, 0.02, 0.01];

function cashMachine(amount) {
    if (amount < 0) {
        throw new Error('La cantidad no puede ser negativa');
    }

    if (amount === 0) {
        return {};
    }

    const result = {};
    let remaining = Math.round(amount * 100) / 100;

    for (const denomination of denominations) {
        const count = Math.floor(remaining / denomination);

        result[denomination] = count;

        if (count > 0) {
            remaining = Math.round((remaining - (count * denomination)) * 100) / 100;
        }

        if (remaining === 0) {
            break;
        }
    }

    return result;
}

function formatResult(result) {
    let output = '[\n';

    for (const denomination of denominations) {
        const count = result[denomination] || 0;
        output += `  ${denomination} => ${count},\n`;
    }

    output += ']';
    return output;
}


function displayResult(amount, result) {
    console.log(`Cantidad: $${amount.toFixed(2)}`);
    console.log('Denominaciones usadas:');

    for (const [denomination, count] of Object.entries(result)) {
        if (count > 0) {
            console.log(`  $${denomination} x ${count} = $${(denomination * count).toFixed(2)}`);
        }
    }

    const totalPieces = Object.values(result).reduce((sum, count) => sum + count, 0);
    console.log(`Total de billetes/monedas: ${totalPieces}`);
    console.log('Resultado:');
    console.log(formatResult(result));
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('='.repeat(50));
    console.log('MÁQUINA MONEDERA');
    console.log('='.repeat(50));
    console.log('Disponible:');
    console.log('Billetes: $500, $200, $100, $50, $20, $10, $5, $2, $1');
    console.log('Monedas: $0.50, $0.20, $0.10, $0.05, $0.02, $0.01');

    const askAmount = () => {
        rl.question('Ingrese la cantidad en dólares (o "salir" para terminar): $', (input) => {
            const trimmedInput = input.trim().toLowerCase();

            if (trimmedInput === 'salir' || trimmedInput === 'exit' || trimmedInput === 'q') {
                console.log('Gracias!');
                rl.close();
                return;
            }

            const amount = parseFloat(trimmedInput);

            if (isNaN(amount)) {
                console.log('Por favor ingrese un número válido');
                askAmount();
                return;
            }

            if (amount < 0) {
                console.log('La cantidad no puede ser negativa');
                askAmount();
                return;
            }

            if (amount === 0) {
                console.log('La cantidad es $0.00, no se requieren billetes ni monedas');
                askAmount();
                return;
            }

            try {
                const result = cashMachine(amount);
                displayResult(amount, result);
                console.log('\n' + '-'.repeat(50) + '\n');
                askAmount();
            } catch (error) {
                console.log(`Error: ${error.message}\n`);
                askAmount();
            }
        });
    };

    askAmount();
}

main();
