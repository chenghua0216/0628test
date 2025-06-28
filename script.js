function drawQuadratic(a, b, c) {
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    for (let x = -canvas.width / 2; x <= canvas.width / 2; x += 1) {
        const scaledX = x / 20; // scaling factor
        const y = a * scaledX * scaledX + b * scaledX + c;
        const canvasX = x + canvas.width / 2;
        const canvasY = canvas.height / 2 - y * 20; // same scaling
        if (x === -canvas.width / 2) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    ctx.stroke();
}

function updateInfo(a, b, c) {
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;
    const axis = vertexX;
    const discriminant = b*b - 4*a*c;
    let rootsText;
    if (discriminant < 0) {
        rootsText = '無實數解';
    } else {
        const root1 = (-b + Math.sqrt(discriminant)) / (2*a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2*a);
        rootsText = `x1=${root1.toFixed(2)}, x2=${root2.toFixed(2)}`;
    }
    document.getElementById('info').innerHTML =
        `頂點: (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})<br>` +
        `對稱軸: x = ${axis.toFixed(2)}<br>` +
        `判別式: ${discriminant.toFixed(2)}<br>` +
        `解: ${rootsText}`;
}

function plot() {
    const a = parseFloat(document.getElementById('coefA').value);
    const b = parseFloat(document.getElementById('coefB').value);
    const c = parseFloat(document.getElementById('coefC').value);
    drawQuadratic(a, b, c);
    updateInfo(a, b, c);
}

document.getElementById('plotBtn').addEventListener('click', plot);

window.onload = plot;
