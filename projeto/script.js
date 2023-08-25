let alunos = [];
const disciplinas = ["Matemática", "Português", "Física", "Biologia", "Química", "Programação"];
var aprovados = [];
var reprovados = [];
var recuperados = [];

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

	mostrarBtn();
}

// Adiciona o aluno se eu pressionar "Enter"
document.getElementById("nomeAluno").addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		adicionarAluno();
	}
});

// Mostrar o botão para ver a lista de alunos
const mostrarBtn = () => (document.getElementById("btnVerAlunos").style.display = "block");

// Esconder o botão para ver a lista de alunos
const esconderBtn = () => (document.getElementById("btnVerAlunos").style.display = "none");

// Remover aluno
function removerAluno(nome) {
	const index = alunos.indexOf(nome);
	if (index !== -1) {
		alunos.splice(index, 1);
		console.log(`Removendo aluno: ${nome}`);
		renderizarAlunos();
	}

	if (alunos.length == 0) {
		esconderBtn();
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
	<div class="aluno-container" id="aluno-${alunos.indexOf(nome)}">
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
	let disciplinasHtml = "";

	for (let i = 0; i < disciplinas.length; i++) {
		disciplinasHtml += criarNotaDisciplina(disciplinas[i]);
	}

	return disciplinasHtml;
}

// Definir classe de cada disciplina
function definirClasse(disciplina) {
	let classe = "";

	switch (disciplina) {
		case "Matemática":
			classe = "matematica";
			break;
		case "Português":
			classe = "portugues";
			break;
		case "Física":
			classe = "fisica";
			break;
		case "Biologia":
			classe = "biologia";
			break;
		case "Química":
			classe = "quimica";
			break;
		default:
			classe = "programacao";
			break;
	}

	return classe;
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
    	        	<input type="number" class="i2" placeholder="Nota" oninput="validarNota(this, ${i}); atualizarMedia('${disciplina}'; ${alunos.indexOf(
				nome
			)})">
				</div>
        	</li>`;
		} else {
			notasBimestreHtml += `
            <li>
				<div class="notas">
            		<div class="bimestre">${i}° Bimestre (${i * 10}pt):</div>
    	        	<input type="number" class="i2" placeholder="Nota" oninput="validarNota(this, ${i}); atualizarMedia('${disciplina}'; ${alunos.indexOf(
				nome
			)})">
				</div>
        	</li>`;
		}
	}

	return `
    	<div class="disciplina ${definirClasse(disciplina)}">
       		<h4>${disciplina}</h4>
        	<ul>${notasBimestreHtml}</ul>
        	<div class="media">${criarMediaDisciplina(disciplina, alunos.indexOf(nome))}</div>
        	<div class="status">${criarStatusDisciplina(disciplina, alunos.indexOf(nome))}</div>
    	</div>`;
}

// Cria a média de cada disciplina
function criarMediaDisciplina(disciplina, alunoIndex) {
	return `
	<span>Total: </span>
	<input type="number" class="i2" id="${alunoIndex}-${disciplina}-media" disabled>`;
}

// Cria o status do aluno em cada disciplina
function criarMediaDisciplina(disciplina, alunoIndex) {
	return `
	<span>Total: </span>
	<input type="number" class="i2" id="${alunoIndex}-${disciplina}-media" disabled>`;
}

// Validar as notas de acordo com cada bimestre, para limitar o input
function validarNota(input, bimestre) {
	const maxValue = bimestre * 10;

	if (input.value > maxValue) {
		input.value = maxValue;
	} else if (input.value < 0) {
		input.value = 0;
	}
}

// Atualizar a média da disciplina especificada
function atualizarMedia(disciplina, alunoIndex) {
	let inputsNotas = document.querySelectorAll(`.${definirClasse(disciplina)} .notas input.i2`);
	let total = 0;

	inputsNotas.forEach((input) => {
		let valor = parseFloat(input.value);
		if (!isNaN(valor)) {
			total += valor;
		}
	});

	let mediaInput = document.getElementById(`${alunoIndex}-${disciplina}-media`);
	mediaInput.value = total.toFixed(2);

	// Atualizar o status do aluno para essa disciplina
	atualizarStatus(disciplina, total, alunoIndex);
}

// Atualizar o status da disciplina especificada com base na média fornecida
function atualizarStatus(disciplina, media, alunoIndex) {
	let statusInput = document.getElementById(`${alunoIndex}-${disciplina}-status`);

	if (media >= 60) {
		statusInput.value = "Aprovado";
		statusInput.style.boxShadow = "0px 0px 15px 0px var(--verde)";
	} else if (media >= 40 && media < 60) {
		statusInput.value = "Recuperação";
		statusInput.style.boxShadow = "0px 0px 15px 0px var(--amarelo)";
	} else {
		statusInput.value = "Reprovado";
		statusInput.style.boxShadow = "0px 0px 15px 0px var(--vermelho)";
	}
}

const abrir = () => {
	document.getElementById("popup").style.display = "block";
};
const fechar = () => {
	document.getElementById("popup").style.display = "none";
};
