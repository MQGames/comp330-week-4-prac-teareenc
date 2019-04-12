class Snake {
	// initialisation
	constructor() {
		this.position = [0,0];
		this.rotation = 0;
		this.speed = 1;
		
		this.length = 0;
		this.maxLength = 5;
		this.segmentLength = [];
		this.body = [0,0];
	}
	// update the snake on each frame
	update(deltaTime) {
		check(isNumber(deltaTime));
		
		// rotate the head
		
		if (Input.leftPressed) {
			this.rotation = Math.PI;
		}
		else if (Input.rightPressed) {
			this.rotation = 0;
		}
		else if (Input.upPressed) {
			this.rotation = Math.PI/2;
		}
		else if (Input.downPressed) {
			this.rotation = 3*Math.PI/2;
		}
		
		//move in the current direction
		this.position[0] += Math.cos(this.rotation) * this.speed * deltaTime;
		this.position[0] += Math.sin(this.rotation) * this.speed * deltaTime;
	}
	// draw the snake
	render(gl, worldMatrixUniform, colorUniform) {
		check(isContext(gl), isUniformLocation(worldMatrixUniform, colorUniform));
		// set the uniforms
		let matrix = Matrix.trs(this.position[0], this.position[1],	this.rotation, 1, 1);
		gl.uniformMatrix3fv(worldMatrixUniform, false, matrix);
		
		//set colour
		gl.uniform4fv(colourUniform, [0,0.75,0,1]);
		
		// draw the head
		const head = new Float32Array([0,-0.5, 0,0.5, 1,0]);
		gl.bufferData(gl.ARRAY_BUFFER, head, gl.STATIC_DRAW);
		
		gl.drawArrays(gl.TRIANGLES, 0, head.length / 2); 
	}
}