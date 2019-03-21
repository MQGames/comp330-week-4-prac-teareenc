class Snake {
	// initialisation
	constructor() {
		this.position = [0,0];
		this.rotation = 0;
	}
	// update the snake on each frame
	update(deltaTime) {
		check(isNumber(deltaTime));
	}
	// draw the snake
	render(gl, worldMatrixUniform) {
		check(isContext(gl), isUniformLocation(worldMatrixUniform));
		// set the uniforms
		let matrix = Matrix.trs(this.position[0], this.position[1],	this.rotation, 1, 1);
		gl.uniformMatrix3fv(worldMatrixUniform, false, matrix);
		
		// draw the head
		const head = new Float32Array([0,-0.5, 0,0.5, 1,0]);
		gl.bufferData(gl.ARRAY_BUFFER, head, gl.STATIC_DRAW);
		gl.drawArrays(gl.TRIANGLES, 0, head.length / 2); 
	}
}