import { TargetAudience, AgeRange, ActivitySkill, ActivityLevel } from './types';

export interface ActivityGeneratorInput {
  targetAudience: TargetAudience;
  ageRange: AgeRange;
  skill: ActivitySkill;
  theme: string;
  level: ActivityLevel;
  availableTime: string;
  specialNeedsNotes?: string;
}

export interface ActivityAdaptationInput {
  originalActivityDescription: string;
  adaptationGoal: 'mais_simples' | 'mais_visual' | 'menos_estimulos' | 'atencao' | 'comunicacao_csa' | 'coordenacao';
  studentProfile?: string;
}

export interface LessonPlanInput {
  theme: string;
  ageRange: AgeRange;
  duration: string;
  objective: string;
  skill: ActivitySkill;
  targetAudience: TargetAudience;
}

export interface QuickIdeasInput {
  situation: string; // Ex: "Tenho 30 minutos com uma criança autista nível 1 de 6 anos e quero trabalhar atenção e pareamento"
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

// Service class designed with clean separation so real Genkit / Gemini API can be plugged in seamlessly
export const AIService = {
  /**
   * Ferramenta 1: Gerador de Atividades Pedagógicas
   */
  async generateActivity(input: ActivityGeneratorInput): Promise<string> {
    // Simulate natural AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1400));

    return `
### 🎯 Atividade: Exploradores do Conhecimento - ${input.theme}

**Público-alvo:** ${input.targetAudience} | **Faixa Etária:** ${input.ageRange} | **Nível:** ${input.level}  
**Habilidade Central:** ${input.skill} | **Tempo Estimado:** ${input.availableTime}

---

#### 📌 1. Objetivo Pedagógico (Alinhado à BNCC & AEE)
Desenvolver a competência de **${input.skill.toLowerCase()}** de forma lúdica e multissensorial com o tema *"${input.theme}"*, promovendo autonomia, autorregulação e engajamento funcional adaptado às necessidades de **${input.targetAudience.toLowerCase()}**.

---

#### ✂️ 2. Materiais Necessários
* Prancha ilustrada temática (*${input.theme}*) com alto contraste visual
* Fichas plastificadas com velcro (para facilidade de preensão motora)
* Marcadores coloridos ou prendedores de roupa de madeira coloridos
* Caixa sensorial ou bandeja de apoio com texturas calmantes (opcional para regulação)
* Fichas de apoio com pictogramas de rotina (Início ➔ Atividade ➔ Conclusão)

---

#### 📋 3. Desenvolvimento Passo a Passo
1. **Acolhimento e Antecipação (3 min):** Apresente à criança o cartão visual com a sequência da atividade para reduzir a ansiedade de transição. Explique de forma clara e pausada: *"Hoje vamos brincar de encontrar e organizar os elementos do ${input.theme}!"*
2. **Mediação Concreta (10 a 15 min):** Coloque a prancha sobre a mesa com poucos estímulos concorrentes. Apresente um estímulo por vez. Convide a criança a manipular e realizar o pareamento/associação da habilidade de ${input.skill}.
3. **Reforço Positivo Imediato (3 min):** Utilize elogios específicos voltados ao processo (*"Você teve muito foco ao encaixar esta peça!"*) e incentive a comemoração com um gesto afetivo ou carimbo divertido.
4. **Fechamento e Registro (5 min):** Finalize permitindo que a criança guarde as peças na caixa organizada, trabalhando senso de ordem e previsibilidade.

---

#### 🧩 4. Adaptações Inclusivas para AEE e Autismo
* **Para hipersensibilidade sensorial:** Evite cores fluorescentes e ruídos ambientais durante a execução. Forneça fone abafador se necessário.
* **Para dificuldades motoras finas:** Engrosse os marcadores com fita crepe ou utilize fichas em EVA mais espesso de fácil encaixe.
* **Para comunicação alternativa (CSA):** Disponibilize prancha com símbolos de *"Quero ajuda"*, *"Mais uma vez"* e *"Terminei"*.
* **Para manter o foco:** Divida a tarefa em etapas menores de 3 a 5 minutos com pausas de respiração ou movimento corporal leve.

---

💡 **Dica da Mediadora:** Deixe o cronômetro visual (timer) visível se o aluno se beneficiar de previsibilidade temporal!
    `.trim();
  },

  /**
   * Ferramenta 2: Adaptador de Atividades para Inclusão
   */
  async adaptActivity(input: ActivityAdaptationInput): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1300));

    const goalTitles: Record<string, string> = {
      mais_simples: 'Redução de Complexidade & Passos Curtos',
      mais_visual: 'Apoio Visual Robusto & Pictogramas',
      menos_estimulos: 'Sensory-Friendly (Menos Distratores Visuais/Motores)',
      atencao: 'Foco Direcionado & Antecipação Estruturada',
      comunicacao_csa: 'Integração de Comunicação Alternativa (PECS/Prancha)',
      coordenacao: 'Adaptação de Motricidade & Acessibilidade Física',
    };

    return `
### ♻️ Versão Adaptada: ${goalTitles[input.adaptationGoal] || 'Inclusão AEE'}

**Foco da Adaptação Solicitada:** ${goalTitles[input.adaptationGoal]}  
${input.studentProfile ? `**Perfil do Aluno:** ${input.studentProfile}\n` : ''}
---

#### 🔍 O que modificamos na atividade original?
Identificamos que o formato convencional continha muitas informações simultâneas que poderiam sobrecarregar a memória de trabalho do aluno. A proposta agora foca no princípio do **Design Universal para a Aprendizagem (DUA)**.

---

#### ✨ A Atividade Adaptada na Prática
1. **Instrução Direta e Visual:** Substitua textos longos por 1 comando por vez acompanhado de imagem de apoio.
2. **Segmentação em 3 Etapas:**
   - *Fase 1 (Exploração livre):* 2 minutos para manuseio do material.
   - *Fase 2 (Ação dirigida):* 1 estímulo focalizado (ex: parear apenas 3 elementos em vez de 10).
   - *Fase 3 (Conclusão):* Checagem visual com sinal verde ou carimbo de vitória.
3. **Ajuste Espacial:** Aumente o espaçamento entre as figuras e contorne a área de colagem/escrita com linha preta reforçada ou cola colorida em relevo.

---

#### 🌟 Estratégia de Mediação Sugerida
* Use a técnica de **Modelagem (Fazer Junto):** Mostre primeiro você fazendo a primeira peça, depois apoie a mão da criança levemente (ajuda física leve) e retire o apoio gradativamente (esvanecimento de pista).
* Se o aluno demonstrar desinteresse ou agitação, ofereça um objeto de conforto sensorial antes de retomar.
    `.trim();
  },

  /**
   * Ferramenta 3: Plano de Aula Inclusivo
   */
  async generateLessonPlan(input: LessonPlanInput): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return `
### 📚 Plano de Aula Inclusivo: "${input.theme}"

* **Público:** ${input.targetAudience}
* **Faixa Etária:** ${input.ageRange}
* **Duração Total:** ${input.duration}
* **Habilidade BNCC Central:** ${input.skill}

---

#### 🎯 1. Objetivos de Aprendizagem
* **Geral:** Proporcionar experiências significativas relacionadas a **${input.theme}**, respeitando os diferentes ritmos e estilos de aprendizagem.
* **Específico 1:** Estimular ${input.skill.toLowerCase()} por meio de exploração prática e lúdica.
* **Específico 2:** Promover a interação social, a partilha de materiais e a autorregulação no ambiente de sala de aula regular e sala de recursos multifuncionais (SRM).

---

#### ⏱️ 2. Estrutura Temporal da Aula
* **Momento 1 — Acolhimento e Antecipação Visual (15% do tempo):** 
  - Roda de conversa estruturada com apoio de cartazes visuais. Apresentação da rotina do dia.
* **Momento 2 — Vivência Concreta e Multissensorial (50% do tempo):** 
  - Dinâmica com materiais manipulativos sobre ${input.theme}. Alunos realizam atividades em duplas ou com apoio de mediadores.
* **Momento 3 — Consolidação e Registro Gráfico Adaptado (25% do tempo):** 
  - Ficha de atividade impressa do *Gêniozinho em Ação* com nível de suporte escalonado (fácil, com contorno ou simplificado).
* **Momento 4 — Avaliação Compartilhada e Relaxamento (10% do tempo):** 
  - Momento de guardar materiais e respiração guiada com a "flor e a vela".

---

#### 🛡️ 3. Recursos de Acessibilidade Pedagógica (AEE)
* Painel de rotina visual afixado no quadro com prendedores.
* Tesouras adaptadas (com mola) e engrossadores anatômicos de lápis.
* Cartão de "Preciso de uma pausa" disponível para os alunos utilizarem espontaneamente.

---

#### 📝 4. Avaliação Processual
Avaliar não pelo produto final perfeito, mas pela evolução do engajamento, curiosidade, capacidade de atenção compartilhada e interação com o mediador e colegas.
    `.trim();
  },

  /**
   * Ferramenta 4: "Estou sem ideias" - Faísca Pedagógica Instantânea
   */
  async generateQuickIdeas(input: QuickIdeasInput): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1100));

    return `
### 💡 3 Ideias Rápidas e Práticas para sua Aula!

**Situação descrita:** *"${input.situation}"*

---

#### 🌟 Ideia 1: "O Desafio dos Guardiões das Cores"
* **Tempo:** 15 a 20 min | **Preparo:** 2 min (materiais que você já tem na sala).
* **Como fazer:** Espalhe 4 potinhos coloridos e objetos da sala (peças de montar, tampinhas ou blocos). A criança deve "resgatar" os itens com um pegador de macarrão ou colher e organizar nos potes certos.
* **Por que funciona:** Combina motricidade fina, foco visual, regulação motora e causa sensação imediata de conquista.

---

#### 🧩 Ideia 2: "Trilha Tátil com Pareamento de Cartas"
* **Tempo:** 20 min | **Preparo:** Imprima uma ficha rápida do Gêniozinho em Ação.
* **Como fazer:** Coloque fita crepe no chão fazendo um caminho simples. Em cada ponto da trilha, coloque uma carta para a criança pegar, caminhar sobre a linha mantendo o equilíbrio e colar no painel final.
* **Por que funciona:** Envolve o corpo inteiro, ajuda crianças com perfil cinestésico e mantém o foco direcionado na meta final da trilha.

---

#### 🎨 Ideia 3: "Detetive dos Detalhes"
* **Tempo:** 10 a 15 min | **Preparo:** 1 prancha temática com lupa de papelão.
* **Como fazer:** Diga uma pista divertida (*"Procure algo que tenha 3 pontas e seja amarelo!"*). A criança utiliza a lupa para isolar visualmente a figura e colocá-la na cestinha.
* **Por que funciona:** A lupa atua como um delimitador de campo visual, reduzindo distratores externos e aumentando o tempo de permanência na atividade em até 70%.
    `.trim();
  },

  /**
   * Ferramenta 5: Chat com a Assistente da Professora
   */
  async chatWithPedagogicalAssistant(history: ChatMessage[], newMessage: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const lower = newMessage.toLowerCase();

    if (lower.includes('autis') || lower.includes('tea') || lower.includes('crise') || lower.includes('desregula')) {
      return `Olá, professora! 💙 Entendo perfeitamente esse desafio na sua rotina.

Quando lidamos com situações de sobrecarga ou desregulação sensorial em sala de aula ou no atendimento de AEE, recomendo priorizar primeiro a **segurança e a previsibilidade**:

1. **Reduza os estímulos concorrentes:** Diminua o tom de voz, suavize a iluminação se possível e afaste objetos que estejam gerando ruído ou distração no entorno.
2. **Ofereça apoio proprioceptivo leve:** Um abraço firme (se a criança aceitar e buscar contato), uma almofada no colo ou massinha de modelar com resistência podem ajudar o cérebro a se reorganizar.
3. **Use linguagem direta e curta:** Evite perguntas abertas ou longas explicações. Prefira: *"Agora vamos sentar aqui com calma."* com o auxílio de um cartão visual.

Quer que eu prepare uma sequência de atividades sensoriais com foco em autorregulação para você imprimir agora mesmo na biblioteca?`;
    }

    if (lower.includes('bncc') || lower.includes('plano') || lower.includes('objetivo')) {
      return `Com certeza, professora! Posso estruturar os objetivos pedagógicos alinhados aos campos de experiência da BNCC (como *O eu, o outro e o nós* ou *Corpo, gestos e movimentos*) com as adaptações específicas para o PEI (Plano de Ensino Individualizado) do seu aluno.

Me diga qual é a faixa etária da turma e o tema que você está trabalhando esta semana! 📝✨`;
    }

    if (lower.includes('alfabetiz') || lower.includes('leitura') || lower.includes('letra') || lower.includes('vogal')) {
      return `Para a etapa de alfabetização com crianças de educação especial e AEE, o método multissensorial fônico costuma gerar resultados muito mais sólidos! 🔤

Sugiro trabalhar primeiro:
- A associação da boca ao som (*Alfabeto das Boquinhas*, que temos disponível na nossa biblioteca!).
- Letras de lixa ou caixas de areia para traçado com o dedo antes do lápis.
- Pareamento de imagens reais com a letra inicial.

Gostaria de sugestões de jogos de alfabetização rápidos para você aplicar hoje mesmo?`;
    }

    return `Olá, professora! Que bom falar com você! 🌸

Estou aqui justamente para aliviar o peso da sua rotina e transformar suas ideias em recursos práticos, adaptados e acolhedores.

Você pode me pedir:
- Roteiros para atendimentos individuais de AEE
- Dicas para engajar um aluno resistente a atividades de mesa
- Adaptações de fichas de matemática ou leitura
- Sugestões de recursos de baixo custo para montar na escola

Como posso te ajudar a preparar o material de hoje?`;
  }
};
