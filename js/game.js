"use strict";

// Shader code

const vertexShaderSource = `
attribute vec4 a_position;
uniform mat3 u_worldMatrix;
void main() {
 // convert to homogeneous coordinates
 vec3 p = vec3(a_position.xy, 1);
 // multiply by world martix
 p = u_worldMatrix * p;
// output to gl_Position
 gl_Position = vec4(p.xy, 0, 1);
}
`;

const fragmentShaderSource = `
precision mediump float;

void main() {
  gl_FragColor = vec4(1,0,0,1); 
}
`;

function createShader(gl, type, source) {
    check(isContext(gl), isString(source));

    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    check(isContext(gl), isShader(vertexShader, fragmentShader));

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

 function resize(canvas) {
    check(isCanvas(canvas));

    const resolution = window.devicePixelRatio || 1.0;

    const displayWidth = 
        Math.floor(canvas.clientWidth * resolution);
    const displayHeight = 
        Math.floor(canvas.clientHeight * resolution);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        return true;
    }
    else {
        return false;
    }    
}

function main() {

    // === Initialisation ===

    // get the canvas element & gl rendering 
    const canvas = document.getElementById("c");
    const gl = canvas.getContext("webgl");

    if (gl === null) {
        window.alert("WebGL not supported!");
        return;
    }
    
    // create GLSL shaders, upload the GLSL source, compile the shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program =  createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);


    // Initialise the shader attributes & uniforms
    const positionAttribute = gl.getAttribLocation(program, "a_position");
    let worldMatrixUniform = gl.getUniformLocation(program, "u_worldMatrix");

    // Initialise the array buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionAttribute);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
    
    // === Per Frame operations ===

    // update objects in the scene
    let update = function(deltaTime) {
        check(isNumber(deltaTime));

        // update things
    };

    // redraw the scene
    let render = function() {
        // clear the screen
        gl.viewport(0, 0, canvas.width, canvas.height);        
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // set the uniforms
		let matrix = Matrix.identity();
		matrix = Matrix.multiply(matrix, Matrix.translation(-0.5,0));
		matrix = Matrix.multiply(matrix, Matrix.rotation(45 * Math.PI / 180));
		matrix = Matrix.multiply(matrix, Matrix.scale(0.5, 0.5));

		gl.uniformMatrix3fv(worldMatrixUniform, false, matrix);

        // draw the shape
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0,1,0,0,1]), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 3);   
    };

    // animation loop
    let oldTime = 0;
    let animate = function(time) {
        check(isNumber(time));
        
        time = time / 1000;
        let deltaTime = time - oldTime;
        oldTime = time;

        resize(canvas);
        update(deltaTime);
        render();

        requestAnimationFrame(animate);
    }

    // start it going
    animate(0);
}    

