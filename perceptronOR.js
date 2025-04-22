inputs = [[0,0], [0,1], [1,0], [1,1]]
outputs = [0,1,1,1]
learning_rate = 0.1
epochs = 10000


s1 = Math.random() > 0.5 ? -1 : 1 // aleatoriedade do sinal
s2 = Math.random() > 0.5 ? -1 : 1
s3 = Math.random() > 0.5 ? -1 : 1

w1 = Math.random().toFixed(2) * s1
w2 = Math.random().toFixed(2) * s2
bias = Math.random().toFixed(2) * s3

for(let i=0; i < epochs; i++){
	for(let j=0; j < inputs.length; j++){
	x = (inputs[j][0] * w1 + inputs[j][1] * w2) + bias
	
	sigmoid = 1 / (1 + Math.exp(-x))
	
	w1 = w1 + (0.1 * (outputs[j] - sigmoid) * inputs[j][0])
	w2 = w2 + (0.1 * (outputs[j] - sigmoid) * inputs[j][1])
	
	bias = bias + (0.1 * (outputs[j] - sigmoid))
    }
}

function predict(a, b, c, x1, x2){
    net = (x1 * w1) + (x2 * w2) + bias
    output = 1 / (1 + Math.exp(-net))
    alert(output)
    if(output >= 0.5) return 1
    return 0
}

prev = predict(w1, w1, bias, 0, 1)
alert(prev)
