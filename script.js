let alunos = [];

// Adicionar aluno
function adicionarAluno() {
	const nomeInput = document.getElementById("nomeAluno");
	const nome = nomeInput.value.trim();

	if (nome && !alunos.includes(nome)) {
		alunos.push(nome);
		console.log(`Adicionando ${nome}...`);
		nomeInput.value = "";
		renderizarAlunos();
	}
}

// Adiciona o aluno se eu pressionar "Enter"
document.getElementById("nomeAluno").addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		adicionarAluno();
	}
});

// Remover aluno
function removerAluno(nome) {
	const index = alunos.indexOf(nome);
	if (index !== -1) {
		alunos.splice(index, 1);
		console.log(`Removendo aluno: ${nome}`);
		renderizarAlunos();
	}
}

// Renderiza todos alunos cadastrados na página
function renderizarAlunos() {
	const container = document.getElementById("info-alunos");
	let htmlContent = "";

	for (let i = 0; i < alunos.length; i++) {
		htmlContent += criarContainerAluno(alunos[i]);
	}

	container.innerHTML = htmlContent;
	console.log(`Total de alunos: ${alunos.length}`);
}

// Cria um container com as informações do aluno
function criarContainerAluno(nome) {
	return `
	<div class="aluno-container">
		<div class="aluno-nome">
			<h3>${nome}</h3>
			<button class="remover" onclick="removerAluno('${nome}')">Remover</button>
		</div>

		<div class="aluno-notas">
			${criarListaNotas()}
		</div>
	</div>`;
}

// Cria a lista de notas para todas disciplina
function criarListaNotas() {
	const disciplinas = ["Matemática", "Português", "Física", "Biologia", "Química"];
	let disciplinasHtml = "";

	for (let i = 0; i < disciplinas.length; i++) {
		disciplinasHtml += criarNotaDisciplina(disciplinas[i]);
	}

	return disciplinasHtml;
}

// Cria as notas de cada bimestre por disciplina
function criarNotaDisciplina(disciplina) {
	let notasBimestreHtml = "";

	for (let i = 1; i <= 4; i++) {
		if (i == 1) {
			notasBimestreHtml += `
            <li>
				<div class="notas">
            		<div class="bimestre">${i}°&nbsp;&nbsp;Bimestre (${i * 10}pt):</div>
    	        	<input type="number" class="i2" placeholder="Nota" oninput="validarNota(this, ${i}); atualizarMedia('${disciplina}')">
				</div>
        	</li>`;
		} else {
			notasBimestreHtml += `
            <li>
				<div class="notas">
            		<div class="bimestre">${i}° Bimestre (${i * 10}pt):</div>
    	        	<input type="number" class="i2" placeholder="Nota" oninput="validarNota(this, ${i}); atualizarMedia('${disciplina}')">
				</div>
        	</li>`;
		}
	}

	return `
        <div class="disciplina">
            <h4>${disciplina}</h4>
            <ul>${notasBimestreHtml}</ul>
			<div class="media">
				<span>Média: </span>
				<input type="number" class="i2" id="${disciplina}-media" disabled>
			</div>
			<div class="status">
				<span>Status: </span>
				<input type="text" class="i2" id="${disciplina}-status" disabled>
			</div>
        </div>`;
}

// Validar as notas de acordo com cada bimestre, para limitar o input
function validarNota(input, bimestre) {
	let maxNota = bimestre * 10;

	if (input.value < 0) input.value = 0;
	if (input.value > maxNota) input.value = maxNota;
}
