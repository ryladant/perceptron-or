

<script>
inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
outputs = [0, 1, 1, 0]; // Exemplo: função XOR (mais interessante que OR)
learning_rate = 0.1;
epochs = 10000;
num_hidden = 2; // Número de neurônios na camada oculta

// Inicialização aleatória dos pesos e bias (com sinal aleatório)
function randomWeight() {
    const s = Math.random() > 0.5 ? -1 : 1;
    return Math.random().toFixed(2) * s;
}

// Pesos da camada de entrada para a camada oculta
weights_ih = Array(inputs[0].length).fill(null).map(() => Array(num_hidden).fill(null).map(randomWeight));
// Bias da camada oculta
bias_h = Array(num_hidden).fill(null).map(randomWeight);
// Pesos da camada oculta para a camada de saída
weights_ho = Array(num_hidden).fill(null).map(randomWeight);
// Bias da camada de saída
bias_o = randomWeight();

// Função sigmoide
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

// Derivada da sigmoide
function sigmoid_derivative(x) {
    return x * (1 - x);
}

// Treinamento da rede neural
for (let i = 0; i < epochs; i++) {
    for (let j = 0; j < inputs.length; j++) {
        const input = inputs[j];
        const target = outputs[j];

        // Feedforward (propagação para frente)

        // Camada oculta
        const hidden_inputs = Array(num_hidden).fill(0);
        for (let k = 0; k < num_hidden; k++) {
            for (let l = 0; l < input.length; l++) {
                hidden_inputs[k] += input[l] * weights_ih[l][k];
            }
            hidden_inputs[k] += bias_h[k];
        }
        const hidden_outputs = hidden_inputs.map(sigmoid);

        // Camada de saída
        let output_input = 0;
        for (let k = 0; k < num_hidden; k++) {
            output_input += hidden_outputs[k] * weights_ho[k];
        }
        output_input += bias_o;
        const output = sigmoid(output_input);

        // Backpropagation (propagação para trás)

        // Erro na camada de saída
        const output_error = target - output;
        const output_delta = output_error * sigmoid_derivative(output);

        // Erro na camada oculta
        const hidden_errors = Array(num_hidden).fill(0);
        for (let k = 0; k < num_hidden; k++) {
            hidden_errors[k] = output_delta * weights_ho[k];
        }
        const hidden_deltas = hidden_errors.map((err, index) => err * sigmoid_derivative(hidden_outputs[index]));

        // Atualização dos pesos e bias

        // Camada oculta
        for (let k = 0; k < num_hidden; k++) {
            for (let l = 0; l < input.length; l++) {
                weights_ih[l][k] += learning_rate * hidden_deltas[k] * input[l];
            }
            bias_h[k] += learning_rate * hidden_deltas[k];
        }

        // Camada de saída
        for (let k = 0; k < num_hidden; k++) {
            weights_ho[k] += learning_rate * output_delta * hidden_outputs[k];
        }
        bias_o += learning_rate * output_delta;
    }
}

function predict_nn(x1, x2) {
    // Feedforward

    // Camada oculta
    const hidden_inputs = Array(num_hidden).fill(0);
    for (let k = 0; k < num_hidden; k++) {
        hidden_inputs[k] = x1 * weights_ih[0][k] + x2 * weights_ih[1][k] + bias_h[k];
    }
    const hidden_outputs = hidden_inputs.map(sigmoid);

    // Camada de saída
    let output_input = 0;
    for (let k = 0; k < num_hidden; k++) {
        output_input += hidden_outputs[k] * weights_ho[k];
    }
    output_input += bias_o;
    const output = sigmoid(output_input);

    return output >= 0.5 ? 1 : 0;
}

prev_xor = predict_nn(0, 1);
alert(prev_xor);
prev_xor_2 = predict_nn(1, 1);
alert(prev_xor_2);
</script>
